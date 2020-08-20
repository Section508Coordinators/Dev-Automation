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
			'https://section508coordinators.github.io/BaselineTestPages2/test-cases/TC1005C001.html',

	],

	defaults: {
		log: (commander.json || commander.htmlReport) ? undefined : console,
		wrapWidth: process.stdout.columns || undefined,
		timeout: 40000,
		concurrency: 20,
		standard: 'WCAG2AA', // Section508, WCAG2A, WCAG2AA (default), WCAG2AAA

	ignore: [
			// AXe specific rules //
/*			'accesskeys',
			'area-alt',
			'aria-allowed-role',
			'aria-hidden-body',
			'aria-required-attr',
			'aria-required-children',
			'aria-required-parent',
			'aria-roledescription',
			'aria-roles',
			'aria-valid-attr',
			'aria-valid-attr-value',
			'autocomplete-valid',
			'avoid-inline-spacing',
			'blink',
			'bypass',
			'css-orientation-lock',
			'definition-list',
			'dlitem',
			'duplicate-id-active',
			'duplicate-id-aria',
			'focus-order-semantics',
			'frame-tested',
			'heading-order',
			'hidden-content',
			'html-xml-lang-mismatch',
			'identical-links-same-purpose',
			'img-redundant-alt',
			'label-content-name-mismatch',
			'label-title-only',
			'landmark-banner-is-top-level',
			'landmark-complementary-is-top-level',
			'landmark-contentinfo-is-top-level',
			'landmark-main-is-top-level',
			'landmark-no-duplicate-banner',
			'landmark-no-duplicate-contentinfo',
			'landmark-no-duplicate-main',
			'landmark-one-main',
			'landmark-unique',
			'link-in-text-block',
			'marquee',
			'meta-refresh',
			'meta-viewport',
			'meta-viewport-large',
			'no-autoplay-audio',
			'object-alt',
			'page-has-heading-one',
			'p-as-heading',
			'region',
			'server-side-image-map',
			'skip-link',
			'svg-img-alt',
			'tabindex',
			'table-duplicate-name',
			'table-fake-caption',
			'td-has-header',
			'th-has-data-cells',
			// End Axe //

			// Begin HTML CodeSniffer // */
			'WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputText.Name'

/*			'WCAG2A.Principle1.Guideline1_1.1_1_1.H2.EG5',
			'WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74',
			'WCAG2AA.Principle1.Guideline1_1.1_1_1.G94,G92.Applet',
			'WCAG2AA.Principle1.Guideline1_1.1_1_1.G94,G92.Object',
			'WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Button',
			'WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image',
			'WCAG2AA.Principle1.Guideline1_1.1_1_1.H2.EG3',
			'WCAG2AA.Principle1.Guideline1_1.1_1_1.H2.EG4',
			'WCAG2AA.Principle1.Guideline1_1.1_1_1.H24',
			'WCAG2AA.Principle1.Guideline1_1.1_1_1.H24.2',
			'WCAG2AA.Principle1.Guideline1_1.1_1_1.H30.2',
			'WCAG2AA.Principle1.Guideline1_1.1_1_1.H35.2',
			'WCAG2AA.Principle1.Guideline1_1.1_1_1.H35.3',
			'WCAG2AA.Principle1.Guideline1_1.1_1_1.H36',
			'WCAG2AA.Principle1.Guideline1_1.1_1_1.H37',
			'WCAG2AA.Principle1.Guideline1_1.1_1_1.H53',
			'WCAG2AA.Principle1.Guideline1_1.1_1_1.H67.1',
			'WCAG2AA.Principle1.Guideline1_1.1_1_1.H67.2',
			'WCAG2AA.Principle1.Guideline1_2.1_2_1.G158',
			'WCAG2AA.Principle1.Guideline1_2.1_2_1.G159,G166',
			'WCAG2AA.Principle1.Guideline1_2.1_2_2.G87,G93',
			'WCAG2AA.Principle1.Guideline1_2.1_2_4.G9,G87,G93',
			'WCAG2AA.Principle1.Guideline1_2.1_2_5.G78,G173,G8',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.G141',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H39,H73.4',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H39.3.Check',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H39.3.NoCaption',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H42',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H43.ScopeAmbiguous',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H44.1.After',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H44.1.Before',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H44.2',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H44.NoForAttr',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H44.NoId',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H44.NoLabelAllowed',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H44.NonExistent',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H44.NonExistentFragment',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H44.NotFormControl',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H48',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H48.1',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H48.2',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H49.AlignAttr',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H63.1',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H63.2',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H63.3',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H65',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H65.3',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H71.2',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H71.3',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H73.3.Check',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H73.3.NoSummary',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H85.2',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.H93',
			'WCAG2AA.Principle1.Guideline1_3.1_3_2.G57',
			'WCAG2AA.Principle1.Guideline1_3.1_3_3.G96',
			'WCAG2AA.Principle1.Guideline1_4.1_4_1.G14,G182',
			'WCAG2AA.Principle1.Guideline1_4.1_4_2.F23',
			'WCAG2AA.Principle1.Guideline1_4.1_4_3.F24.BGColour',
			'WCAG2AA.Principle1.Guideline1_4.1_4_3.F24.FGColour',
			'WCAG2AA.Principle1.Guideline1_4.1_4_3.G145',
			'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18',
			'WCAG2AA.Principle1.Guideline1_4.1_4_4.G142',
			'WCAG2AA.Principle1.Guideline1_4.1_4_5.G140,C22,C30.AALevel',
			'WCAG2AA.Principle2.Guideline2_1.2_1_1.SCR20.DblClick',
			'WCAG2AA.Principle2.Guideline2_1.2_1_1.SCR20.MouseDown',
			'WCAG2AA.Principle2.Guideline2_1.2_1_1.SCR20.MouseMove',
			'WCAG2AA.Principle2.Guideline2_1.2_1_1.SCR20.MouseOut',
			'WCAG2AA.Principle2.Guideline2_1.2_1_1.SCR20.MouseOver',
			'WCAG2AA.Principle2.Guideline2_1.2_1_1.SCR20.MouseUp',
			'WCAG2AA.Principle2.Guideline2_1.2_1_2.F10',
			'WCAG2AA.Principle2.Guideline2_2.2_2_1.F40.2',
			'WCAG2AA.Principle2.Guideline2_2.2_2_1.F41.2',
			'WCAG2AA.Principle2.Guideline2_2.2_2_2.F4',
			'WCAG2AA.Principle2.Guideline2_2.2_2_2.F47',
			'WCAG2AA.Principle2.Guideline2_2.2_2_2.SCR33,SCR22,G187,G152,G186,G191',
			'WCAG2AA.Principle2.Guideline2_3.2_3_1.G19,G176',
			'WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124,H69',
			'WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124.NoSuchId',
			'WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124.NoSuchIdFragment2.4.2',
			'WCAG2AA.Principle2.Guideline2_4.2_4_1.H64.2',
			'WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.2',
			'WCAG2AA.Principle2.Guideline2_4.2_4_3.H4.2',
			'WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81',
			'WCAG2AA.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81,H33',
			'WCAG2AA.Principle2.Guideline2_4.2_4_5.G125,G64,G63,G161,G126,G185',
			'WCAG2AA.Principle2.Guideline2_4.2_4_6.G130,G131',
			'WCAG2AA.Principle2.Guideline2_4.2_4_7.G149,G165,G195,C15,SCR31',
			'WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2',
			'WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.3.XmlLang',
			'WCAG2AA.Principle3.Guideline3_1.3_1_2.H58',
			'WCAG2AA.Principle3.Guideline3_1.3_1_2.H58.1.XmlLang',
			'WCAG2AA.Principle3.Guideline3_2.3_2_1.G107',
			'WCAG2AA.Principle3.Guideline3_2.3_2_2.H32.2',
			'WCAG2AA.Principle3.Guideline3_2.3_2_3.G61',
			'WCAG2AA.Principle3.Guideline3_2.3_2_4.G197',
			'WCAG2AA.Principle3.Guideline3_3.3_3_1.G83,G84,G85',
			'WCAG2AA.Principle3.Guideline3_3.3_3_2.G131,G89,G184,H90',
			'WCAG2AA.Principle3.Guideline3_3.3_3_3.G177',
			'WCAG2AA.Principle3.Guideline3_3.3_3_4.G98,G99,G155,G164,G168.LegalForms',
			'WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.Empty',
			'WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.EmptyWithName',
			'WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.NoHref',
			'WCAG2AA.Principle1.Guideline1_3.1_3_1.F92,ARIA4',
			'WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.Placeholder'*/
		], 
		runners: [
			'axe',
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
