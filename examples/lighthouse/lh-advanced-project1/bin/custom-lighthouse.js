#!/usr/bin/env node
'use strict';

//
//02/20/2021
//custom-lighthouse.js
//----------------------------
//******* DESCRIPTION ********
//----------------------------
//[1]-Runs tests against URLs embedded in this script file
//[2]-Only tests against preferred axe-core rules that are the most 
//    Trusted Tester friendly
//
//==================================================================

const globby = require('globby');
const protocolify = require('protocolify');
const pkg = require('../package.json');
const commander = require('commander');
const customLighthouse = require('..');
const lighthouseConstants = require('lighthouse/lighthouse-core/config/constants.js');
const { createWinstonLogger, addLoggingInfo, addLoggingError } = require('../utils/winston');

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
	.option(
		'-c, --config <string>',
		'Use an alternate configuration for this analysis',
		'config/custom-lighthouse.config.js'
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
	.requiredOption(
		'-h, --html-report <dir>',
		'Output directory for lighthouse reports'
	).parse(process.argv);


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

// start from here and wait for results
(async () => {
	// Load a sitemap based on the `--sitemap` flag

	addLoggingInfo('Loading the sitemap in the configuration');

	const newConfig = commander.sitemap ?
		await customLighthouse.loadSitemapIntoConfig(commander, config) : config;

	// configuration urls and sitemap urls before command line urls
	let allUrls = (newConfig.urls || []).concat(urls);

	addLoggingInfo('Scanning and reports');
	await customLighthouse.scanAndReport(allUrls, commander.htmlReport, config.lighthouse, templateCustom);
	
})()	
	.then(() => {
		addLoggingInfo('Completed script');
	})
	.catch(error => {
		console.error('unexpected failure: ');
		console.error(error);
		addLoggingError(`Error script not completed, unexpected failure: ${error}`);
		process.exit(1);
	});