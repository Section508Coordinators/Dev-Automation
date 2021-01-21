#!/usr/bin/env node
'use strict';

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

		// Hard-code URLs for testing here

		"https://section508coordinators.github.io/BaselineTestPages2/test-cases/TC1005C001.html",
		"https://section508coordinators.github.io/BaselineTestPages2/test-cases/TC1005C002.html",
		"https://section508coordinators.github.io/BaselineTestPages2/test-cases/TC1005C003.html",
		"https://section508coordinators.github.io/BaselineTestPages2/test-cases/TC1005C004.html",
		"https://section508coordinators.github.io/BaselineTestPages2/test-cases/TC1005C007.html"


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
		// 'http://testing-ground.scraping.pro/table'
		// 'http://testing-ground.scraping.pro/blocks',
		// 'http://testing-ground.scraping.pro/textlist',
		// 'http://testing-ground.scraping.pro/invalid'
	],
	lighthouse: {
		config: {
			// desktop accessibility scan
			extends: 'lighthouse:default',
			settings: {
				onlyCategories: ['accessibility'],
/*				onlyAudits: [

				
				'aria-allowed-role',
				'aria-hidden-focus',
				'aria-input-field-name',
				'aria-toggle-field-name',
				'button-name',
				'color-contrast',
				'document-title',
				'duplicate-id',
				'empty-heading',
				'form-field-multiple-labels',
				'frame-title',
				'frame-title-unique',
				'html-has-lang',
				'html-lang-valid',
				'image-alt',
				'input-button-name',
				'input-image-alt',
				'label',
				'link-name',
				'list',
				'listitem',
				'role-img-alt',
				'scope-attr-valid',
				'scrollable-region-focusable',
				'td-headers-attr',
				'valid-lang'
				], */

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
//			skipAudits: [
//				'accesskeys', 'aria-allowed-attr', 'aria-required-attr', 'aria-required-children',
//				'aria-required-parent', 'aria-roles', 'aria-valid-attr-value', 'aria-valid-attr',
//				// 'audio-caption', 'button-name', 'bypass', 'color-contrast', 'definition-list',
//				// 'dlitem', 'document-title', 'duplicate-id', 'frame-title', 'html-has-lang',
//				'html-lang-valid', 'image-alt', 'input-image-alt', 'label', 'layout-table',
//				'link-name', 'list', 'listitem', 'meta-refresh', 'meta-viewport', 'object-alt',
//				'tabindex', 'td-headers-attr', 'th-has-data-cells', 'valid-lang', 'video-caption',
//				'video-description', 'custom-controls-labels', 'custom-controls-roles',
//				'focus-traps', 'focusable-controls', 'heading-levels',
//				'interactive-element-affordance', 'logical-tab-order', 'managed-focus',
//				'offscreen-content-hidden', 'use-landmarks', 'visual-order-follows-dom'
//			],
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
