'use strict';

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
const fs = require('fs');
const pkg = require('../package.json');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const handlebars = require('handlebars');
const path = require('path');
const cheerio = require('cheerio');
const { addLoggingInfo, addLoggingError } = require('../utils/winston');

const scanUrl = async (puppet, url, options) => {
	// if the url is actually a function then we'll call it
	// with the puppet browser and take the return val and use
	// that as our url to scan
	if (typeof url == 'function') {
		url = await (url)(puppet);
	}

 	// console.log(report);
 	//console.log(`Lighthouse scores: ${Object.values(lhr.categories).map(c => `${c.title} ${c.score}`).join(', ')}`);

	addLoggingInfo(`Browsing to URL: ${url}`)
	addLoggingInfo(`Analyzing URL: ${url}`)
	const {lhr, report} = await lighthouse(url, options.flags, options.config);
	addLoggingInfo(`Successful analysis of URL: ${url}`)
	// console.log(report);
	//console.log(`Lighthouse scores: ${Object.values(lhr.categories).map(c => `${c.title} ${c.score}`).join(', ')}`);
	//console.log(lhr);
	return lhr;
}

const withPuppetChrome = async (action, options, ...restArgs) => {
	let chrome = null;
	let puppet = null;

	try {
		// launch chrome and connect puppeteer
		chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
		const response = await fetch(`http://localhost:${chrome.port}/json/version`);
		const {webSocketDebuggerUrl} = await response.json();
		puppet = await puppeteer.connect({browserWSEndpoint: webSocketDebuggerUrl});

		// call action function with any supplied extra args plus
		// puppet and options

		// modify our options flags so that lighthouse has the launched chrome port
		options.flags.port = chrome.port;

		restArgs.unshift(puppet, options);
		return await action.apply(null, restArgs);

	} finally {
		puppet && puppet.disconnect();
		chrome && await chrome.kill();
	}
}


const scanUrlsFn = async (puppet, options, urls) => {
	let results = [];

	for (var i = 0; i < urls.length; i++) {
		// Run Lighthouse.
		try {			
			const lhr = await scanUrl(puppet, urls[i], options);
			// console.log(report);
	
			//console.log(`Lighthouse scores: ${Object.values(lhr.categories).map(c => `${c.title} ${c.score}`).join(', ')}`);
			const html = ReportGenerator.generateReport(lhr, 'html');
			results.push({lhr, html});
		} catch (error) {
			addLoggingError(error.name + ' in url: '+ urls[i])
		}
	}
	return results;
};


// Following function code extracted from pa21y-ci-reporter-html. This was
// necessary because the module is not configurable enough to allow
// specifying a custom template.
const generateSummaryHtmlReport = (summary, outputDir, templateName) => {
	const templateFile = path.resolve(`${__dirname}/../${templateName}`);
	const summaryReportTemplate = fs.readFileSync(templateFile, 'utf-8');
	const template = handlebars.compile(summaryReportTemplate);
	// console.log(JSON.stringify(summary, null, 2));
	const summaryReport = template(summary);
	const outputFile = path.join(outputDir, 'index.html');
	fs.writeFileSync(outputFile, summaryReport);
};

