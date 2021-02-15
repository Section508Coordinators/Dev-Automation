# axe-core basic examples: Scripting

<hr>

Go to the [GitHub Playbook-Automation published page](https://section508coordinators.github.io/Dev-Automation/)

<hr>

## Tool: axe-core library: Scripting w/Selenium WebDriver

The scripts (JavaScript) in this project are meant to provide relatively simple examples, on which you can build, of how to use the axe-core accessibility engine for accessibility testing using Selenium WebDriver as well as both the Chrome and Firefox browser engines.  

<hr>

## Automated tools and rulesets

#### Ruleset assessments and recommended rules

This tool allows the user to pick and choose the individual, underlying rules for testing. Not all automated tool rulesets on the market perfectly align with the pass/fail success criteria as expressed by the DHS standard. However upon analysis, DHS OAST has identified specific rules, for specific vendor accessibility ruleset libraries, that provide value in identifying accessibility to the DHS Standard.

Those analyses of vendor accessibility rulesets and the OAST ruleset recommendations reside in the following folder on this site: https://github.com/Section508Coordinators/Dev-Automation/tree/master/rulesets.

<hr>

## Technology requirements

These examples use the following technology stack:

- Nodejs 6+
- Git (Bash window is fine)
- Chrome browser version 59+
- Chrome WebDriver (use your version of Chrome)
- Firefox browser
- Firefox (Gecko) WebDriver
- Selenium WebDriver
- axe-WebDriverJs
- JavaScript

## Setup

Perform the following steps to setup your environment to run the examples:

1. Install Nodejs 6+
2. Install Git 
3. Install Selenium Webdriver: `npm install selenium-webdriver --no-save`
4. Install axe-core webdriverjs and its dependencies: `npm install @axe-core/webdriverjs`
5. Running the examples, as is, will require you to have the Firefox and Chrome browsers installed on the machine. Also, you will need to install the corresponding WebDrivers as follows:
   1. **Chrome**
      1. Requires Chrome browser version 59+
      2. Install the Chromedriver version that corresponds to your Chrome browser version and ensure its file system location is in your Windows PATH statement
   2. **Firefox**
      1. Requires any relatively current Firefox browser
      2. Install Gecko driver and ensure it is in your PATH statement

<hr>

## Usage/Syntax

In a Git Bash window, run: `node <script_name>`

In response, the script 1 will:

1. Invoke a visual instance of Firefox containing a test page. In the case of script 2, a headless Chrome is invoked which will cause a momentary Chrome UI to open and when the test is done, close.
2. When testing is complete for either script, a summary of the axe-core accessibility test results will be written to the command window.

<hr>

### Example scripts

- <u>Script 1</u>: Example of a basic script that calls the *Firefox* browser engine
  - `01_axe-core_BasicScript.js`
- <u>Script 2</u>: Example of a basic script that calls the *Chrome* headless engine
  - `02_axe-core_BasicScript.js`

<hr>

## More Information

See the resources below for more information that may be helpful in further customizing the examples for your organization's use:

#### Axe-core and Selenium WebDriver

More information on axe-core accessibility scripting to the Selenium WebDriverJS can be found at the [Deque GitHub WebDriverJs](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverjs) repository.

#### Axe-core accessibility rules

A full list of axe-core rules (test logic) can be found here: https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md. 

#### Full API reference for developers

More comprehensive guidance on the axe-core engine can be found in the [Axe JavaScript Accessibility API](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md). 

<hr>

01/30/2021 | 09:27p
