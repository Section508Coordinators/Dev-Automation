
//Updated: 02/02/2021
//Author: Alan King
//Technology: Google Lighthouse Accessibility Scripting
//How to Execute: Type "02_lighthouse_BasicScript.js" from Git Bash Command window
//                syntax: node <script_name>
//---------------------------------------------------------------------------------------------------
//
// This test script is customized to work as follows. This script will:
//
//    [1] Runs only the audit (test) for 'accessibility' against one URL and all audits (rules)
//
//    [2] launches a headless instance of Chrome and sends no results to command window
//
//===================================================================================================
//===================================================================================================

const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
//const log = require('lighthouse-logger');


function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => {

      // Generate an HTML report:
      const rptName="lhReport_ex02.html";
      const reportHtml = results.report;
      fs.writeFileSync(rptName, reportHtml);   
      //Write "processing complete" instead of detailed results
      //return chrome.kill().then(() => console.log(results.report))
      return chrome.kill().then(() => console.log('Report ' + rptName + ' written to file system. Processing complete!'))

    });
  });
}

//Set options here:
const opts = {
  chromeFlags: ['--headless'],
  onlyCategories: ['accessibility'],
  output: ['html']

};

// Usage:
launchChromeAndRunLighthouse('https://section508coordinators.github.io/BaselineTestPages2/test-cases/TC1112A001.html', opts).then(results => {
  // Use results!
});