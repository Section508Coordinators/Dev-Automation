
//Updated: 02/24/2021
//Author: Alan King
//Technology: Google Lighthouse Accessibility Scripting
//How to Execute: Type "node 01_lighthouse_BasicScript.js" from Git Bash Command window
//                syntax: node <script_name>
//---------------------------------------------------------------------------------------------------
//
// This test script is customized to work as follows. This script will:
//
// - Runs only the audit (test) for 'accessibility' against one URL and 
//   preferred audits (rules)
//
// - Writes an HTML report to your local machine file system.
//
// - Writes message to the console indicating the processing is complete 
//   and the accessibility score of the page tested.
//
//===================================================================================================
//

const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

//var url = 'https://section508coordinators.github.io/BaselineTestPages2/test-cases/TC1005C001.html';
var url = 'http://www.ibm.com';
var rptName='02-Rpt-lighthouse-BasicScript.html';

(async () => {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {
  	logLevel: 'error', 
  	output: 'html', 
  	onlyCategories: ['accessibility'], 
  	skipAudits: [
  		'aria-required-parent',
  		'heading-order',
  		'link-name'
  		], 
  	port: chrome.port};
  const runnerResult = await lighthouse(url, options);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  fs.writeFileSync(rptName, reportHtml);
  console.log('Report ' + rptName + ' is done for', runnerResult.lhr.finalUrl);
  console.log('The Accessibility score was', runnerResult.lhr.categories.accessibility.score * 100);


  await chrome.kill();
})();