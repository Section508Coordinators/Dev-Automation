# axe-core basic examples: CLI

<hr>

Go to the [GitHub Playbook-Automation published page](https://section508coordinators.github.io/Dev-Automation/)

<hr>

## Tool: axe-core CLI

The axe-core CLI tool provides the tester with a command line interface for axe-core accessibility library to run accessibly tests.

This folder presents fully functioning examples of how to use the axe-core CLI tool for quick and easy accessibility testing.

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

- Nodejs 6+
- Git (Bash window)
- Chrome browser version 59+
- Chrome WebDriver for your version of Chrome

## Setup

1. Install Nodejs 6+
2. Install axe-core CLI globally: `npm install @axe-core/cli -g`
3. Running the examples, as is, will require the following regarding web browsers and webdrivers for those browsers:
   1. **Chrome**
      1. Requires Chrome browser version 59+
      2. Install Chromedriver that corresponds to your Chrome version
   2. **Other browsers**
      1. Install any other browser and browser driver you want to experiment with - outside of the included  examples.

## Usage/Syntax

In a command window, run: `axe <web_page_to_test>`

The MS Word document in this repository entitled '01_axe-CLI-Commands.docx' provides detailed and multiple examples of accessibility testing using the axe CLI.

<hr>

01/30/2021 | 04:28p
