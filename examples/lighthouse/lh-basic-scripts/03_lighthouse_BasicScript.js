
//Updated: 02/02/2021
//Author: Alan King
//Technology: Google Lighthouse Accessibility Scripting
//How to Execute: Type "03_lighthouse_BasicScript.js" from Git Bash Command window
//                syntax: node <script_name>
//---------------------------------------------------------------------------------------------------
//
// This test script is customized to work as follows. This script will:
//
//    [1] Runs only the audit (test) for 'accessibility' against a single URL 
//
//    [2] Only tests against preferred audits (rules) favorable to TTv5

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
      const rptName="lhReport_ex03.html";
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
  onlyAudits: [
  'aria-allowed-role',
  'aria-hidden-focus',
  'aria-input-field-name',
  'aria-toggle-field-name',
  'button-name',
  'color-contrast',
  'document-title',
  'duplicate-id',
  'empty-heading',
  'form-field-multiple-labels',
  'frame-title',
  'frame-title-unique',
  'html-has-lang',
  'html-lang-valid',
  'image-alt',
  'input-button-name',
  'input-image-alt',
  'label',
  'link-name',
  'list',
  'listitem',
  'role-img-alt',
  'scope-attr-valid',
  'scrollable-region-focusable',
  'td-headers-attr',
  'valid-lang'
  ],

  output: ['html']
};

// Usage:
launchChromeAndRunLighthouse('https://section508coordinators.github.io/BaselineTestPages2/test-cases/TC1112A001.html', opts).then(results => {
  // Use results!
});