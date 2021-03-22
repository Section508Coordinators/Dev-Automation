const commander = require('commander');

const config = {
	urls: [
	
		// Hard-code 10 URLs for testing here
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

	defaults: {
		log: (commander.json || commander.htmlReport) ? undefined : console,
		wrapWidth: process.stdout.columns || undefined,
		timeout: 120000,
		concurrency: 20,
		standard: 'WCAG2AA', // Section508, WCAG2A, WCAG2AA (default), WCAG2AAA

		ignore: [

			],  
		runners: [
			'axe',
			'htmlcs'
		] 


	}
};

module.exports = config;