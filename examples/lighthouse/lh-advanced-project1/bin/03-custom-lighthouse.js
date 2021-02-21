#!/usr/bin/env node
'use strict';

//
//02/20/2021
//03-custom-lighthouse.js
//----------------------------
//******* DESCRIPTION ********
//----------------------------
//[1]-Runs tests against URLs cited in a sitemap.xml file
//[2]-Runs tests against all default lighthouse (axe-core) rules 
//
//==================================================================

const globby = require('globby');
const protocolify = require('protocolify');
const pkg = require('../package.json');
const commander = require('commander');
const customLighthouse = require('..');
const lighthouseConstants = require('lighthouse/lighthouse-core/config/constants.js');

commander
	.version(pkg.version)
	.name('node custom-lighthouse.js')
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
	.requiredOption(
		'-h, --html-report <dir>',
		'Output directory for lighthouse reports'
	).parse(process.argv);


// Parse the args into valid paths using glob and protocolify
const urls = globby.sync(commander.args, {
	// Ensure not-found paths (like "google.com"), are returned
	nonull: true
}).map(protocolify);

const config = {
	urls: [


		],

	lighthouse: {
		config: {
			// desktop accessibility scan
			extends: 'lighthouse:default',
			settings: {
				onlyCategories: ['accessibility'],				
				maxWaitForFcp: 15 * 1000,
				maxWaitForLoad: 35 * 1000,
				emulatedFormFactor: 'desktop',

				// throttling: lighthouseConstants.throttling.mobileRegluar3G,
				// fast desktop like performance
				throttling: {
					rttMs: 40,
					throughputKbps: 10 * 1024,
					cpuSlowdownMultiplier: 1,
					requestLatencyMs: 0, // 0 means unset
					downloadThroughputKbps: 0,
					uploadThroughputKbps: 0,
				},
			}
		},
		flags: {
			port: null, // unknown till launch

		}

	}
};

// start from here and wait for results
(async () => {
	// Load a sitemap based on the `--sitemap` flag
	const newConfig = commander.sitemap ?
		await customLighthouse.loadSitemapIntoConfig(commander, config) : config;

	// configuration urls and sitemap urls before command line urls
	let allUrls = (newConfig.urls || []).concat(urls);
	await customLighthouse.scanAndReport(allUrls, commander.htmlReport, config.lighthouse);
	
})().catch(error => {
	console.error('unexpected failure: ');
	console.error(error);
	process.exit(1);
});
