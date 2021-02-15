# pa11y advanced examples: Project 1

<hr>

Go to the [GitHub Playbook-Automation published page](https://section508coordinators.github.io/Dev-Automation/)

<hr>


# pa11y engine: Customizing functionality

This project is meant to demonstrate multiple ways in which developers can use and combine various pa11y test engine functionality using different configurations as follows:

- **URL Scanning**: Using the "URLs:" option, cite the identity and number of URLs to test against from within the script itself or use the sitemap switch (-s)  to use a sitemap.xml file of URLs to test against.
- **Accessibility Standards**: Using the "standard:" option, indicate which accessibility standard rules to use for testing.
- **Ruleset**: Using the "runners:" option, indicate which vendor ruleset you wish to use. Pa11y allows you to select one or combine multiple rulesets. Pa11y currently supports axe-core, HTML CodeSniffer, and custom rulesets created to match the Pa11y engine requirements.
- **Individual rule selection**: By default, pa11y will use all rules in an identified ruleset for testing. If you don't want Pa11y to use all rules but rather use a subset of preferred rules, you do this by citing which rules you want pa11y to ***ignore***.  You do this in Pa11y by using the "ignore:" configuration option. 

- **HTML Reporting/Scoring**: Examples of writing test results to the command window or an HTML report. Also, extending the simple HTML report offered by the open source tool to provide a basic scoring model for mass scan results. This is done by using the HTML report switch (-h).

<hr>

## Automated tools and rulesets

#### Ruleset assessments and recommended rules

This tool allows the user to pick and choose the individual, underlying rules for testing. Not all automated tool rulesets on the market perfectly align with the pass/fail success criteria as expressed by the DHS standard. However upon analysis, DHS OAST has identified specific rules, for specific vendor accessibility ruleset libraries, that provide value in identifying accessibility to the DHS Standard.

Those analyses of vendor accessibility rulesets and the OAST ruleset recommendations reside in the following folder on this site: https://github.com/Section508Coordinators/Dev-Automation/tree/master/rulesets.

<hr>

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

Node.js needs to be available on your system. Also, there is a peer dependency on puppeteer. This means that in addition to running `npm install` you will need to run `npm install puppeteer`.

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
```

### Example implementation of switches

In a git bash window, run the following command from the /bin/ directory:

`node custom-pa11y.js -s http://coc.kciprojects.com/xml/kci-sitemap.xml -h --HTML_Report -x '.*(pdf|jpg|png)$'`

This will run an accessibility test against a test web site of multiple web pages and create a folder with the name "***--HTML_Report***" within the  "\bin\\" folder. Opening the index.html of that report will present you with test results and scoring.

## Pre-configured examples

The /bin/ directory contains multiple "custom-pa11y" files that showcase different features via their configuration settings as follows:

- **Script 1 (01-custom-pa11y.js)**: 
  Use the following syntax for this script:`node 01-custom-pa11y.js -h --HTML_Report -x '.*(pdf|jpg|png)$'`This script presents the following:
  - Uses the "runners:" option to specify the HTML CodeSniffer ruleset to use for testing. No rules are ignored, so testing is done using the full range of rules.
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
  Use the following syntax for this script:`node 04-custom-pa11y.js -s http://coc.kciprojects.com/xml/kci-sitemap.xml -h --HTML_Custom-Rules-Report -x '.*(pdf|jpg|png)$' `This script presents the following:
  - Uses the "runners:" option to specify both the axe-core and HTML CodeSniffer rulesets to be used for testing. 
  - Uses the "ignore" option to specific rules to ignore for both rulesets specififed
  - Uses the "-s" switch to override the hard coded URLs within the script but rather use a sitemap.xml file to  specify the URLs to test with.
  - Using the -h switch on the command, this example writes the test results to an HTML report as opposed to the *command window*. Reports will write to the "/bin/" folder using the report name specified in the command switch ("HTML_Custom-Rules-Report").

<hr>

# More information

For more information on syntax for using this custom example, see the pa11y-ci syntax information here: https://github.com/pa11y/pa11y-ci 

<hr>

01/22/2021 | 09:40p
