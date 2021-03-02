# pa11y basic examples: Scripting

---

Go to the [GitHub Playbook-Automation published page](https://section508coordinators.github.io/Dev-Automation/)

---

## pa11y: Scripting using JavaScript

The scripts (JavaScript) in this project are meant to provide relatively simple examples, on which you can build, of how to use the pa11y  accessibility engine for accessibility testing using various configurations and rulesets - to include Deque's axe-core and SQIZ Lab's HTML CodeSniffer.  

---

## Automated tools and rulesets

#### Ruleset assessments and recommended rules

This tool allows the user to pick and choose the individual, underlying rules for testing. Not all automated tool rulesets on the market perfectly align with the pass/fail success criteria as expressed by the DHS standard. However upon analysis, DHS OAST has identified specific rules, for specific vendor accessibility ruleset libraries, that provide value in identifying accessibility to the DHS Standard.

Those analyses of vendor accessibility rulesets and the OAST ruleset recommendations reside in rulesets folder (/rulesets) on this site.

---

## Technology requirements

These examples use the following technology stack:

- Nodejs 8+
- Git (Bash window)
- [Pa11y 4](https://github.com/pa11y/pa11y/tree/4.x)+

## Setup

Perform the following steps to setup your environment to run the examples

2. Install Git 
2. Install pa11y: `npm install -g pa11y`
2. Reboot

---

### Example scripts


The scripts will present different scenarios based on their internal configurations as follows:

- <u>*Script 1*</u>:`node 01_pa11y_BasicScript.js`: This script will:
  
  - test a server hosted web page
  
  - suppress unwanted testing rules, such as HTML Code Sniffer ***Notices***, as well as any other test rules not considered TTv5 friendly by using the "ignore:" option in the code.
  
  - Will run against the HTML CodeSniffer ruleset only by disabling the "runners:" option. Not specifying a runner causes pa11y to use the HTML CodeSniffer ruleset by default.
  
  - Write test results to the command window
  
- <u>*Script 2*</u>: `node 02_pa11y_BasicScript.js`  This script will:
  
  - Test a server hosted web page
  
  - suppress unwanted testing rules, such as HTML Code Sniffer Notices, as well as any other test rules not considered TTv5 friendly by using the "ignore:" option in the code.
  
  - Will run select rules from both the axe-core and HTML CodeSniffer rulesets via the "runners:" option.
  
  - Write test results to the command window
  
- *<u>Script 3</u>*: `node 03_pa11y_BasicScript.js`  This script will:
  
  - Test an HTML page **located on the local PC file system**. Note that to run this script unmodified, you will need to create a folder on the local drive of the machine running the script of C:\_test\" and in that folder you must copy the file "*TC0813C001.html*" that is in this scripts folder. Otherwise, modify the  variable "vWebSite" in this script to point to where, on the local file system, the *TC0813C001.html* file resides.
  - suppress unwanted testing rules, such as HTML Code Sniffer Notices, as well as any other test rules not considered TTv5 friendly by using the "ignore:" option in the code.
  - Run select rules from the axe-core ruleset only via the "runners:" option.
  - Write test results to the command window

## Usage/Syntax

In a Git Bash window, run: `node <script_name>`

---

# More Information

For more information on pa11y usage and syntax, go here: https://github.com/pa11y/pa11y 

---

03/02/2021 | 05:07p
