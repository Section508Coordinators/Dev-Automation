# repository title/purpose

<hr>

Go to the [GitHub Playbook-Automation published page](https://section508coordinators.github.io/Dev-Automation/)

<hr>


# repository asset description

This project is meant to demonstrate multiple ways in which developers can use and combine various axe-core API functionality and other vendor tools. 

<hr>

## Technology requirements

This example uses the following technology stack:

- Nodejs 6+
- Git
- axe-Puppeteer

## DHS OAST Ruleset Analysis

The following ruleset analyses artifacts were used as the basis for test configurations for this example to maintain as much alignment with TTv5 as possible and can be used for future customizations you wish to perform. These analyses, in the /docs/ folder, are based on the axe-core 3.5 ruleset and the DHS ICT Web Baseline 3.0 and Trusted Tester v 5.

2. **TTv5-friendly rules**: In order to prevent the Pa11y engine from running all rules in a given ruleset by default, the developer must specify the ruleset, and then explicitly and individually exclude, by rule name, any rules that should not run. This analysis presents a filterable spreadsheet that lists all rules to exclude for both axe-core and HTML CodeSniffer as being unfriendly to TTv5.
3. **Pa11y config file**: This is a zip archive with a pa11y configuration file (.pa11yci.json) completed to show the syntax for only using preferred rules by populating all desired excluded files in the configuration file. This file is a valid list of excluded files as of axe version 3.5 and HTML Code Sniffer 2.5.1.

---

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

00/00/2021 | 00:00p | template version: 01/30/2021 03:00p


