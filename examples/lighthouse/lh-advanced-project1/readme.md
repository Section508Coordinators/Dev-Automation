# lighthouse advanced examples: Project 1

---

Go to the [GitHub Playbook-Automation published page](https://section508coordinators.github.io/Dev-Automation/)

---


# lighthouse: Customizing functionality

This project is meant to demonstrate multiple ways in which developers can use and combine various lighthouse test engine functionality using different configurations as follows:

- **URL Scanning**: Using the "URLs:" option, cite the identity and number of URLs to test against from within the script itself or use the sitemap switch (-s)  to use a sitemap.xml file of URLs to test against.
- **Individual rule selection**: The underlying ruleset used by lighthouse is the Deque axe-core ruleset.  If you don't want to use all axe-core rules usually used by lighthouse but would rather use a subset of preferred rules, you do this by using the "skipAudits:" configuration option to exclude the rule(s) to be used.
- **HTML Reporting/Scoring**: using the HTML report switch (-h), this example provides summaries of rules that fail accessibility and  a simple scoring model for mass scan results. 

---

## Automated tools and rulesets


#### Ruleset assessments and recommended rules

This tool allows the user to pick and choose the individual, underlying rules for testing. Not all automated tool rulesets on the market perfectly align with the pass/fail success criteria as expressed by the DHS standard. However upon analysis, DHS OAST has identified specific rules, for specific vendor accessibility ruleset libraries, that provide value in identifying accessibility to the DHS Standard.

Those analyses of vendor accessibility rulesets and the OAST ruleset recommendations reside in rulesets folder (/rulesets) on this site.

#### Lighthouse and axe-core rulesets

Note that Deque axe-core open-source rules are the underlying rules for lighthouse accessibility testing, however the scope of rules exposed with lighthouse testing do not match the full range of axe-core rules as exposed through the full axe-core API. 

##### Review axe-core rules tested with Lighthouse

To see the axe-core rules exposed via Lighthouse testing:

- Issue the command: `lighthouse --list-all-audits` and then note all listings with a preface of "**accessibility/**".
- Reference the Lighthouse section of the rulesets folder on this site for a listing of those rules.

To access the full range of axe-core rules, use the the axe-core test tools on this site.

---

## Technology requirements

This example uses the following technology stack:

- Chrome Desktop

- NodeJs 12+

- Git

- cheerio 1.0.0-rc.3: (https://www.npmjs.com/package/cheerio)

- commander 5.0.0: (https://www.npmjs.com/package/commander)

- globby 6.1.0: (https://www.npmjs.com/package/globby)

- handlebars 4.7.3: (https://www.npmjs.com/package/handlebars)

- lighthouse 7.0.0: (https://www.npmjs.com/package/lighthouse)

- node-fetch 2.6.0: (https://www.npmjs.com/package/node-fetch)

- protocolify 2.0.0: (https://www.npmjs.com/package/protocolify)

- puppeteer 2.1.1: (https://www.npmjs.com/package/puppeteer)

- typescript 3.8.3: (https://www.npmjs.com/package/typescript)

- winston: 3.3.3: (https://www.npmjs.com/package/winston)

- winston-daily-rotate-file 4.5.0: (https://www.npmjs.com/package/winston-daily-rotate-file)

- eslint 6.8.0: (https://www.npmjs.com/package/eslint)

  


---

## Setup

Git and Node.js needs to be available on your system. 

```sh
npm install
npm install puppeteer --no-save
```


## Usage/syntax

Project1 can be used by running it as a command line tool, `custom-pa11y`from the /bin/ folder:


```
Usage: node custom-lighthouse.js [options] <paths>

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

### Example implementation of switches

In a git bash window, run the following command from the /bin/ directory:

`node custom-lighthouse.js --config config/04-custom-lighthouse.config --template config/index.handlebars -h HTML-Rpt-04 -s http://section508coordinators.github.io/Dev-Automation/sitemaps/test-sitemap.xml -x '.*(pdf|jpg|png)$'`

This command will run an accessibility test against an external sitemap.xml file with 12 URLs, with the configuration that is set with the **--config** option and using the template that is set with the **--template** option and a folder will be created with the name "***HTML-Rpt-04***". This report will be saved to that named folder with an index.html file that indicates the first page of the report which displays the test results and a simple results score.

## Pre-configured examples

The /config/ directory contains multiple files with different configurations in each file, which show different features through their configuration settings as follows. Use the **--config** option to select any .js file found inside the /config/ directory:

- ***Example 1: 01-custom-lighthouse.js***

  - Uses the "urls:" option and tests against 10 URLs that are hard-coded inside the script, as opposed to pointing to a sitemap file.
    
  - Does not constrain rules and therefore runs against all axe-core rules lighthouse runs by default.

  - Syntax: `node custom-lighthouse.js --config config/01-custom-lighthouse.config.js --template config/index.handlebars -h HTML-Rpt-01` 

    

- ***Example 2: 02-custom-lighthouse.js***

  - Uses the "urls:" option and tests against 10 URLs that are hard-coded inside the script, as opposed to pointing to a sitemap file.
  - Instead of using all axe-core rules, uses the "skipAudits:" option to specify "TTv5 unfriendly" rules *to exclude* from testing
  - Syntax: `node custom-lighthouse.js --config config/02-custom-lighthouse.config.js --template config/index.handlebars -h HTML-Rpt-02`

## The syntax of the config files

- **Urls**: Urls can be a string or a function, functions would use in case the url needs authentication, functions take a browser puppeteer that can be used to perform certain actions before returning the url to run against axe.

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

- **lighthouse**: inside the lighthouse object the configuration is set up.

    - **onlyCategories**: Within the config object, this setting ensures rules that are analyzed are limited to the ones within the specific category (['accessibility']) selected and other rules are not included.

    - **skipAudits**: Within the config object, this setting allows you to exclude rules from testing that are normally included in the category selected.

## Configure the handlebars templates

to modify any title, is to search inside the template and change the text

to hide the table, go to the **style** tag and look for the **table** styles and add **display: none**.

to hide the chart, you must comment out the script tag and comment out the tag containing the id accessibilityChart.

# More information

For more information on lighthouse syntax, go here: https://github.com/GoogleChrome/lighthouse.

---

04/15/2021 | 11:40a

