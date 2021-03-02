# lighthouse basic examples: Scripting

---

Go to the [GitHub Playbook-Automation published page](https://section508coordinators.github.io/Dev-Automation/)

---

## lighthouse: programmatic usage

The scripts (JavaScript) in this project are meant to provide relatively simple examples, on which you can build, of how to use the pa11y  accessibility engine for accessibility testing using various configurations and rulesets - to include Deque's axe-core and SQIZ Lab's HTML CodeSniffer.  

## Automated tools and rulesets

#### Ruleset assessments and recommended rules

This tool allows the user to pick and choose the individual, underlying rules for testing. Not all automated tool rulesets on the market perfectly align with the pass/fail success criteria as expressed by the DHS standard. However upon analysis, DHS OAST has identified specific rules, for specific vendor accessibility ruleset libraries, that provide value in identifying accessibility to the DHS Standard.

Those analyses of vendor accessibility rulesets and the OAST ruleset recommendations reside in rulesets folder (/rulesets) on this site.

---

## Technology requirements

These examples use the following technology stack:

- Chrome
- Nodejs 12+
- Git (Bash window)
- google lighthouse

## Setup

Perform the following steps to setup your environment to run the examples

1. Install Chrome desktop
2. Install Git 
3. Install Node
4. Install lighthouse: `npm install`
5. Reboot

---

## Usage/Syntax

In a Git Bash window, run: `node <script_name>`

---

### Example scripts

The scripts will present different scenarios based on their internal configurations as follows:

- <u>*Script 1*</u>:`01_lighthouse_BasicScript.js`: This script:

  - Runs only the audit (test) for 'accessibility' against one URL and all audits (rules)

  - Writes an HTML report to your local machine file system.

  - Writes message to the console indicating the processing is complete and the accessibility score of the page tested.

    

- <u>*Script 2*</u>:`02_lighthouse_BasicScript.js`: This script:

  - Runs only the audit (test) for 'accessibility' against one URL and only against preferred audits (rules)
  - Writes an HTML report to your local machine file system.
  - Writes message to the console indicating the processing is complete and the accessibility score of the page tested.

---

# More Information

For more information on google lighthouse scripting, go here

- Programmatic usage (scripting): https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically
- Lighthouse configuration: https://github.com/GoogleChrome/lighthouse/blob/HEAD/docs/

---

03/02/2021 | 05:05p
