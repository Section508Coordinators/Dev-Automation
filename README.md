# Section 508 Test Automation
## Overview
This is an overview of Section 508/Accessibility test automation.
### Accessibility Test Automation Examples
#### Pa11y
##### Basic Example
##### Advanced Example
This example demonstrates the features of combining authentication,
multiple-url scanning, and reporting.

The sitemap parsing code was taken and modified from the pa11y-ci
project <https://github.com/pa11y/pa11y-ci>. Copying the code wouldn't
have been necessary if the upstream pa11y-ci project had been
structured a bit differently. The duplicate code here could be removed
if the pa11y-ci project would pull the sitemap parsing code into the
lib rather than keeping it in the script.

Html, json, and console reports are available. In order to generate a
full html report, the `--html-report` switch must be used and a path
must be given to the output directory location for the report. The
report will contain a summary index.html page and then separate html
pages for each url scanned.

Urls are hard-coded for example purposes in the code to demonstrate
authentication and multiple urls. In addition - urls may be supplied
on the command line. 

Local filesystem paths can be scanned by using a path rather than a
URL.

---

###### Requirements

Node.js needs to be available on your system.

```sh
npm -g install
bin\custom-pa11y.js
```


###### Usage

Custom Pa11y can be used by running it as a command line tool, `custom-pa11y`:

```
Usage: node custom-pa11y [options] <paths>

Options:
  -V, --version                    output the version number
  -s, --sitemap <url>              the path to a sitemap
  -f, --sitemap-find <pattern>     a pattern to find in sitemaps. Use with --sitemap-replace
  -r, --sitemap-replace <string>   a replacement to apply in sitemaps. Use with --sitemap-find
  -x, --sitemap-exclude <pattern>  a pattern to find in sitemaps and exclude any url that matches
  -j, --json                       Output results as JSON
  -h, --html-report <dir>          Takes json output and uses pa11y-ci-reporter-html to generate a report in <dir>
  -i, --include-zero-issues        Include detailed page reports for pages with no pa11y issues. Use with --html-report.
  -T, --threshold <number>         permit this number of errors, warnings, or notices, otherwise fail with exit code 2 (default: "0")
  -h, --help                       output usage information
```
#### Axe-core
##### Basic Example
##### Advanced Example
#### Google Lighthouse
##### Basic Example
##### Advanced Example
