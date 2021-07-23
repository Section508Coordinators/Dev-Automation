/*
=============================================================================
Axe-core library: Basic Script Example
Tech Stack: Selenium-webdirver and @axe-core/webdriverjs
Syntax: node <script name>.js
API Reference: https://github.com/dequelabs/axe-core/blob/master/doc/API.md
Results: This script tests a page using Trusted Tester v5 friendly
         axe-core rules and cites failures. It is meant to be an
         example of using the axe-core API to customize accessibility
         testing and results.
        
-----------------------------------------------------------------------------

[1] - UPDATED: 07/22/2021
      This script was updated to replace the deprecated 'axe-webdriverjs'
      dependency with the newer @axe-core/webdriverjs' dependency. This
      depency update required several coding syntax changes.
=============================================================================
*/

//Set variables used to access the axe-core accessibility library:
let AxeBuilder = require('@axe-core/webdriverjs');
let WebDriver = require('selenium-webdriver');

//Set URL for testing:
let uRL = 'https://section508coordinators.github.io/BaselineTestPages2/test-cases/TC1005C001.html';
//let uRL = 'http://coc.kciprojects.com/ooc2/TC1005C008.html'

//Create driver, to include browser to test with:
const driver = new WebDriver.Builder().forBrowser('chrome').build();
//const driver = new WebDriver.Builder().forBrowser('firefox').build();

//Specify TTv5-friendly rules for testing:
//const suppressRules = ["region", "landmark-one-main"];
const ttv5FriendlyRules = ["label", "valid-lang", "landmark-one-main"];

//Analyze page:
driver.get(uRL).then(() => {
  new AxeBuilder(driver)
    .withRules(ttv5FriendlyRules)  
    .analyze((err, results) => {
    if (err) {
      // Handle error somehow
    }
      let v = results.violations.length;
      let vn = 0;
      let x = -1;

      //Output SUMMARY results of failures found to console:
      console.log("Script Config: Test using TTv5 friendly rules only.")
      console.log("See custom axe-core script output to command window below...")
      console.log(" ")
      console.log("SUMMARY: There are " + v + " failures on page - " + uRL +":");
      console.log(" ")      
      do {
        x++; vn++;
        console.log("     Violation " + vn + ": " + results.violations[x].help + " (rule:" + results.violations[x].id +")");
      } while (x<(v-1));

      //Output DETAIL of each failure found:

      console.log(" ")
      console.log("DETAIL: --------------------------------------------------------------------")      
      console.log(" ")

      vn = 0; x=-1;
      let n = -1;
      let lon = 0;
      let vlon= -1;
      do {
        x++; vn++;

        console.log("Violation "+vn+": " + results.violations[x].help);
        console.log("     Description: " + results.violations[x].description);
        console.log("     helpUrl: " + results.violations[x].helpUrl);
        console.log("     id (rule): " + results.violations[x].id);
        console.log(" ");

        lon = results.violations[x].nodes.length;

        // Present each occurrence of this failure:
        console.log("     Number of instances: " + lon);
          do {
            vlon++;
            console.log("     ----------------- INSTANCE "+ (vlon+1) + " -----------------")            
            console.log("          html: " + results.violations[x].nodes[vlon].html);
            console.log("          target: " + results.violations[x].nodes[vlon].target);
            console.log(" ")
          } while (vlon<(lon-1));
          vlon=-1;

      } while (x<(v-1));

      // **** END REPORT ****
      console.log("*** END OF REPORT ***");
      console.log(" ");

      //Conditionally print entire results object to console:
//    console.log(results)
    });
  });