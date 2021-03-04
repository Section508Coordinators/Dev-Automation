# Section 508/Accessibility Test Automation

---

Go to the [GitHub Playbook-Automation published page](https://section508coordinators.github.io/Dev-Automation/)

---

## Overview
This repository presents explanations and fully functioning code examples of several semi and fully automated open source accessibility test tools. These tools fall into multiple technical and strategic categories of use for assessing ICT for Section 508/accessibility conformance in the Software Engineering Life Cycle.

The purpose of this resource is to provide additional support and fully-functioning examples to DHS components who wish to strategically integrate accessibility test automation, and other DevOps principles, into their software engineering life cycle.

## Complexity level and testing strategy

With *complexity* defined as level of knowledge required for use, installation logistics involved, and level of test results feedback presented to the user, the tools presented in this repository present a wide range of complexity from the relatively simple to the highly complex. Specifically, the tools range from browser plug-ins, to command line interface (CLI) tools, to API information for full scripting, as well as a few examples that OAST developed that displays how some of these accessibility open source tools can be extended to provide greater functionality.

Regarding testing strategy, the tools presented on this resource are suitable for integrating accessibility into developer unit testing, accessibility integration testing, or Q.A./regression testing for accessibility – depending on the tool and method of integration.

Given the range of complexity of tools and range of testing approach possible, the technical team can select the type of tool and strategy for integration that works best for them.

## Automated tools and rulesets

Some of the more powerful automated tools presented on this GitHub resource allow the user to pick and choose the individual, underlying rules used for testing. When automated tools have this feature, the user can exercise much more control over the quality and relevance of test results. Review the page [Automated tools and rulesets](/rulesets) for automated rules reviewed and recommended by OAST as being closer in alignment with Trusted Tester methodology.

## Using the examples

To take advantage of examples, we recommend you fork the Dev-Automation repository and then focus on the example(s) of interest via the local copy of the repository you created via the fork.

### Prerequisites for using the automation examples

The examples presented in this resource assumes knowledge and experience with GitHub and knowledge of any testing frameworks into which you want to integrate any of the accessibility test libraries presented in this resource.

## Test automation examples

The following links point to examples for various test engines and examples on the ***GitHub site***. To navigate the ***Bitbucket mirror site***, use the navigational links located [HERE](https://maestro.dhs.gov/stash/projects/APPDEV/repos/dev-automation/browse/bb_nav.md).

### Automated Accessibility Testing Tools

  * ***Axe core***
    * Basic examples
        1. [Browser extensions](/examples/axe-core/axe-basic-browser-ext)
        2. [Command line interface (CLI)](/examples/axe-core/axe-basic-cli)
        3. [Scripting](/examples/axe-core/axe-basic-scripts)
    * Advanced examples
        1. [Axe-core custom project 1](/examples/axe-core/axe-advanced-project1)

  * ***Pa11y test engine***
    * Basic examples
        1. [Windows UI](/examples/pa11y/pa11y-basic-win-ui)
        2. [Browser extensions](/examples/pa11y/pa11y-basic-browser-ext)
        3. [Command line interface (CLI)](/examples/pa11y/pa11y-basic-cli)
        4. [Scripting](/examples/pa11y/pa11y-basic-scripts)
    * Advanced examples
        1. [Pa11y custom project 1](/examples/pa11y/pa11y-advanced-project1)
    
  * ***Google Lighthouse test engine***
    * Basic examples
        1. [Browser extensions](/examples/lighthouse/lh-basic-browser-ext)
        2. [Command line interface (CLI)](/examples/lighthouse/lh-basic-cli)
        3. [Scripting](/examples/lighthouse/lh-basic-scripts)
    * Advanced examples
        1. [Lighthouse custom project 1](/examples/lighthouse/lh-advanced-project1)
        
---

03/04/2021 | 03:25p


