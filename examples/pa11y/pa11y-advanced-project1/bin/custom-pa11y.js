#!/usr/bin/env node
'use strict';

const pa11yCi = require('pa11y-ci');
const customPa11y = require('..');
const globby = require('globby');
const protocolify = require('protocolify');
const pkg = require('../package.json');
const commander = require('commander');
const { createWinstonLogger, addLoggingInfo, addLoggingError } = require('../utils/winston');

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
	.option(
		'-c, --config <string>',
		'Use an alternate configuration for this analysis',
		'config/custom-pa11y.config.js'
 	)
	.option(
		'-t, --template <string>',
		'Use an alternate template for this analysis',
		'config/index.handlebars'
	)
	.option(
		'-l, --logs <Boolean>',
		'Generate folder and log files',
		'false'
	)
	.parse(process.argv);

// Parse the args into valid paths using glob and protocolify
const urls = globby.sync(commander.args, {
	// Ensure not-found paths (like "google.com"), are returned
	nonull: true
}).map(protocolify);

createWinstonLogger((commander.opts().logs == 'true'));

addLoggingInfo('Starting script');

const configPath = `../${commander.opts().config}`;

addLoggingInfo('Getting configurion');

const config = require(configPath);

addLoggingInfo('Getting template');

const templateCustom = commander.opts().template;

(async () => {
	// Load a sitemap based on the `--sitemap` flag

	addLoggingInfo('Loading sitemap into config');

	const newConfig = commander.sitemap ?
		await customPa11y.loadSitemapIntoConfig(commander, config) : config;

	// configuration urls and sitemap urls before command line urls
	let allUrls = (newConfig.urls || []).concat(urls);

	addLoggingInfo('Running pa11yCi...');
	let runningStatus = null;
	let report = null;
	try {
		runningStatus = setInterval(() => addLoggingInfo('...still working...'), 10000)
		report = await pa11yCi(allUrls, newConfig.defaults)
	} finally {
		clearInterval(runningStatus);
	}
	addLoggingInfo('...pa11yCi completed scanning all URLs');

	if (commander.htmlReport) {
		addLoggingInfo('Generating Html reports');
		await customPa11y.generateHtmlReports(report, commander.htmlReport, commander, templateCustom);
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
	addLoggingInfo('Completed script');
	if (report.errors >= parseInt(commander.threshold, 10) && report.passes < report.total) {
		process.exit(2);
	} else {
		process.exit(0);
	}

})()	
	.catch(error => {
		console.error('unexpected failure: ');
		console.error(error);
		addLoggingError(`Error script not completed, unexpected failure: ${error}`);
		process.exit(1);
	});
