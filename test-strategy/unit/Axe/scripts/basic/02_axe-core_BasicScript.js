/*
Axe-core library: Basic Script Example
Uses selenium-webdirver and axe-webdriverjs
Syntax: node 02_axe-core_BasicScript.js
Results: This script tests a page with axe-core and cites failures.
*/


var AxeBuilder = require('axe-webdriverjs');
var WebDriver = require('selenium-webdriver');
var pg = "https://section508coordinators.github.io/BaselineTestPages2/test-cases/TC1005C001.html";
 
var driver = new WebDriver.Builder()
  .forBrowser('chrome')
  .build();
 
driver
  .get(pg)
  .then(function() {
    AxeBuilder(driver).analyze(function(err, results) {
      if (err) {
        // Handle error somehow
      }
      
      console.log(" ");
      console.log("Testing: " + pg);
      console.log(" ");
      console.log(" ");
      console.log("There are " + results.violations.length + " failures on this page.");
      console.log(' ');

//Loop through Summary of Issues:
var i;
console.log('Issue Summary:');
for (i = 0; i < results.violations.length; i++) {   
  console.log('    Violation '+ (i+1)+": "+results.violations[i].help);
}
console.log(' ')

//Loop through Detail of Issues:

console.log('Issue Detail:');
for (i = 0; i < results.violations.length; i++) {   
      console.log('  Violation '+ (i+1)+": "+results.violations[i].help);
      console.log("     id: " + results.violations[i].id);
      console.log("     help: " + results.violations[i].help);
      console.log("     Description: " + results.violations[i].description);
      console.log("     helpUrl: " + results.violations[i].helpUrl);   
      console.log("  # of Nodes: " + results.violations[i].nodes.length);
        // Loop through Nodes
        var t;
        t=results.violations[i].nodes.length;

        for (t = 0; t < results.violations[i].nodes.length; t++) {
          console.log("    Node "+(t+1));
          console.log("      html: " + results.violations[i].nodes[t].html);
          console.log("      target: " + results.violations[i].nodes[t].target);
        }
      
      console.log(' ');
      console.log('------------------------------------');
      console.log(' '); 
}



/*

 	  console.log("Violation 1: " + results.violations[0].help);
      console.log("Violation 2: " + results.violations[1].help);
 	  console.log("Violation 3: " + results.violations[2].help);
      console.log("Violation 4: " + results.violations[3].help);

  console.log(' ');
  console.log('------------------------------------');
  console.log(' '); 




      console.log("     help: " + results.violations[0].help);
      console.log("     Description: " + results.violations[0].description);
      console.log("     helpUrl: " + results.violations[0].helpUrl);
      console.log("     id: " + results.violations[0].id);
      console.log("Length of Nodes: " + results.violations[0].nodes.length);
      console.log("     html: " + results.violations[0].nodes[0].html);
      console.log("     target: " + results.violations[0].nodes[0].target);





     /* console.log(results);*/
    });

  });

