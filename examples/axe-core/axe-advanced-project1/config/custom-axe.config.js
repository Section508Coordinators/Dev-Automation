const config = {
	urls: [
	
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
