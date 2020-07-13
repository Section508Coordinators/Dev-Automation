# Custom Axe: Project 1

This project is meant to demonstrate combining authentication,
multiple-url scanning, and reporting using Axe-Core for accessibility
audits.

Html reports are generated. In order to generate a full html report,
the `--html-report` switch must be used and a path must be given to
the output directory location for the report. The report will contain
a summary index.html page and then separate html pages for each url
scanned.

Urls are hard-coded for example purposes in the code to demonstrate
authentication and multiple urls. In addition - urls may be supplied
on the command line. 

Local filesystem files can be scanned by specifying the path(s) to the
html file or files.

---

## Requirements

Node.js needs to be available on your system. Also, there is a peer
dependency on puppeteer. This means that in addition to running `npm
install` you will need to run `npm install puppeteer`.

```sh
npm -g install
npm install puppeteer --no-save
bin\custom-axe.js
```


## Usage

Custom Axe can be used by running it as a command line tool, `custom-axe`:

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
