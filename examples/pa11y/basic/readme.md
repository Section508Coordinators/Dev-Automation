# Pa11y Basic Example

Enter wording describing the Pa11y basic example scripts.


---

## Requirements

Node.js needs to be available on your system.

```sh
npm -g install
bin\custom-pa11y.js
```


## Usage

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

