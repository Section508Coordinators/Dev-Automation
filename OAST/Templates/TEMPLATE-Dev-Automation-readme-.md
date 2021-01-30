# repository title/purpose

<hr>

Go to the [GitHub Playbook-Automation published page](https://section508coordinators.github.io/Dev-Automation/)

<hr>

## Tool: repository asset heading

[Description of what this folder/repository provides] 

This project is meant to demonstrate multiple ways in which developers can use and combine various axe-core API functionality and other vendor tools. 

<hr>
## Automated tools and rulesets

Because automated tools provide the tester with the efficiency of pass/fail conclusions,  it is critical to thoroughly assess that logic – also known as its ***rules***. A tool’s collective rules or ruleset should be assessed to determine its accuracy as well as the degree to which its logic aligns with your organization’s ***target accessibility standard***. In the case of DHS, the target accessibility standard to which the automated tools on this site are compared are as follows:

#### DHS target accessibility standard

- [The Section 508 ICT Testing Baseline for Web (October 2020 | version 3.0)](https://section508coordinators.github.io/ICTTestingBaseline/) (ICT Baseline)
- [Trusted Tester: Section 508  Conformance Test Process for Web (June 2019 | version 5.0)](https://section508coordinators.github.io/TrustedTester/) (TTv5)

#### Ruleset assessments and recommended rules

As one might suspect, not all automated tool rulesets on the market perfectly align with the pass/fail success criteria as expressed by the DHS standard. However upon analysis, DHS OAST has identified specific rules, for specific vendor accessibility ruleset libraries, that provide value in identifying accessibility to the DHS Standard.   

Those analyses of vendor accessibility rulesets and the OAST ruleset recommendations reside in the following folder on this site: https://github.com/Section508Coordinators/Dev-Automation/tree/master/rulesets.

<hr>

## Technology requirements

This example uses the following technology stack:

- Nodejs 6+
- Git
- axe-Puppeteer

## Setup

Node.js needs to be available on your system. Also, there is a peer dependency on puppeteer. This means that in addition to running `npm install` you will need to run `npm install puppeteer`.

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

### Example implementation of syntax

In a git bash window, run the following command from the /bin/ directory:

`node custom-axe.js -s http://coc.kciprojects.com/xml/kci-sitemap.xml -h --HTML_axe-Report -x '.*(pdf|jpg|png)$'`

This will run an accessibility test against a test web site of multiple web pages and create a folder with the name "***--HTML_Report***" within the  "\bin\\" folder. Opening the index.html of that report will present you with test results and scoring.

## Pre-configured examples

The /bin/ directory contains multiple "custom-axe" files that showcase different features via their configuration settings as follows. Use any desired combinations of switch commands on the base .js files below:

- **Execute all axe rules when testing**: `01-custom-axe.js`
- **Execute only certain rules that are TTv5 friendly**: `02-custom-axe.js`

<hr>

# More information

More comprehensive guidance on the axe-core engine can be found... 

<hr>

00/00/2021 | 00:00p | template version: 01/30/2021 04:27p


