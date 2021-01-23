# pa11y basic examples: Scripting

<hr>

Go to the [GitHub Playbook-Automation published page](https://section508coordinators.github.io/Dev-Automation/)

<hr>

## pa11y: Scripting using JavaScript

The scripts (JavaScript) in this project are meant to provide relatively simple examples, on which you can build, of how to use the pa11y  accessibility engine for accessibility testing using various configurations and rulesets - to include Deque's axe-core and SQIZ Lab's HTML CodeSniffer.  

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

<hr>

### Example scripts


The scripts will present different scenarios based on their internal configurations as follows:

- *Script 1*:`01_pa11y_BasicScript.js`: This script will:
  - test a server hosted web page
  - suppress unwanted testing rules, such as HTML Code Sniffer ***Notices***, as well as any other test rules not considered TTv5 friendly by using the "ignore:" option in the code.
  - Will run against the HTML CodeSniffer ruleset only by disabling the "runners:" option. Not specifying a runner causes pa11y to use the HTML CodeSniffer ruleset by default.
- *Script 2*: `02_pa11y_BasicScript.js`  This script will:
  - Test a server hosted web page
  - suppress unwanted testing rules, such as HTML Code Sniffer Notices, as well as any other test rules not considered TTv5 friendly by using the "ignore:" option in the code.
  - Will run select rules from both the axe-core and HTML CodeSniffer rulesets via the "runners:" option.
- - *Script 3*: `03_pa11y_BasicScript.js`  This script will:
    - Test an HTML page located on a local PC file system
    - suppress unwanted testing rules, such as HTML Code Sniffer Notices, as well as any other test rules not considered TTv5 friendly by using the "ignore:" option in the code.
    - run select rules from the axe-core ruleset only via the "runners:" option.

## Usage/Syntax

In a Git Bash window, run: `node <script_name>`

<hr>

# More Information

For more information on pa11y usage and syntax, go here: https://github.com/pa11y/pa11y 

<hr>

01/22/2021 | 09:44p
