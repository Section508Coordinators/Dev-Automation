# lighthouse advanced examples: Project 1

<hr>
Go to the [GitHub Playbook-Automation published page](https://akingkci.github.io/Dev-Automation/)
<hr>


# lighthouse: Customizing functionality

This project is meant to demonstrate multiple ways in which developers can use and combine various lighthouse test engine functionality using different configurations as follows:

- **URL Scanning**: Using the "URLs:" option, cite the identity and number of URLs to test against from within the script itself or use the sitemap switch (-s)  to use a sitemap.xml file of URLs to test against.
- **Individual rule selection**: The underlying ruleset used by lighthouse is the Deque axe-core ruleset.  If you don't want to use all axe-core rules usually used by lighthouse but would rather use a subset of preferred rules, you do this by using the "onlyAudits:" configuration option and then cite the rules to be used.
- **HTML Reporting/Scoring**: Examples of writing test results to the command window or an HTML report. Also, extending the simple HTML report offered by the open source tool to provide a basic scoring model for mass scan results. This is done by using the HTML report switch (-h).

<hr>

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

## DHS OAST Ruleset Analysis

The following ruleset analyses artifacts were used as the basis for test configurations for this example to maintain as much alignment with TTv5 as possible and can be used for future customizations you wish to perform. These analyses, in the /docs/ folder, are based on the axe-core 3.5 ruleset and the DHS ICT Web Baseline 3.0 and Trusted Tester v 5.

1. **TTv5-friendly rules**: In order to prevent the Pa11y engine from running all rules in a given ruleset by default, the developer must specify the ruleset, and then explicitly and individually exclude, by rule name, any rules that should not run. This analysis presents a filterable spreadsheet that lists all rules to exclude for both axe-core and HTML CodeSniffer as being unfriendly to TTv5.

---

## Setup

Node.js needs to be available on your system. Also, there is a peer dependency on puppeteer. This means that in addition to running `npm install` you will need to run `npm install puppeteer`.

```sh
npm -g install






npm -g install lighthouse
npm install puppeteer --no-save (npm -g install puppeteer)
npm install axe-core --save-dev
reboot machine
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

`node custom-lighthouse.js -s http://coc.kciprojects.com/xml/kci-sitemap.xml -h --HTML_LH-Report -x '.*(pdf|jpg|png)$'`

This will run an accessibility test against a test web site of multiple web pages and create a folder with the name "***--HTML_LH-Report***" within the  "\bin\\" folder. Opening the index.html of that report will present you with test results and scoring.

## Pre-configured examples

The /bin/ directory contains multiple "custom-pa11y" files that showcase different features via their configuration settings as follows:

- **Script 1 (01-custom-lighthouse.js)**: 
  Use the following syntax for this script: This script presents the following:
  - Uses the "onlyAudits:" option to specify the select axe-core rules  to use for testing. 
  - Uses the "urls:" option and tests against 5 URLs that are hard-coded inside the script, as opposed to pointing to a sitemap file.
  - Uses the "standards:" option, this example uses the WCAG AA rules for HTML CodeSniffer. The HTML CodeSniffer ruleset is set via the "runners:" option.
  - Finally in the absence of the -h switch on the command, this example writes the test results to the *command window*.  
- **Script 2 (02-custom-pa11y.js):** 
  Use the following syntax for this script:`node 02-custom-pa11y.js`This script presents the following:
  - Uses the "runners:" option to specify the axe-core ruleset to use for testing. No rules are ignored, so testing is done using the full range of rules.
  - Uses the "urls:" option and tests against 1 URL that is hard-coded inside the script, as opposed to pointing to a sitemap file.
  - Finally in the absence of the -h switch on the command, this example writes the test results to the *command window*. 
- **Script 3 (03-custom-pa11y.js):** 
  Use the following syntax for this script:`node 03-custom-pa11y.js -s http://coc.kciprojects.com/xml/kci-sitemap.xml -h --HTML_Report -x '.*(pdf|jpg|png)$' `This script presents the following:
  - Uses the "runners:" option to specify both the axe-core and HTML CodeSniffer rulesets to be used for testing. No rules are ignored, so testing is done using the full range of all rules from both rulesets.
  - Uses the "-s" switch to override the hard coded URLs within the script but rather use a sitemap.xml file to  specify the URLs to test with.
  - Finally using the -h switch on the command, this example writes the test results to an HTML report as opposed to the *command window*. Reports will write to the "/bin/" folder using the report name specified in the command switch ("HTML_Report").
- **Script 4 (04-custom-pa11y.js):** 
  Use the following syntax for this script:`node 04-custom-pa11y.js -s http://coc.kciprojects.com/xml/kci-sitemap.xml -h --HTML_lh-Custom-Rules-Report -x '.*(pdf|jpg|png)$' `This script presents the following:
  - Uses the "runners:" option to specify both the axe-core and HTML CodeSniffer rulesets to be used for testing. 
  - Uses the "ignore" option to specific rules to ignore for both rulesets specified
  - Uses the "-s" switch to override the hard coded URLs within the script but rather use a sitemap.xml file to  specify the URLs to test with.
  - Using the -h switch on the command, this example writes the test results to an HTML report as opposed to the *command window*. Reports will write to the "/bin/" folder using the report name specified in the command switch ("HTML_Custom-Rules-Report").

<hr>

# More information

For more information on syntax for using this custom example, see the pa11y-ci syntax information here: https://github.com/pa11y/pa11y-ci 

<hr>
01/18/2021 | 10:58p