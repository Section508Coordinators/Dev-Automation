'use strict';

const cheerio = require('cheerio');
const fetch = require('node-fetch');
const pa11yCiReporter = require('pa11y-ci-reporter-html/lib/reporter-html');
const validate = require('pa11y-ci-reporter-html/lib/data-validators');
const formatter = require('pa11y-ci-reporter-html/lib/data-formatter');
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');
const { addLoggingInfo } = require('../utils/winston');


// Following function code extracted from pa21y-ci-reporter-html. This was
// necessary because the module is not configurable enough to allow
// specifying a custom template.
const generateSummaryHtmlReport = (summary, outputDir, templateName) => {
	// console.log(JSON.stringify(summary));
	const templateFile = path.resolve(`${__dirname}/../${templateName}`);
	const summaryReportTemplate = fs.readFileSync(templateFile, 'utf-8');
	const template = handlebars.compile(summaryReportTemplate);

	// console.log(JSON.stringify(summary, null, 2));

	const summaryReport = template(summary);
	const outputFile = path.join(outputDir, 'index.html');
	fs.writeFileSync(outputFile, summaryReport);
};


/////////////
// This function is a lame workaround for something that
// seems to be a bug within pa11yci. If a URL fails (the content
// type is a pdf or image instead of html for example), there is
// an unhandled promise rejection warning and the results object
// contains a url key / value pair that is unexpected. Here we
// detect that condition and remove the empty object within the
// results array.
//
// We could optionally increment this as a pass scenario but we'll
// leave that commented out for now.
//
// Rather than passing this - let's increment the error count and
// add an unexpected error message to be reported.
//
// !Note - this modifies the jsonResults object directly
const fixupResults = jsonResults => {
	let tmpResults = jsonResults['results'];
	for (var key in tmpResults) {
		if (tmpResults[key].length == 1 && Object.keys(tmpResults[key][0]).length == 0) {
			// ignore and pass approach
			// tmpResults[key].pop();
			// jsonResults['passes'] += 1;

			// fail report approach
			tmpResults[key] = [
				{
					"code": "Pa11y.Unexpected.Error.Fail",
					"type": "error",
					"typeCode": 1,
					"message": "This URL caused Pa11y to experience an unexpected failure. Please ensure the URL contains valid html",
					"context": key,
					"selector": "",
					"runner": "",
					"runnerExtras": {}
				}
			];
		}
	}
	console.log(JSON.stringify(tmpResults, null, 2));
	/////////////
};

exports.generateHtmlReports = async (jsonResults, outputDir, options, templateName) => {
	// // console.log('................');
	// console.log(JSON.stringify(jsonResults, null, 2));
	// console.log(`errors: ${jsonResults.errors}`);

	validate.isString(outputDir, 'Invalid output directory path');

	pa11yCiReporter.ensureOutputDirectory(outputDir);

	fixupResults(jsonResults);

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

	addLoggingInfo('Getting results for html reports');	

	const formattedResults = formatter.getResultsForHtmlReport(jsonResults);

	addLoggingInfo('Generating page Html reports');

	const pages = await pa11yCiReporter.generatePageHtmlReports(formattedResults.results,
		outputDir,
		options);

	// Do the math here rather than in our html template.
	const summary = formattedResults.summary;
	summary.failures = summary.total - summary.passes;
	summary.score = `${Math.round((summary.passes / summary.total) * 100)}%`;
	summary.codeCounts = accessibilityRuleCountSorted;
	summary.codeCountErrorSum = codeCountErrorSum;

	addLoggingInfo('Generating Summary Html reports');
	
	generateSummaryHtmlReport({
			date: new Date(),
			summary,
			pages
		},
		outputDir,
		templateName
	);
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
