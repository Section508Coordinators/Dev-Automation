# pa11y basic examples: CLI

<hr>

Go to the [GitHub Playbook-Automation published page](https://section508coordinators.github.io/Dev-Automation/)

<hr>

## Tool: pa11y CLI

This tool provides the tester with a command line interface that accesses the pa11y test engine to automate accessibility testing using a variety of test automate vendor rulesets.

The MS Word document in this repository entitled '01_Pa11y-CLI-Commands.docx' provides detailed and multiple examples of accessibility testing using the pa11y CLI.

<hr>
## Automated tools and rulesets

Because automated tools provide the tester with the efficiency of pass/fail conclusions, it is critical to thoroughly assess that logic – also known as its ***rules***. A tool’s collective rules or ruleset should be assessed to determine its accuracy as well as the degree to which its logic aligns with your organization’s ***target accessibility standard***. In the case of DHS, the target accessibility standard to which the automated tools on this site are compared are as follows:

#### DHS target accessibility standard

- [The Section 508 ICT Testing Baseline for Web (October 2020 | version 3.0)](https://section508coordinators.github.io/ICTTestingBaseline/) (ICT Baseline)
- [Trusted Tester: Section 508 Conformance Test Process for Web (June 2019 | version 5.0)](https://section508coordinators.github.io/TrustedTester/) (TTv5)

#### Ruleset assessments and recommended rules

Not all automated tool rulesets on the market perfectly align with the pass/fail success criteria as expressed by the DHS standard. However upon analysis, DHS OAST has identified specific rules, for specific vendor accessibility ruleset libraries, that provide value in identifying accessibility to the DHS Standard.

Those analyses of vendor accessibility rulesets and the OAST ruleset recommendations reside in the following folder on this site: https://github.com/Section508Coordinators/Dev-Automation/tree/master/rulesets.

<hr>

## Technology requirements


This example uses the following technology stack:

- Nodejs 8+
- Git (Bash window)
- [Pa11y 4](https://github.com/pa11y/pa11y/tree/4.x)+

<hr>

## Setup

1. Install Nodejs 8+
2. Install pa11y globally: `npm install -g pa11y`

## Usage/Syntax

In a command window, run: `pa11y [options] <url>`

The MS Word document in this repository entitled '01_pa11y-CLI-Commands.docx' provides detailed and multiple examples of accessibility testing using the pa11y CLI.

<hr>
> > Here









## More Information

For more information on syntax for using this example, see the pa11y syntax information here: https://github.com/pa11y/pa11y

<hr>

01/221/2021 | 09:42p

