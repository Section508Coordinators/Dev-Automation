#!/usr/bin/env node
'use strict';

//
// 02/22/2021
// 03-custom-pa11y.js
//
// This script does the following:
// - Uses the "runners:" option to specify both the axe-core and the 
//   HTML CodeSniffer rulesets to be used for testing. No rules are ignored 
//   for either ruleset, so testing is done using the full range of all rules 
//   from both rulesets.
//
// - Uses the "-s" switch to identify an external sitemap.xml file containing 
//   the URLs with which to test.
//
// - Using the -h switch on the command, this example writes the test results to 
//   an HTML report as opposed to the *command window*. Reports will write to the 
//   "\bin\" folder using the report name specified in the command switch shown in 
//   the syntax example on the GitHub site.
//=============================================================================================


const pa11yCi = require('pa11y-ci');
const customPa11y = require('..');
const globby = require('globby');
const protocolify = require('protocolify');
const pkg = require('../package.json');
const commander = require('commander');

commander
	.version(pkg.version)
	.name('node custom-pa11y.js')
	.usage('[options] <paths>')
	.option(
		'-s, --sitemap <url>',
		'the path to a sitemap'
	)
	.option(
		'-f, --sitemap-find <pattern>',
		'a pattern to find in sitemaps. Use with --sitemap-replace'
	)
	.option(
		'-r, --sitemap-replace <string>',
		'a replacement to apply in sitemaps. Use with --sitemap-find'
	)
	.option(
		'-x, --sitemap-exclude <pattern>',
		'a pattern to find in sitemaps and exclude any url that matches'
	)
	.option(
		'-j, --json',
		'Output results as JSON'
	).option(
		'-h, --html-report <dir>',
		'Takes json output and uses pa11y-ci-reporter-html to generate a report in <dir>'
	)
	.option(
		'-i, --include-zero-issues',
		'Include detailed page reports for pages with no pa11y issues. Use with --html-report.')
	.option(
		'-T, --threshold <number>',
		'permit this number of errors, warnings, or notices, otherwise fail with exit code 2',
		'0'
	)
	.parse(process.argv);

// Parse the args into valid paths using glob and protocolify
const urls = globby.sync(commander.args, {
	// Ensure not-found paths (like "google.com"), are returned
	nonull: true
}).map(protocolify);


const config = {
	urls: [
			
		],

	defaults: {
		log: (commander.json || commander.htmlReport) ? undefined : console,
		wrapWidth: process.stdout.columns || undefined,
		timeout: 120000,
		concurrency: 20,
		standard: 'WCAG2AA', // Section508, WCAG2A, WCAG2AA (default), WCAG2AAA

		ignore: [

			],  
		runners: [
			'axe',
			'htmlcs'
		] 


	}
};


(async () => {
	// Load a sitemap based on the `--sitemap` flag
	const newConfig = commander.sitemap ?
		await customPa11y.loadSitemapIntoConfig(commander, config) : config;

	// configuration urls and sitemap urls before command line urls
	let allUrls = (newConfig.urls || []).concat(urls);

	// Run pa11yCi
	const report = await pa11yCi(allUrls, newConfig.defaults);

	if (commander.htmlReport) {
		await customPa11y.generateHtmlReports(report, commander.htmlReport, commander);
	}

	// Output JSON if asked for it
	if (commander.json) {
		console.log(JSON.stringify(report, (key, value) => {
			if (value instanceof Error) {
				return {
					message: value.message
				};
			}
			return value;
		}));
	}

	if (report.errors >= parseInt(commander.threshold, 10) && report.passes < report.total) {
		process.exit(2);
	} else {
		process.exit(0);
	}

})().catch(error => {
	console.error('unexpected failure: ');
	console.error(error);
	process.exit(1);
});