exports.scanAndReport = async (urls, outputDir, config, templateName) => {
	addLoggingInfo('Loading Puppet Chrome');

	let results = await withPuppetChrome(scanUrlsFn, config, urls);

	// ensure report directory exists
	if (results.length > 0 && !fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, {recursive: true});
	}


	let summary = {
		total: 0,
		passes: 0,
		errors: 0,
		failures: 0,
		score: ''
	};

	let formattedResults = results.map(({lhr, html}) => {
		// console.log(JSON.stringify(lhr, null, 2));
		summary.total++;

		// using pa11y approach rather than lighthouse score here
		// console.log(lhr.categories.accessibility.score);
		// summary.score += lhr.categories.accessibility.score;

		// lets for convenient access into lhr
		let audits = lhr.audits;
		let accessibilityCategory = lhr.categories.accessibility;
		let auditRefs = accessibilityCategory ? accessibilityCategory.auditRefs : [];

		// not using the following at the moment
		// let auditsPerformed = auditRefs.length;
		let errors = 0;
		let warnings = 0;
		let notices = 0;
		let errorCodes = [];

		auditRefs.forEach(ref => {
			let audit = audits[ref.id];
			if (audit.scoreDisplayMode == 'notApplicable') {
				return;
			} else if (audit.scoreDisplayMode == 'manual') {
				notices++;
			} else if (audit.score == 0) {
				errors++;
				errorCodes.push(ref.id);
			} else if (audit.score > 0 && audit.score < 1) {
				warnings++;
				errorCodes.push(ref.id);
			}
		});

		if (errors > 0)
			summary.errors++;
		else
			summary.passes++;

		// summary.errors += lhr.warnings.length;

		// lhr.audits is a map of audits with the audit in the keyname.
		// lhr.categories.accessibility.auditRefs has references back to lhr.audit keys for more info.

		let fileNameFromUrl = `${lhr.finalUrl.replace(/(^https?:\/\/|\.html$)/g, '').replace(/[_.~!*'();:@&=+$,/?%#[\]]+/g, '-').replace(/^-|-$/, '')}-report.html`;
		fs.writeFileSync(`${outputDir}/${fileNameFromUrl}`, html);

		// console.log(JSON.stringify(lhr, null, 2));

		return {
			url: lhr.finalUrl,
			issues: {errors, warnings, notices, errorCodes},
			htmlReport: fileNameFromUrl
		};
	});


	const accessibilityRuleCount = {};
	let codeCountErrorSum = 0;
	// console.log(JSON.stringify(formattedResults, null, 2));
	formattedResults.forEach(pageReport => {
		pageReport.issues.errorCodes.forEach(code => {
			let currentVal = accessibilityRuleCount[code];
			codeCountErrorSum++;
			accessibilityRuleCount[code] = (typeof currentVal == 'undefined') ? 1 : currentVal + 1;
		});
	});

	// sort the rules by violation count descending and add index for readability
	let accessibilityRuleCountSorted = [];
	Object
		.entries(accessibilityRuleCount)
		.forEach(([key, value]) => accessibilityRuleCountSorted.push([key, value]));

	accessibilityRuleCountSorted.sort((a, b) => b[1] - a[1]);
	// now do some formatting due to limitations of handlebar syntax
	const nfObject = new Intl.NumberFormat('en-US');
	accessibilityRuleCountSorted = accessibilityRuleCountSorted
		.map((cur, i) => [i + 1, cur[0], nfObject.format(cur[1])]);


	summary.codeCounts = accessibilityRuleCountSorted;
	summary.codeCountErrorSum = codeCountErrorSum;

	// mimic pa11y results
	summary.failures = summary.total - summary.passes;
	summary.score = `${Math.round((summary.passes / summary.total) * 100)}%`;
	// old lighthouse average approach
	//summary.score = (summary.score / results.length);
	addLoggingInfo('Generating Summary Html reports');
	generateSummaryHtmlReport({date: new Date(), summary, pages: formattedResults}, outputDir, templateName);

	// console.log('avg score: ' + summary.score);
};

// This code was extracted from pa11y-ci because it couldn't be used
// directly due to the pa11y-ci project structure.

// Load a sitemap from a remote URL, parse out the
// URLs, and add them to an existing config object
// Supports sitemapindex by recursively fetching all sitemaps
exports.loadSitemapIntoConfig = (program, initialConfig) => {
	const sitemapFind = (
		program.sitemapFind ?
			new RegExp(program.sitemapFind, 'gi') :
			null
	);
	const sitemapReplace = program.sitemapReplace || '';
	const sitemapExclude = (
		program.sitemapExclude ?
			new RegExp(program.sitemapExclude, 'gi') :
			null
	);

	async function getUrlsFromSitemap(sitemapUrl, config) {
		try {
			const response = await fetch(sitemapUrl);
			const body = await response.text();
			const $ = cheerio.load(body, {xmlMode: true});

			const isSitemapIndex = $('sitemapindex').length > 0;
			if (isSitemapIndex) {
				return Promise.all($('sitemap > loc').toArray().map(element => {
					return getUrlsFromSitemap($(element).text(), config);
				})).then(configs => {
					return configs.pop();
				});
			}

			$('url > loc').toArray().forEach(element => {
				let url = $(element).text();
				if (sitemapExclude && url.match(sitemapExclude)) {
					return;
				}
				if (sitemapFind) {
					url = url.replace(sitemapFind, sitemapReplace);
				}
				config.urls.push(url);
			});

			return config;
		} catch (error) {
			if (error.stack && error.stack.includes('node-fetch')) {
				throw new Error(`The sitemap "${sitemapUrl}" could not be loaded`);
			}
			throw new Error(`The sitemap "${sitemapUrl}" could not be parsed`);
		}
	}

	return getUrlsFromSitemap(program.sitemap, initialConfig);
};