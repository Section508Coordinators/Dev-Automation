# lighthouse advanced examples: Project 1

---

Go to the [GitHub Playbook-Automation published page](https://section508coordinators.github.io/Dev-Automation/)

---


# lighthouse: Customizing functionality

This project is meant to demonstrate multiple ways in which developers can use and combine various lighthouse test engine functionality using different configurations as follows:

- **URL Scanning**: Using the "URLs:" option, cite the identity and number of URLs to test against from within the script itself or use the sitemap switch (-s)  to use a sitemap.xml file of URLs to test against.
- **Individual rule selection**: The underlying ruleset used by lighthouse is the Deque axe-core ruleset.  If you don't want to use all axe-core rules usually used by lighthouse but would rather use a subset of preferred rules, you do this by using the "onlyAudits:" configuration option and then cite the rules to be used.
- **HTML Reporting/Scoring**: Examples of writing test results to the command window or an HTML report. Also, extending the simple HTML report offered by the open source tool to provide a basic scoring model for mass scan results. This is done by using the HTML report switch (-h).

---

## Automated tools and rulesets


#### Ruleset assessments and recommended rules

This tool allows the user to pick and choose the individual, underlying rules for testing. Not all automated tool rulesets on the market perfectly align with the pass/fail success criteria as expressed by the DHS standard. However upon analysis, DHS OAST has identified specific rules, for specific vendor accessibility ruleset libraries, that provide value in identifying accessibility to the DHS Standard.

Those analyses of vendor accessibility rulesets and the OAST ruleset recommendations reside in [rulesets folder](/rulesets) on this site.

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

`node custom-lighthouse.js -s http://coc.kciprojects.com/xml/kci2-sitemap.xml -h --HTML_LH-Report -x '.*(pdf|jpg|png)$'`

This will run an accessibility test against a test web site of multiple web pages and create a folder with the name "***--HTML_LH-Report***" within the  "\bin\\" folder. Opening the index.html of that report will present you with test results and scoring.

## Pre-configured examples

The /bin/ directory contains multiple "custom-lighthouse" files that showcase different features via their configuration settings as follows:

- **Script 1 (01-custom-lighthouse.js)**: 
  Use the following syntax for this script:`node 01-custom-lighthouse.js -h --HTML_LH-Report -x '.*(pdf|jpg|png)$'`This script presents the following:
  - Uses the "urls:" option and tests against 5 URLs that are hard-coded inside the script, as opposed to pointing to a sitemap file.
  - Does not constrain rules and therefore runs against all axe-core rules lighthouse runs by default.
- **Script 2 (02-custom-lighthouse.js):** 
  Use the following syntax for this script:`node 02-custom-lighthouse.js -s http://coc.kciprojects.com/xml/kci2-sitemap.xml -h --HTML_LH-Report -x '.*(pdf|jpg|png)$'`This script presents the following:
  - Uses the "runners:" option to specify the axe-core ruleset to use for testing. No rules are ignored, so testing is done using the full range of rules.
  - Uses the "-s" switch to override the hard coded URLs within the script and rather use a sitemap.xml file to  specify the URLs to test with.
  - Instead of using all axe-core rules, uses the "onlyAudits:" option to specify rules to use for testing

---

# More information

For more information on lighthouse syntax, go here: https://github.com/GoogleChrome/lighthouse.

---

02/20/2021 | 04:19p

