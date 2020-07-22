# Custom Lighthouse

This project is meant to demonstrate combining authentication,
multiple-url scanning, and reporting with Lighthouse accessibility
audits.

The sitemap parsing code was taken and modified from the pa11y-ci
project <https://github.com/pa11y/pa11y-ci>. Copying the code wouldn't
have been necessary if the upstream pa11y-ci project had been
structured a bit differently. The duplicate code here could be removed
if the pa11y-ci project would pull the sitemap parsing code into the
lib rather than keeping it in the script.

Html reports are generated. In order to generate a full html report,
the `--html-report` switch must be used and a path must be given to
the output directory location for the report. The report will contain
a summary index.html page and then separate html pages for each url
scanned.

Urls are hard-coded for example purposes in the code to demonstrate
authentication and multiple urls. In addition - urls may be supplied
on the command line. 

Local filesystem scanning isn't supported currently.

---

## Requirements

Node.js needs to be available on your system.

```sh
npm -g install
bin\custom-lighthouse.js
```


## Usage

Custom Lighthouse can be used by running it as a command line tool, `custom-lighthouse`:

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
  -h, --html-report <dir>          Output directory for lighthouse reports
```
