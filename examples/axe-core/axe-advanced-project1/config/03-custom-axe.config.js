//
//DATE: 03/21/2021
//FILE: 03-custom-axe.config.js
//AUTHOR: DHS OAST/ALAN KING
//
//------------------------------------------------------------------------
//********************** DESCRIPTION *************************************
//------------------------------------------------------------------------
//[1]-Rules: Depending on the switches you add to your node execution
//           command, you can run against all defaullt axe rules by 
//           leaving the "Rules" setting below empty as is, or you
//           can populate it and turn on only preferred rules and 
//           turn off the rules you don't.
//
//[2]-URL Source: Depending on the switchs you add to your node execution
//                command, you can leave the urls: setting as is and run
//				  against the embedded URLs, or use the -s switch to 
//				  point to a sitemap.xml file with URLs to run against. 
//=======================================================================

const config = {
	urls: [
			// You can enter URLs here for testing if you are not using an
			// external sitemap.xml file to identify URLs for testing:

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
