'use strict';

const pa11yCiReporter = require('pa11y-ci-reporter-html/lib/reporter-html');
const validate = require('pa11y-ci-reporter-html/lib/data-validators');
const formatter = require('pa11y-ci-reporter-html/lib/data-formatter');
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');
const Sitemapper = require('sitemapper');
const {AxePuppeteer} = require('axe-puppeteer');
const puppeteer = require('puppeteer');


// Following function code extracted from pa21y-ci-reporter-html. This was
// necessary because the module is not configurable enough to allow
// specifying a custom template.
const generateSummaryHtmlReport = (summary, outputDir) => {
	// console.log(JSON.stringify(summary));
	const templateFile = path.resolve(`${__dirname}/index.handlebars`);
	const summaryReportTemplate = fs.readFileSync(templateFile, 'utf-8');
	const template = handlebars.compile(summaryReportTemplate);
	// console.log(JSON.stringify(summary, null, 2));
	const summaryReport = template(summary);
	const outputFile = path.join(outputDir, 'index.html');
	fs.writeFileSync(outputFile, summaryReport);
};

exports.generateHtmlReports = async (jsonResults, outputDir, options) => {
    validate.isString(outputDir, 'Invalid output directory path');

    pa11yCiReporter.ensureOutputDirectory(outputDir);

    const formattedResults = formatter.getResultsForHtmlReport(jsonResults);

    const pages = await pa11yCiReporter.generatePageHtmlReports(formattedResults.results,
								outputDir,
								options);

    const accessibilityRuleCount = {};
    let codeCountErrorSum = 0;
    Object.values(jsonResults.results).forEach(pa11yResultArray => {
	pa11yResultArray.forEach(result => {
	    let currentVal = accessibilityRuleCount[result.code];
	    codeCountErrorSum++;
	    accessibilityRuleCount[result.code] = (typeof currentVal == 'undefined') ? 1 : currentVal + 1;
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


    // Do the math here rather than in our html template.
    const summary = formattedResults.summary;
    summary.codeCounts = accessibilityRuleCountSorted;
    summary.codeCountErrorSum = codeCountErrorSum;

    summary.failures = summary.total - summary.passes;
    summary.score = `${Math.round((summary.passes / summary.total) * 100)}%`;

    generateSummaryHtmlReport({
	date: new Date(),
	summary,
	pages
    },
			      outputDir);

};

exports.retrieveSitemapUrls = async (sitemapUrl, find, replace, exclude) => {
	const filteredUrls = [];

	if (sitemapUrl) {
		const sitemap = new Sitemapper();
		const {sites} = await sitemap.fetch(sitemapUrl);

		// from pa11y-ci loadsitemapintoconfig
		const sitemapFind = (
			find ?
				new RegExp(find, 'gi') :
				null
		);
		const sitemapReplace = replace || '';
		const sitemapExclude = (
			exclude ?
				new RegExp(exclude, 'gi') :
				null
		);
		///////

		sites.forEach(url => {
			if (sitemapExclude && url.match(sitemapExclude)) {
				return;
			}
			if (sitemapFind) {
				url = url.replace(sitemapFind, sitemapReplace);
			}

			filteredUrls.push(url);
		});
	}

	return filteredUrls;
};

exports.scanUrls = async (urls, axeConfig) => {
	const browser = await puppeteer.launch();
	const results = [];

	for (const i in urls) {
		let url = urls[i];

		// if the url is actually a function then we'll call it
		// with the puppet browser and take the return val and use
		// that as our url to scan
		if (typeof url == 'function') {
			url = await (url)(browser);
		}

		const page = await browser.newPage();
		await page.setBypassCSP(true);
		await page.goto(url);

		let axe = new AxePuppeteer(page).configure(axeConfig);
		if (axeConfig['tags'] && axeConfig.tags.length > 0) {
			axe = axe.withTags(axeConfig.tags);
		}
		const pageResults = await axe.analyze();
		results.push(pageResults);
		await page.close();
	}

	await browser.close();

	return results;
}


/****************** from pa11y *******/
function convertResults(result) {
	return [].concat(
		...result.violations.map(processViolation),
		...result.incomplete.map(processIncomplete)
	);
}

function processViolation(issue) {
	issue.type = 'error';
	return processIssue(issue);
}

function processIncomplete(issue) {
	issue.type = 'warning';
	return processIssue(issue);
}

/**
 * Process an aXe issue.
 * @private
 * @param {Object} axeIssue - An aXe issue to process.
 * @returns {Object[]} Returns an array of processed issues.
 */
function processIssue(axeIssue) {
	// See https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#results-object for a description
	// of an axe issue

	// let elements = [null];
	// if (axeIssue.nodes.length) {
	// 	// const selectors = axeIssue.nodes.map(node => selectorToString(node.target));
	// 	// elements = selectors.map(selector => window.document.querySelector(selector));
	// 	elements = selectors;
	// }

	return axeIssue.nodes.map(node => ({
		code: axeIssue.id,
		message: `${axeIssue.help} (${axeIssue.helpUrl})`,
		type: axeIssue.type,
		context: node.html,
		selector: selectorToString(node.target),
		runnerExtras: {
			description: axeIssue.description,
			impact: axeIssue.impact,
			help: axeIssue.help,
			helpUrl: axeIssue.helpUrl
		}
	}));
}

/**
 * Convert an aXe selector array to a selector string. Copied from
 * https://github.com/dequelabs/axe-cli/blob/develop/lib/utils.js
 * for now, wonder if we can share or move out.
 * @private
 * @param {Array} selectors - The selector parts.
 * @returns {String} Returns the selector string.
 */
function selectorToString(selectors) {
	return selectors
		.reduce((selectorParts, selector) => selectorParts.concat(selector), [])
		.join(' ');
}
/****************** end from pa11y *******/


exports.convertAxeResultsToPa11yReportCompatible = async (axeResults) => {
	let formattedResults = axeResults.reduce((obj, result) => {
		obj[result.url] = convertResults(result);
		return obj;
	}, {});

	let summaryResults = {
		"total": Object.keys(formattedResults).length,
		"passes": Object.values(formattedResults).reduce((passes, nodes) => {
			let pass = 1;
			for (const i in nodes) {
				if (nodes[i].type == "error") {
					pass = 0;
					break;
				}
			}
			return passes + pass;
		}, 0),
		"results": formattedResults
	};

	return summaryResults;
};
