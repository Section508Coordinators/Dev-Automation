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

- Chrome desktop
- Nodejs 12+
- Git
- cheerio
- Commander
- Globby
- handlebars
- lighthouse
- axe-core
- node-fetch
- protocolify
- puppeteer
- typescript


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
```

### Example implementation of switches

In a git bash window, run the following command from the /bin/ directory:

`node custom-lighthouse.js -s https://section508coordinators.github.io/Dev-Automation/sitemaps/test-sitemap.xml -h HTML_LH-Report -x '.*(pdf|jpg|png)$'`

This will run an accessibility test against a test web site of multiple web pages and create a folder with the name "***HTML_LH-Report***" within the  "\bin\\" folder. Opening the index.html of that report will present you with test results and scoring.

## Pre-configured examples

The "\bin\\" directory contains multiple "custom-lighthouse" script files that showcase different functionality and features via their configuration settings as shown below. 

Instances where the syntax calls for a sitemap.xml file containing URLs to test, you can use the test sitemap file below in the syntax example, or point to your own sitemap.xml file:

- **Script: 01-custom-lighthouse.js**
  - <u>Description</u>: Executes tests against internally "hard coded" URLs within the script file and runs all default lighthouse (axe-core) rules
  - <u>Syntax</u>:  `node 01-custom-lighthouse.js -h <HTML_report_name>`
- **Script: 02-custom-lighthouse.js**
  - <u>Description:</u>  Executes tests against internally "hard coded" URLs within the script file and only tests against preferred rules that are Trusted Tester friendly
  - <u>Syntax</u>: `node 02-custom-lighthouse.js -h <HTML_report_name>`
- **Script: 03-custom-lighthouse.js**
  - <u>Description</u>: Executes tests against URLs in a sitemap file and runs all default lighthouse (axe-core) rules. You must provide a pointer to a sitemap file or use the test sitemap file in the syntax example.
  - <u>Syntax</u>: `node 03-custom-lighthouse -s https://section508coordinators.github.io/Dev-Automation/sitemaps/test-sitemap.xml -h <HTML_report_name> -x '.*(pdf|jpg|png)$' `
- **Script: 04-custom-lighthouse.js**
  - <u>Description</u>: Executes tests against URLs in a sitemap file and runs only preferred lighthouse (axe-core) rules that are Trusted Tester friendly. You must provide a pointer to a sitemap file or use the test sitemap file in the syntax example.
  - <u>Syntax</u>: `node 04-custom-lighthouse -s https://section508coordinators.github.io/Dev-Automation/sitemaps/test-sitemap.xml -h <HTML_report_name> -x '.*(pdf|jpg|png)$'`

---

# More information

For more information on lighthouse syntax, go here: https://github.com/GoogleChrome/lighthouse.

---

03/02/2021 | 05:04p

