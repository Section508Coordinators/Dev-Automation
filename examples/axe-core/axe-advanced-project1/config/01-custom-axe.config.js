//
//DATE: 03/21/2021
//FILE: 01-custom-axe.config.js
//AUTHOR: DHS OAST/ALAN KING
//
//------------------------------------------------------------------
//********************** DESCRIPTION *******************************
//------------------------------------------------------------------
//[1]-Rules: Runs against all default axe rules
//
//[2]-URL Source: Runs against internal embedded pages 
//==================================================================

const config = {
	urls: [
		// Ten (10) Hard-code URLs for testing here
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
/* you can use timeout: 0 to disabled timeout errors if you're loading a heavy page.
		timeout: 0,
*/
	concurrency:10,
	navigationOptions:{
		timeout: 20000,
	},
	axeConfig: {

		 rules: [

		 ],
		// locale?: Locale;
		// axeVersion: ''
	}
};

module.exports = config;
