#!/usr/bin/env node
'use strict';

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
		// 'http://testing-ground.scraping.pro/',
		// 'http://testing-ground.scraping.pro/login',
		// {
		// 	url: 'http://testing-ground.scraping.pro/login',
		// 	actions: [
		// 		'set field #usr to admin',
		// 		'set field #pwd to 12345',
		// 		'click element input[type=submit]',
		// 		'wait for url to be http://testing-ground.scraping.pro/login?mode=welcome'
		// 	]
		// },
		// 'http://testing-ground.scraping.pro/table'
	],

	defaults: {
		log: (commander.json || commander.htmlReport) ? undefined : console,
		wrapWidth: process.stdout.columns || undefined,
		timeout: 40000,
		concurrency: 1,
		standard: 'Section508', // Section508, WCAG2A, WCAG2AA (default), WCAG2AAA
		ignore: [
			// // AXe specific rules //
			// 'page-has-heading-one',
			// // 'color-contrast',
			// // 'html-has-lang',
			// // 'landmark-one-main',
			// // // End Axe //
			// 'Section508.D.H49.AlignAttr',
			// 'Section508.D.H49.Center',
			// 'Section508.D.HeadingOrder',
			// 'Section508.H.MissingHeadersAttrs',
			// // 'WCAG2A.Principle1.Guideline1_3.1_3_1.H43.HeadersRequired',
			// // 'WCAG2A.Principle1.Guideline1_3.1_3_1.H49.AlignAttr',
			// // 'WCAG2A.Principle1.Guideline1_3.1_3_1.H49.Center',
			// // 'WCAG2A.Principle3.Guideline3_1.3_1_1.H57.2',
			// // 'WCAG2AA.Principle1.Guideline1_3.1_3_1.H43.HeadersRequired',
			// // 'WCAG2AA.Principle1.Guideline1_3.1_3_1.H49.AlignAttr',
			// // 'WCAG2AA.Principle1.Guideline1_3.1_3_1.H49.Center',
			// // 'WCAG2AA.Principle1.Guideline1_3.1_3_2.G57',
			// // 'WCAG2AA.Principle1.Guideline1_3.1_3_3.G96',
			// // 'WCAG2AA.Principle1.Guideline1_4.1_4_1.G14,G182',
			// // 'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail',
			// // 'WCAG2AA.Principle1.Guideline1_4.1_4_4.G142',
			// // 'WCAG2AA.Principle1.Guideline1_4.1_4_5.G140,C22,C30.AALevel',
			// // 'WCAG2AA.Principle2.Guideline2_2.2_2_2.SCR33,SCR22,G187,G152,G186,G191',
			// 'WCAG2AA.Principle2.Guideline2_3.2_3_1.G19,G176',
			// 'WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124,H69',
			// 'WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.2',
			// 'WCAG2AA.Principle2.Guideline2_4.2_4_5.G125,G64,G63,G161,G126,G185',
			// 'WCAG2AA.Principle2.Guideline2_4.2_4_6.G130,G131',
			// 'WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2',
			// 'WCAG2AA.Principle3.Guideline3_1.3_1_2.H58',
			// 'WCAG2AA.Principle3.Guideline3_2.3_2_3.G61',
			// 'WCAG2AA.Principle3.Guideline3_2.3_2_4.G197',
			// 'WCAG2AAA.Principle1.Guideline1_4.1_4_6.G18.Fail',
			// 'WCAG2AAA.Principle3.Guideline3_1.3_1_1.H57.2'
		],
		runners: [
			// 'axe',
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
