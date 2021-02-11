# Automated tools and rulesets

<hr>

Go to the [GitHub Playbook-Automation published page](https://section508coordinators.github.io/Dev-Automation/)

<hr>

## Rulesets (pass/fail criteria)

Not all accessibility standards can be tested using automation alone. For criteria that can be tested through automation, third party rules (pass/fail criteria) are not always in full alignment with the DHS Trusted Tester pass/fail criteria. To help teams integrate test automation and implement it in a way that uses rules that align as closely as possible to Trusted Tester criteria, OAST has reviewed the rulesets for the ***axe-core*** and ***HTML Code Sniffer*** accessibility libraries and made recommendations for which of those rules should be used for testing. 

Note that in applying rules within some test tools, the developer/tester can identify which rule names to use from a given ruleset.  In other cases, the developer/tester indicates the desired rules in a bit of a reverse procedure where then citing the ruleset to use and then identifying the rules to be ignored from that ruleset and thereby testing against the desired rules.  Because of this, below we have identified the preferred rules for the accessibility libraries, as well as the list of rules to be ignored for each.

Note that assessment of these rules is an ongoing activity at OAST. Below are the most recent assessments as of April 15 2020.

<hr>

### axe-core (version 3.5)

#### Rules to use in testing

[In process]

#### Rules to avoid (ignore) in testing

When using the pa11y engine tools, the developer/tester indicates the desired rules for testing by configuring the test engine to cite the test library  to use (i.e.., axe or HTMLCS) and then citing the the ***rules to ignore*** from the ruleset when testing.  Below is the list of rules to ignore when configuring tests using the pa11y engine in order to use Trusted Tester friendly rules:

| Rule name                           | Rule version |
| ----------------------------------- | ------------ |
| accesskeys                          | 3.5          |
| area-alt                            | 3.5          |
| aria-allowed-role                   | 3.5          |
| aria-hidden-body                    | 3.5          |
| aria-required-attr                  | 3.5          |
| aria-required-children              | 3.5          |
| aria-required-parent                | 3.5          |
| aria-roledescription                | 3.5          |
| aria-roles                          | 3.5          |
| aria-valid-attr                     | 3.5          |
| aria-valid-attr-value               | 3.5          |
| autocomplete-valid                  | 3.5          |
| avoid-inline-spacing                | 3.5          |
| blink                               | 3.5          |
| bypass                              | 3.5          |
| css-orientation-lock                | 3.5          |
| definition-list                     | 3.5          |
| dlitem                              | 3.5          |
| duplicate-id-active                 | 3.5          |
| duplicate-id-aria                   | 3.5          |
| focus-order-semantics               | 3.5          |
| frame-tested                        | 3.5          |
| heading-order                       | 3.5          |
| hidden-content                      | 3.5          |
| html-xml-lang-mismatch              | 3.5          |
| identical-links-same-purpose        | 3.5          |
| img-redundant-alt                   | 3.5          |
| label-content-name-mismatch         | 3.5          |
| label-title-only                    | 3.5          |
| landmark-banner-is-top-level        | 3.5          |
| landmark-complementary-is-top-level | 3.5          |
| landmark-contentinfo-is-top-level   | 3.5          |
| landmark-main-is-top-level          | 3.5          |
| landmark-no-duplicate-banner        | 3.5          |
| landmark-no-duplicate-contentinfo   | 3.5          |
| landmark-no-duplicate-main          | 3.5          |
| landmark-one-main                   | 3.5          |
| landmark-unique                     | 3.5          |
| link-in-text-block                  | 3.5          |
| marquee                             | 3.5          |
| meta-refresh                        | 3.5          |
| meta-viewport                       | 3.5          |
| meta-viewport-large                 | 3.5          |
| no-autoplay-audio                   | 3.5          |
| object-alt                          | 3.5          |
| page-has-heading-one                | 3.5          |
| p-as-heading                        | 3.5          |
| region                              | 3.5          |
| server-side-image-map               | 3.5          |
| skip-link                           | 3.5          |
| svg-img-alt                         | 3.5          |
| tabindex                            | 3.5          |
| table-duplicate-name                | 3.5          |
| table-fake-caption                  | 3.5          |
| td-has-header                       | 3.5          |
| th-has-data-cells                   | 3.5          |
| **Total: 56**                       |              |

​	

<hr>

### HTML Code Sniffer (HTMLCS) version 2.5.1

#### Rules to use in testing

[In process]

#### Rules to avoid (ignore) in testing

| Rule name                                                 | Rule version |
| --------------------------------------------------------- | ------------ |
| WCAG2AA.Principle1.Guideline1_3.1_3_1.H49.Center          | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_3.1_3_1.H49.AlignAttr       | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_1.1_1_1.H30.2               | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_3.1_3_1.H44.NotFormControl  | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_3.1_3_1.H71.3               | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_3.1_3_1.H71.2               | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_3.1_3_1.H43.HeadersRequired | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_1.1_1_1.H30.2               | 2.5.1        |
| WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.3.XmlLang       | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_3.1_3_1.H43.HeadersRequired | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_1.1_1_1.H36                 | 2.5.1        |
| WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.Fieldset.Name   | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_1.1_1_1.H67.1               | 2.5.1        |
| WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputImage.Name | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_1.1_1_1.H2.EG5              | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_1.1_1_1.H2.EG4              | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_1.1_1_1.H53ARIA6            | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_1.1_1_1.H37                 | 2.5.1        |
| WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.NoContent     | 2.5.1        |
| WCAG2AA.Principle2.Guideline2_4.2_4_1.G1G123G124.NoSuchID | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_3.1_3_1.H42.2               | 2.5.1        |
| WCAG2AA.Principle2.Guideline2_4.2_4_1.H64.1               | 2.5.1        |



<hr>

02/11/2021 | 11:47:a

