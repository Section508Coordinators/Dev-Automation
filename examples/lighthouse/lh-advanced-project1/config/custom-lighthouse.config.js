const config = {
	urls: [

		// Hard-code URLs for testing here. Note that if this script is run
		// with a sitemap.xml switch, the URLs in this hard-coded list below
		// will be added to the list of URLs cited in the sitemap.xml file for
		// testing:

		"https://www.hhs.gov/az/a/index.html",
		"https://www.hhs.gov/about/index.html",
		"https://www.hhs.gov/programs/index.html",
		"https://www.hhs.gov/regulations/index.html",
		"https://www.hhs.gov/about/news/coronavirus/index.html",
		"https://www.hhs.gov/opioids/",
		"https://www.hhs.gov/surgeongeneral/reports-and-publications/tobacco/index.html",
		"https://www.hhs.gov/healthcare/index.html",
		"https://www.hhs.gov/grants/index.html",
		"https://www.hhs.gov/health.gov/our-work/physical-activity"
		],

	lighthouse: {
		config: {
			// desktop accessibility scan
			extends: 'lighthouse:default',
			settings: {
				onlyCategories: ['accessibility'],
				skipAudits: [
					'accesskeys',
					'aria-allowed-attr',
					'aria-command-name',
					'aria-hidden-body',
					'aria-meter-name',
					'aria-progressbar-name',
					'aria-required-attr',
					'aria-required-children',
					'aria-required-parent',
					'aria-roles',
					'aria-toggle-field-name',
					'aria-tooltip-name',
					'aria-treeitem-name',
					'aria-valid-attr',
					'bypass',
					'custom-controls-labels',
					'custom-controls-roles',
					'definition-list',
					'dlitem',
					'duplicate-id-active',
					'duplicate-id-aria',
					'focusable-controls',
					'focus-traps',
					'heading-order',
					'interactive-element-affordance',
					'logical-tab-order',
					'managed-focus',
					'meta-refresh',
					'meta-viewport',
					'object-alt',
					'offscreen-content-hidden',
					'tabindex',
					'th-has-data-cells',
					'use-landmarks',
					'video-caption',
					'visual-order-follows-dom'
					],
				
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

		},
		timeout: 120000
	}
};

module.exports = config;