#!/usr/bin/env node
'use strict';

//
// 02/21/2021 axe: custom-axe
// This script will test against all default axe-core rules
//

const customAxe = require('..');
const pkg = require('../package.json');
const globby = require('globby');
const protocolify = require('protocolify');
const commander = require('commander');

const fs = require('fs');

commander
	.version(pkg.version)
	.name('node custom-axe.js')
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
		'Takes json output and uses pa11y-ci-reporter-html to generate a report in <dir>'
	).parse(process.argv);

// Parse the args into valid paths using glob and protocolify
let commandLineUrls = globby.sync(commander.args, {nonull: true}).map(protocolify);

const config = {
	urls: [

		],
	axeConfig: {

		 rules: [

		 ],
		// locale?: Locale;
		// axeVersion: ''
	}
};

const main = async () => {
	// configuration urls first, then commandline urls then sitemap
	config.urls = config.urls.concat(commandLineUrls);

	const filteredSitemapUrls = await customAxe.retrieveSitemapUrls(commander.sitemap,
		commander.sitemapFind,
		commander.sitemapReplace,
		commander.sitemapExclude);

	config.urls = config.urls.concat(filteredSitemapUrls);

	const results = await customAxe.scanUrls(config.urls, config.axeConfig);

	const summaryResults = await customAxe.convertAxeResultsToPa11yReportCompatible(results);
	// console.log(JSON.stringify(summaryResults, null, 2));

	await customAxe.generateHtmlReports(summaryResults, commander.htmlReport, {});
};

main().catch(error => {
	console.error('unexpected failure: ');
	console.error(error);
	process.exit(1);
});
