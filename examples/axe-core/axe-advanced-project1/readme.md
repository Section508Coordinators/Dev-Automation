# axe-core advanced examples: Project 1

---

Go to the [GitHub Playbook-Automation published page](https://section508coordinators.github.io/Dev-Automation/)

---


# Tool: Custom extended functionality

This project is meant to demonstrate one of multiple ways in which developers can use and combine various axe-core API functionality and other vendor tools to extend and expand functionality. 

By combining the axe-core API library with the underlying [Pa11y test engine](https://github.com/pa11y/pa11y), this example broadens the possibilities when performing accessibility testing and reporting to maximize effectiveness. These features include:

- **URL Scanning**: Using the "URLs:" option, cite the identity and number of URLs to test against from within the script itself or use the sitemap switch (-s)  to use a sitemap.xml file of URLs to test against.
- **Accessibility Standards**: Using the "standard:" option, indicate which accessibility standard rules to use for testing.
- **Ruleset**: Using the "runners:" option, indicate which vendor ruleset you wish to use. Pa11y allows you to select one or combine multiple rulesets. Pa11y currently supports axe-core, HTML CodeSniffer, and custom rulesets created to match the Pa11y engine requirements.
- **Individual rule selection**: By default, pa11y will use all rules in an identified ruleset for testing. If you don't want Pa11y to use all rules but rather use a subset of preferred rules, you do this by citing which rules you want pa11y to ***ignore***.  You do this in Pa11y by using the "ignore:" configuration option. 

- **HTML Reporting/Scoring**: Examples of extending the simple HTML report offered by the open source tool to provide a simple scoring model for mass scan results. This is done by using the HTML report switch (-h).

---

## Automated tools and rulesets

#### Ruleset assessments and recommended rules

This tool allows the user to pick and choose the individual, underlying rules for testing. Not all automated tool rulesets on the market perfectly align with the pass/fail success criteria as expressed by the DHS standard. However upon analysis, DHS OAST has identified specific rules, for specific vendor accessibility ruleset libraries, that provide value in identifying accessibility to the DHS Standard.

Those analyses of vendor accessibility rulesets and the OAST ruleset recommendations reside in [rulesets folder](/rulesets) on this site.

---

## Technology requirements

This example uses the following technology stack:

- Nodejs 6+
- Git
- axe-Puppeteer
- Commander
- Globby
- pa11y-ci-reporter-html
- protocolify
- puppeteer
- sitemapper

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
```

### Example implementation of switches

In a git bash window, run the following command from the /bin/ directory:

`node custom-axe -s https://section508coordinators.github.io/Dev-Automation/sitemaps/test-sitemap.xml -h HTML_Report -x '.*(pdf|jpg|png)$'`

This will run an accessibility test against a site map file of a small number of URLs, using the default axe-core rules, and create a folder with the name "***HTML_Report***" within the  "\bin\\" folder. Opening the index.html of that report will present you with test results and scoring.

## Pre-configured examples

The /bin/ directory contains multiple "custom-axe" files that showcase different functionality and features via their configuration settings as shown below. 

Instances where the syntax calls for a sitemap.xml file containing URLs to test, you can use the test sitemap file below in the syntax example, or point to your own sitemap.xml file:

- **Script: 01-custom-axe.js**
  - <u>Description</u>: Executes tests against internally "hard coded" URLs within the script file and runs all default axe-core rules
  - <u>Syntax</u>:  `node 01-custom-axe.js -h <HTML_report_name>`
- **Script: 02-custom-axe.js**
  - <u>Description:</u>  Executes tests against internally "hard coded" URLs within the script file and only tests against preferred rules that are Trusted Tester friendly
  - <u>Syntax</u>: `node 02-custom-axe.js -h <HTML_report_name>`
- **Script: 03-custom-axe.js**
  - <u>Description</u>: Executes tests against URLs in a sitemap file and runs all default axe-core rules. You must provide a pointer to a sitemap file or use the test sitemap file in the syntax example.
  - <u>Syntax</u>: `node 03-custom-axe -s https://section508coordinators.github.io/Dev-Automation/sitemaps/test-sitemap.xml -h 03-HTML_Report -x '.*(pdf|jpg|png)$' `
- **Script: 04-custom-axe.js**
  - <u>Description</u>: Executes tests against URLs in a sitemap file and runs only preferred axe-core rules that are Trusted tester friendly. You must provide a pointer to a sitemap file or use the test sitemap file in the syntax example.
  - <u>Syntax</u>: `node 04-custom-axe -s https://section508coordinators.github.io/Dev-Automation/sitemaps/test-sitemap.xml -h 04-HTML_Report -x '.*(pdf|jpg|png)$'`

<hr>

## More information

More comprehensive guidance on the axe-core engine can be found in the [Axe JavaScript Accessibility API](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md). 

---

02/20/2021 | 07:09p


