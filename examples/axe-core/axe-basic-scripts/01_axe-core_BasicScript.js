/*
Axe-core library: Basic Script Example
Uses selenium-webdirver and axe-webdriverjs
Syntax: node 01_axe-core_BasicScript.js
Results: This script tests a page with axe-core and cites failures.
*/

var AxeBuilder = require('axe-webdriverjs');
var WebDriver = require('selenium-webdriver');
 
var driver = new WebDriver.Builder()
  .forBrowser('firefox')
  .build();
 
driver
/*  .get('https://dequeuniversity.com/demo/mars/')  */
  .get('https://section508coordinators.github.io/BaselineTestPages2/test-cases/TC1005C001.html')

  .then(function() {
    AxeBuilder(driver).analyze(function(err, results) {
      if (err) {
        // Handle error somehow
      }
      
      console.log(" ")
      console.log("There are " + results.violations.length + " failures on this page.");
  	  console.log("Violation 1: " + results.violations[0].help);
      console.log("Violation 2: " + results.violations[1].help);
 	    console.log("Violation 3: " + results.violations[2].help);
      console.log("Violation 4: " + results.violations[3].help);



      console.log("     help: " + results.violations[0].help);
      console.log("     Description: " + results.violations[0].description);
      console.log("     helpUrl: " + results.violations[0].helpUrl);
      console.log("     id: " + results.violations[0].id);
      console.log("Length of Nodes: " + results.violations[0].nodes.length);
      console.log("     html: " + results.violations[0].nodes[0].html);
      console.log("     target: " + results.violations[0].nodes[0].target);

    });

  });

