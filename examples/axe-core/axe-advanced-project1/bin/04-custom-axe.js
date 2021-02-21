#!/usr/bin/env node
'use strict';

// 02/19/2021 axe
// 04-custom-axe.js

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
		// // First url requires login. The concept here is that a 'url' in this
		// // list can either be a string url or a function that takes a
		// // puppeteer browser that can be used to perform some actions before
		// // returning the actual URL to run lighthouse against.
		// async (puppet) => {
		// 	// log into site before running tests and push the post login page onto
		// 	const page = await puppet.newPage();
		// 	await page.goto('http://testing-ground.scraping.pro/login');
		// 	await page.waitForSelector('#usr', {visible: true});

		// 	// Fill in and submit login form.
		// 	const emailInput = await page.$('#usr');
		// 	await emailInput.type('admin');
		// 	const passwordInput = await page.$('#pwd');
		// 	await passwordInput.type('12345');
		// 	const submitButton = await page.$('input[type=submit]');

		// 	await Promise.all([
		// 		submitButton.click(),
		// 		page.waitForNavigation(),
		// 	]);

		// 	if (page.url() != 'http://testing-ground.scraping.pro/login?mode=welcome') {
		// 		console.error('login failed!');
		// 	} else {
		// 		console.log('login succeeded');
		// 		const cookies = await page.cookies();
		// 		for (var key in cookies) {
		// 			console.log(`found cookie ${cookies[key].name}`);
		// 		}
		// 	}
		// 	await page.close();

		// 	return 'http://testing-ground.scraping.pro/login?mode=welcome';
		// },
		// 'http://testing-ground.scraping.pro/table',
		// 'http://testing-ground.scraping.pro/blocks',
		// 'http://testing-ground.scraping.pro/textlist',
		// 'http://testing-ground.scraping.pro/invalid'
	],
	axeConfig: {
		// branding: {
		// 	brand: '';
		// 	application: '';
		// },
		// reporter: ReporterVersion,
		/////////////////////////////// tags can be used to select groups of tests
		// tags: [
		// 	"best-practice",
		// 	"cat.keyboard",
		// 	"cat.time-and-media",
		// 	"wcag2a",
		// 	"wcag121",
		// 	"section508",
		// 	"section508.22.a"
		// ],
		//////////////////////////// can define new checks or override existing
		// checks: [
		// 	// {
		// 	// 	id: '',
		// 	// 	// evaluate: Function | string;
		// 	// 	// after?: Function | string;
		// 	// 	// options?: any;
		// 	// 	// matches: '',
		// 	// 	enabled: true,
		// 	// }
		// ],
		// disableOtherRules: true,     //////// if true, only use our rules
		////////////////////////////// define new rules or override existing
		 rules: [

		 	//********************************************
		 	//*** START OF TTv5-Friendly and verified ****
		 	//********************************************
			
			{id: 'aria-allowed-role', enabled: true}, 
			{id: 'aria-valid-attr-value', enabled: true},
			{id: 'aria-hidden-focus', enabled: true},
			{id: 'aria-input-field-name', enabled: true},
			{id: 'aria-toggle-field-name', enabled: true},
			{id: 'button-name', enabled: true},
			{id: 'color-contrast', enabled: true},
			{id: 'document-title', enabled: true},
			{id: 'duplicate-id', enabled: true},
			{id: 'empty-heading', enabled: true},
			{id: 'form-field-multiple-labels', enabled: true},
			{id: 'frame-title', enabled: true},
			{id: 'frame-title-unique', enabled: true},
			{id: 'html-has-lang', enabled: true},
		 	{id: 'html-lang-valid', enabled: true},
		 	{id: 'image-alt', enabled: true},
		 	{id: 'input-button-name', enabled: true},
		 	{id: 'input-image-alt', enabled: true},
		 	{id: 'label', enabled: true},
		 	{id: 'link-name', enabled: true},
		 	{id: 'list', enabled: true},
		 	{id: 'listitem', enabled: true},
		 	{id: 'role-img-alt', enabled: true},
		 	{id: 'scope-attr-valid', enabled: true},
		 	{id: 'scrollable-region-focusable', enabled: true},
		 	{id: 'td-headers-attr', enabled: true},
		 	{id: 'valid-lang', enabled: true},

		 	//**********************************************
		 	//*** START OF Rules to Turn Off for Testing ***
		 	//**********************************************

		 	{id: 'accesskeys', enabled: false},
		 	{id: 'aria-valid-attr-value', enabled: false},
		 	{id: 'aria-valid-attr', enabled: false},
		 	{id: 'audio-caption', enabled: false},
		 	{id: 'autocomplete-valid', enabled: false},
		 	{id: 'avoid-inline-spacing', enabled: false},
		 	{id: 'blink', enabled: false},
		 	{id: 'bypass', enabled: false},
		 	{id: 'checkboxgroup', enabled: false},
		 	{id: 'duplicate-id-active', enabled: false},
		 	{id: 'duplicate-id-aria', enabled: false},
			{id: 'landmark-one-main', enabled: false},
			{id: 'region', enabled: false},		 	
		 	{id: 'area-alt', enabled: false},
		 	{id: 'aria-allowed-attr', enabled: false},		 	
		 	{id: 'aria-dpub-role-fallback', enabled: false},
		 	{id: 'aria-hidden-body', enabled: false},
		 	{id: 'aria-required-attr', enabled: false},
		 	{id: 'aria-required-children', enabled: false},
		 	{id: 'aria-required-parent', enabled: false},
		 	{id: 'aria-roledescription', enabled: false},
			{id: 'aria-roles', enabled: false},
		 	{id: 'css-orientation-lock', enabled: false},
		 	{id: 'definition-list', enabled: false},
		 	{id: 'dlitem', enabled: false},
		 	{id: 'focus-order-semantics', enabled: false},		 	
		 	{id: 'frame-tested', enabled: false},
		 	{id: 'heading-order', enabled: false},
		 	{id: 'hidden-content', enabled: false},
		 	{id: 'html-xml-lang-mismatch', enabled: false},		 	
		 	{id: 'img-redundant-alt', enabled: false},
		 	{id: 'label-content-name-mismatch', enabled: false},
		 	{id: 'label-title-only', enabled: false},		 	
		 	{id: 'landmark-banner-is-top-level', enabled: false},
		 	{id: 'landmark-complementary-is-top-level', enabled: false},
		 	{id: 'landmark-contentinfo-is-top-level', enabled: false},
		 	{id: 'landmark-main-is-top-level', enabled: false},
		 	{id: 'landmark-no-duplicate-banner', enabled: false},
		 	{id: 'landmark-no-duplicate-contentinfo', enabled: false},
		 	{id: 'landmark-no-duplicate-main', enabled: false},
		 	{id: 'landmark-one-main', enabled: false},
		 	{id: 'landmark-unique', enabled: false},
		 	{id: 'layout-table', enabled: false},
			{id: 'link-in-text-block', enabled: false},
		 	{id: 'marquee', enabled: false},
		 	{id: 'meta-refresh', enabled: false},
		 	{id: 'meta-viewport-large', enabled: false},
		 	{id: 'meta-viewport', enabled: false},
		 	{id: 'object-alt', enabled: false},
		 	{id: 'p-as-heading', enabled: false},
		 	{id: 'page-has-heading-one', enabled: false},
		 	{id: 'radiogroup', enabled: false},
		 	{id: 'region', enabled: false},		 	
		 	{id: 'server-side-image-map', enabled: false},
		 	{id: 'skip-link', enabled: false},
		 	{id: 'tabindex', enabled: false},
		 	{id: 'table-duplicate-name', enabled: false},
		 	{id: 'table-fake-caption', enabled: false},
		 	{id: 'td-has-header', enabled: false},		 	
		 	{id: 'th-has-data-cells', enabled: false},
		 	{id: 'video-caption', enabled: false},
		 	{id: 'video-description', enabled: false},
		 	{id: 'svg-img-alt', enabled: false},
		 	{id: 'identical-links-same-purpose', enabled: false},
		 	{id: 'image-redundant-alt', enabled: false}
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
