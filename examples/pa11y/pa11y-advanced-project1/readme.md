# pa11y advanced examples: Project 1

---

Go to the [GitHub Playbook-Automation published page](https://section508coordinators.github.io/Dev-Automation/)

---

# pa11y engine: Customizing functionality

This project is meant to demonstrate multiple ways in which developers can use and combine various pa11y test engine functionality using different configurations as follows:

- **URL Scanning**: Using the "URLs:" option, cite the identity and number of URLs to test against from within the script itself or use the sitemap switch (-s)  to use a sitemap.xml file of URLs to test against.
- **Accessibility Standards**: Using the "standard:" option, indicate which accessibility standard rules to use for testing.
- **Ruleset**: Using the "runners:" option, indicate which vendor ruleset you wish to use. Pa11y allows you to select one or combine multiple rulesets. Pa11y currently supports axe-core, HTML CodeSniffer, and any other custom ruleset created to match the Pa11y engine requirements.
- **Individual rule selection**: By default, pa11y will use all rules in an identified ruleset for testing. If you don't want Pa11y to use all rules but rather use a subset of preferred rules, you do this by citing which rules you want pa11y to ***ignore***.  You do this in Pa11y by using the "ignore:" configuration option. 

- **HTML Reporting/Scoring**: using the HTML report switch (-h), this example provides summaries of rules that fail accessibility and  a simple scoring model for mass scan results. 

---

## Automated tools and rulesets

#### Ruleset assessments and recommended rules

This tool allows the user to pick and choose the individual, underlying rules for testing. Not all automated tool rulesets on the market perfectly align with the pass/fail success criteria as expressed by the DHS standard. However upon analysis, DHS OAST has identified specific rules, for specific vendor accessibility ruleset libraries, that provide value in identifying accessibility to the DHS Standard.

Those analyses of vendor accessibility rulesets and the OAST ruleset recommendations reside in rulesets folder (/rulesets) on this site.

---

## Technology requirements

Below are the core dependencies. See [this dependencies file](pa11y-dependency-map.txt) for a mapping of all dependencies associated with this example:

- Nodejs 6+
- Git

- axe-Puppeteer

- Commander
- async@3.6.3
- chalk@1.1.3
- chart.js@2.9.3
- cheerio@0.22.0
- globby@6.1.0
- lodash@4.17.20
- node-fetch@2.6.1
- pa11y-ci-reporter-html@2.0.0
- pa11y-ci@2.4.0
- pa11y-lint-config@1.2.1
- pa11y@5.3.0
- winston-daily-rotate-file@4.5.0
- winston@3.3.3
- wordwrap@1.0.0



---

## Setup

Git and Node.js needs to be available on your system. Also, there is a peer dependency on puppeteer. This means that in addition to running `npm install` you will need to run `npm install puppeteer`.

```sh
npm install
npm install puppeteer --no-save
```


## Usage/syntax

Project1 can be used by running it as a command line tool, `custom-pa11y`from the /bin/ folder:

```
Usage: node custom-pa11y.js [options] <paths>

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

### If you want to change the timeout or the amount of concurrent tasks then change these options in custom-pa11y.config.js

```
defaults: {
	concurrency:10,
	timeout:10000,
}
```

You can use timeout: 0 to disable timeout errors if you're loading a heavy page.

### Example implementation of switches

In a git bash window, run the following command from the /bin/ directory:

`node custom-pa11y.js --config config/04-custom-pa11y.config --template config/index.handlebars -h HTML-Rpt-04 -s https://section508coordinators.github.io/Dev-Automation/sitemaps/test-sitemap.xml -x '.*(pdf|jpg|png)$'`

This command will run an accessibility test against an external sitemap.xml file with 12 URLs, with the configuration that is set with the **--config** option and using the template that is set with the **--template** option and a folder will be created with the name "***HTML-Rpt-04***". This report will be saved to that named folder with an index.html file that indicates the first page of the report which displays the test results and a simple results score.

## Pre-configured examples

The /config/ directory contains multiple files with different configurations in each file, showing different features through their configuration settings as follows. Use the **--config** option to select any .js file found inside the /config/ directory. The pre-configured examples are meant to make it clear how a single script template can be customized by providing multiple examples:

- ***Example 1: 01-custom-pa11y.js***

  - Runs all default rules within the selected HTML Code Sniffer ruleset

  - Runs against URLs embedded in the script

  - Syntax: `node custom-pa11y.js --config config/01-custom-pa11y.config --template config/index.handlebars -h HTML-Rpt-01`

    

- ***Example 2: 02-custom-pa11y.js***

  - Runs all default rules within the selected axe-core ruleset

  - Runs against URLs embedded in the script

  - Syntax: `node custom-pa11y.js --config config/02-custom-pa11y.config --template config/index.handlebars -h HTML-Rpt-02`

    

- ***Example 3: 03-custom-pa11y.js***

  - Runs all default rules within the selected combination of both axe-core and HTML Code Sniffer rulesets

  - Runs against URLs embedded in the script

  - Syntax: `node custom-pa11y.js --config config/03-custom-pa11y.config --template config/index.handlebars -h HTML-Rpt-03`

    

- ***Example 4: 04-custom-pa11y.js***

  - Runs against only preferred rules within the selected combination of both axe-core and HTML Code Sniffer rulesets
  - Runs against URLs contained in an external sitemap.xml file
  - Syntax: `node custom-pa11y.js --config config/04-custom-pa11y.config --template config/index.handlebars -h HTML-Rpt-04 -s https://section508coordinators.github.io/Dev-Automation/sitemaps/test-sitemap.xml -x '.*(pdf|jpg|png)$'`

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

- **defaults**: inside the pa11yConfig object the configuration is set up.

    - **ignore**: the rules to be ignored are added or modified.

## Configure the handlebars templates

to modify any title, is to search inside the template and change the text

to hide the table, go to the **style** tag and look for the **table** styles and add **display: none**.

to hide the chart, you must comment out the script tag and comment out the tag containing the id accessibilityChart.
# More information

For more information on syntax for using this custom example, see the pa11y-ci syntax information here: https://github.com/pa11y/pa11y-ci 

---

04/18/2021 | 05:26p
