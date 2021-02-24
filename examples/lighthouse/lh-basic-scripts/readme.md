# lighthouse basic examples: Scripting

---

Go to the [GitHub Playbook-Automation published page](https://section508coordinators.github.io/Dev-Automation/)

---

## lighthouse: programmatic usage

The scripts (JavaScript) in this project are meant to provide relatively simple examples, on which you can build, of how to use the pa11y  accessibility engine for accessibility testing using various configurations and rulesets - to include Deque's axe-core and SQIZ Lab's HTML CodeSniffer.  

## Automated tools and rulesets

#### Ruleset assessments and recommended rules

This tool allows the user to pick and choose the individual, underlying rules for testing. Not all automated tool rulesets on the market perfectly align with the pass/fail success criteria as expressed by the DHS standard. However upon analysis, DHS OAST has identified specific rules, for specific vendor accessibility ruleset libraries, that provide value in identifying accessibility to the DHS Standard.

Those analyses of vendor accessibility rulesets and the OAST ruleset recommendations reside in [rulesets folder](/rulesets) on this site.

---

## Technology requirements

These examples use the following technology stack:

- Chrome
- Nodejs 12+
- Git (Bash window)
- google lighthouse

## Setup

Perform the following steps to setup your environment to run the examples

2. Install Chrome desktop
2. Install Git 
2. Install Node
2. Install lighthouse: `npm install -g lighthouse`
2. Reboot

---

## Usage/Syntax

In a Git Bash window, run: `node <script_name>`

---

### Example scripts

- [The scripts in this section are in the process of being updated.  Check back later for updated content.]

---

# More Information

For more information on google lighthouse scripting, go here

- Programmatic usage (scripting): https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically
- Lighthouse configuration: https://github.com/GoogleChrome/lighthouse/blob/HEAD/docs/

---

02/24/2021 | 08:28a
