# axe-core advanced examples: Project 1

---

Go to the [GitHub Playbook-Automation published page](https://section508coordinators.github.io/Dev-Automation/)

---


# Tool: Custom extended functionality

This project is meant to demonstrate one of multiple ways in which developers can use and combine various axe-core API functionality and other vendor tools to extend and expand functionality. 

By combining the axe-core API library with the underlying [Pa11y test engine](https://github.com/pa11y/pa11y), this example broadens the possibilities when performing accessibility testing and reporting to maximize effectiveness. These features include:

- **URL Scanning**: Using the "URLs:" option, cite the identity and number of URLs to test against from within the script itself or use the sitemap switch (-s)  to use a sitemap.xml file of URLs to test against.
- **Individual rule selection**: Using the "rules:" option, enable or disable the underlying rules you want to use for testing. 

- **HTML Reporting/Scoring**: Using the HTML report switch (-h), this example provides summaries of rules that fail accessibility and  a simple scoring model for mass scan results. 

---

## Automated tools and rulesets

#### Ruleset assessments and recommended rules

This tool allows the user to pick and choose the individual, underlying rules for testing. Not all automated tool rulesets on the market perfectly align with the pass/fail success criteria as expressed by the DHS standard. However upon analysis, DHS OAST has identified specific rules, for specific vendor accessibility ruleset libraries, that provide value in identifying accessibility to the DHS Standard.

Those analyses of vendor accessibility rulesets and the OAST ruleset recommendations reside in rulesets folder (/rulesets) on this site.

---

## Technology requirements

Below are the core dependencies. See [this dependencies page](axe-dependency-map.txt) for a mapping of all dependencies associated with this example.

- NodeJs 6+
- Git
- @types/async 3.2.5: (https://www.npmjs.com/package/@types/async)
- async 3.2.0: (https://www.npmjs.com/package/async)
- axe-puppeteer 1.0.0 (https://www.npmjs.com/package/@axe-core/pupeeteer)
- commander 5.0.0: (https://www.npmjs.com/package/commander)
- globby 6.1.0: (https://www.npmjs.com/package/globby)
- pa11y-ci-reporter-html 2.0.1: (https://www.npmjs.com/package/pa11y-ci-reporter-html)
- protocolify 3.0.0: (https://www.npmjs.com/package/protocolify)
- puppeteer 2.1.1: (https://www.npmjs.com/package/puppeteer)
- sitemapper: 3.0.5 (https://www.npmjs.com/package/sitemapper)
- winston: 3.3.3 (https://www.npmjs.com/package/winston)
- winston-daily-rotate-file 4.5.0: (https://www.npmjs.com/package/winston-daily-rotate-file)
- typescript 3.8.3: (https://www.npmjs.com/package/typescript)

---

## Setup

Git and Node.js needs to be available on your system. Also, there is a peer dependency on puppeteer. This means that in addition to running `npm install` you will need to run `npm install puppeteer`.

```sh
npm install
npm install puppeteer --no-save
```


## Usage/syntax

Project1 can be used by running it as a command line tool, `custom-axe` from the /bin/ folder:

```
Usage: node custom-axe.js [options] <paths>

Options:
  	-V, --version                    output the version number
  	-s, --sitemap <url>              the path to a sitemap
	-f, --sitemap-find <pattern>     a pattern to find in sitemaps. Use with
                                   --sitemap-replace
	-r, --sitemap-replace <string>   a replacement to apply in sitemaps. Use with
                                   --sitemap-find
	-x, --sitemap-exclude <pattern>  a pattern to find in sitemaps and exclude
                                   any url that matches
	-h, --html-report <dir>          Takes json output and uses
                                   pa11y-ci-reporter-html to generate a report
                                   in <dir>
	-h, --help                       display help for command
	-c, --config <string>            Use an alternate configuration for this analysis,
                                   default file: config/custom-axe.config.js
	-t, --template <string>          Use an alternate template for this analysis,
                                   default file: config/index.handlebars
	-l, --logs <Boolean>,            Generate folder and log files,
		                               default value: false'								   
```

### If you want to change the timeout or the amount of concurrent tasks then change these options in custom-axe.config.js 

    concurrency:10,
    navigationOptions:{
    	timeout: 10000,
    },


you can use timeout: 0 to disabled timeout errors if you're loading a heavy page.


### Example implementation of switches

In a git bash window, run the following command from the /bin/ directory:

`node custom-axe.js --config config/04-custom-axe.config --template config/index.handlebars -h HTML-Rpt-04 -s https://section508coordinators.github.io/Dev-Automation/sitemaps/test-sitemap.xml -x '.*(pdf|jpg|png)$'`

This command will run an accessibility test against an external sitemap.xml file with 12 URLs, with the configuration that is set with the **--config** option and using the template that is set with the **--template** option a folder will be created with the name "***HTML-Rpt-04***". This report will be saved to that named folder with an index.html file that indicates the first page of the report which displays the test results and a simple results score.

## Pre-configured examples

The /config/ directory contains multiple files with different configurations in each file, showing different features through their configuration settings as follows. Use the **--config** option to select any .js file found inside the /config/ directory. The pre-configured examples are meant to make it clear how a single script template can be customized by providing multiple examples:

- ***Example 1: 01-custom-axe.js***

  - Runs against all default axe-core rules

  - Runs against URLs embedded in the script

  - Syntax: `node custom-axe.js --config config/01-custom-axe.config --template config/index.handlebars -h HTML-Rpt-01`

    

- ***Example 2: 02-custom-axe.js***

  - Runs against only preferred axe-core rules

  - Runs against URLs embedded in the script

  - Syntax: `node custom-axe.js --config config/02-custom-axe.config --template config/index.handlebars -h HTML-Rpt-02`

    

- ***Example 3: 03-custom-axe.js***

  - Runs against all default axe-core rules

  - Runs against URLs identified in an external sitemap.xml file

  - Syntax:  `node custom-axe.js --config config/03-custom-axe.config --template config/index.handlebars -h HTML-Rpt-03 -s http://section508coordinators.github.io/Dev-Automation/sitemaps/test-sitemap.xml -x '.*(pdf|jpg|png)$'`

    

- ***Example 4: 04-custom-axe.js***

  - Runs against only preferred axe-core rules
  - Runs against URLs identified in an external sitemap.xml file
  - Syntax: `node custom-axe.js --config config/04-custom-axe.config --template config/index.handlebars -h HTML-Rpt-04 -s http://section508coordinators.github.io/Dev-Automation/sitemaps/test-sitemap.xml -x '.*(pdf|jpg|png)$'`

## The syntax of the config files

- **Urls**: Urls can be a string or a function. Functions would be used if accessing the url requires authentication. Functions use  *puppeteer* that can be used to perform certain actions before returning the url to run against.

  Login function example:

  ```
    async (puppet) => {
	    // log into site before running tests and push the post login page onto
		  const page = await puppet.newPage();
		  await page.goto('http://testing-ground.scraping.pro/login');
		  await page.waitForSelector('#usr', {visible: true});

		  // Fill in and submit login form.
		  const emailInput = await page.$('#usr');
		  await emailInput.type('admin');
		  const passwordInput = await page.$('#pwd');
		  await passwordInput.type('12345');
		  const submitButton = await page.$('input[type=submit]');

	    await Promise.all([
		    submitButton.click(),
		    page.waitForNavigation(),
		  ]);

		  if (page.url() != 'http://testing-ground.scraping.pro/login?mode=welcome') {
		    console.error('login failed!');
		  } else {
		    console.log('login succeeded');
		    const cookies = await page.cookies();
		    for (var key in cookies) {
		      console.log(`found cookie ${cookies[key].name}`);
		    }
		  }
		  await page.close();

		  return 'http://testing-ground.scraping.pro/login?mode=welcome';
		},
  ```

- **axeConfig**: inside the axeConfig object the configuration is set up.

    - **tags**: tags can be used to select groups of tests.

    - **checks**: can define new checks or override existing.

    - **disableOtherRules**: if true, only use our rules.

    - **rules**: define new rules or override existing. 

## Configure the handlebars templates

to modify any title, is to search inside the template and change the text

to hide the table, go to the **style** tag and look for the **table** styles and add **display: none**.

to hide the chart, you must comment out the script tag and comment out the tag containing the id accessibilityChart.

<hr>

## More information

More comprehensive guidance on the axe-core engine can be found in the [Axe JavaScript Accessibility API](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md). 

---

04/15/2021 | 11:26a


