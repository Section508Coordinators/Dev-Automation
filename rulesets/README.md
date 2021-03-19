# Automated tools and rulesets

<hr>

Go to the [GitHub Playbook-Automation published page](https://section508coordinators.github.io/Dev-Automation/)

<hr>

## Rulesets (pass/fail criteria)


Some of the more powerful automated tools presented on this GitHub resource allow the user to pick and choose the individual, underlying rules used for testing. When automated tools have this feature, the user can exercise much more control over the quality and relevance of test results.

Not all accessibility standards can be tested using automated rules alone. For criteria that *can* be tested through automation, third party rules (pass/fail criteria) are not always in full alignment with the DHS Trusted Tester pass/fail criteria. To help teams integrate test automation and implement it in a way that uses rules that align as closely as possible to Trusted Tester success criteria, OAST has reviewed the rulesets below for the ***axe-core*** and ***HTML Code Sniffer*** accessibility libraries and made recommendations for which of those rules more closely align to the Trusted Tester methodology.

### Choosing *Trusted Tester-friendly* automated rules

When using automated tools, there will likely always be some instances where the automated tool will present a test result that you will not consider as *actionable* for one reason or another.  Whether or not a result is actionable is usually dependent on the accessibility standard your organization uses as its target accessibility criteria. In the case of DHS, this target accessibility standard is the [Section 508 ICT Testing Baseline version 3](https://section508coordinators.github.io/ICTTestingBaseline/) and the [Trusted Tester Section 508 Conformance Test Process for Web version 5](https://section508coordinators.github.io/TrustedTester/) methodology from which it is derived. Therefore the information on this page will assume Trusted Tester as the organization's target accessibility criteria. 

Test results that are not actionable are also referred to as "noise" in test results. Noise usually comes from one or more of three sources:

1. **False positives**: These are instances where the tool indicates an accessibility failure where, according to your target criteria, none should be cited.
2. **False negatives**:  These are instances where the tool indicates there is no accessibility failure where, according to your target criteria, there should be one cited.
3. **Out of scope:** These are instances where the tool tests for criteria that are not tested by your organization's target accessibility criteria. 

### When *Out of Scope* provides value

Organizations may want to maximize efficiency and noise reduction when using automated rules and only include rules that specifically align with their target criteria. However there may be instances where a rule is out of scope for the target criteria (Trusted Tester), but provides some other positive, actionable value such as identifying bad coding practices. In these cases, it may be advantageous to include these rules as well. 

Note that assessment of automated rulesets is an ongoing activity. Below are OAST's most recent assessments of the axe-core and HTML Code sniffer rules as of April 15 2020.

<hr>

### axe-core (version 3.5)

#### Rules to use in testing

| Rule  Name                  | Rule version |
| --------------------------- | ------------ |
| aria-allowed-role           | 3.5          |
| aria-hidden-focus           | 3.5          |
| aria-input-field-name       | 3.5          |
| aria-toggle-field-name      | 3.5          |
| button-name                 | 3.5          |
| color-contrast              | 3.5          |
| document-title              | 3.5          |
| duplicate-id                | 3.5          |
| empty-heading               | 3.5          |
| form-field-multiple-labels  | 3.5          |
| frame-title                 | 3.5          |
| frame-title-unique          | 3.5          |
| html-has-lang               | 3.5          |
| html-lang-valid             | 3.5          |
| image-alt                   | 3.5          |
| input-button-name           | 3.5          |
| input-image-alt             | 3.5          |
| label                       | 3.5          |
| link-name                   | 3.5          |
| list                        | 3.5          |
| listitem                    | 3.5          |
| role-img-alt                | 3.5          |
| scope-attr-valid            | 3.5          |
| scrollable-region-focusable | 3.5          |
| td-headers-attr             | 3.5          |
| valid-lang                  | 3.5          |

#### Rules to avoid in testing

When using the pa11y engine tools, the developer/tester indicates the desired rules for testing by configuring the test engine to cite the test library  to use (i.e. , axe or HTMLCS) and then citing the the ***rules to ignore*** from the ruleset when testing.  Below is the list of rules to ignore when configuring tests using the pa11y engine in order to use Trusted Tester friendly rules:

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

| Rule name                                                    | Rule version |
| ------------------------------------------------------------ | ------------ |
| WCAG2AA.Principle1.Guideline1_4.1_4_3.G18                    | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_4.1_4_3.G145                   | 2.5.1        |
| WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputText.Name     | 2.5.1        |
| WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputFile.Name     | 2.5.1        |
| WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputPassword.Name | 2.5.1        |
| WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputCheckbox.Name | 2.5.1        |
| WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputRadio.Name    | 2.5.1        |
| WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.Select.Name        | 2.5.1        |
| WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.Textarea.Name      | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_3.1_3_1.F68                    | 2.5.1        |
| WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.1.NoTitleEl        | 2.5.1        |
| WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.1.EmptyTitle       | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_3.1_3_1.H43.IncorrectAttr      | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_3.1_3_1.H43.MissingHeaderIds   | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_3.1_3_1.H43.MissingHeadersAttrs | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_3.1_3_1.H43,H63                | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_3.1_3_1.H43.HeadersRequired    | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_3.1_3_1.H39.3.LayoutTable      | 2.5.1        |
| WCAG2AA.Principle1.Guideline1_3.1_3_1.H42.2                  | 2.5.1        |
| WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.NoContent        | 2.5.1        |
| WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.EmptyNoId        | 2.5.1        |
| WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.Button.Name        | 2.5.1        |
| WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.Li.Name            | 2.5.1        |
| WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputButton.Name   | 2.5.1        |
| WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputImage.Name    | 2.5.1        |
| WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.3.Lang             | 2.5.1        |
| WCAG2AA.Principle3.Guideline3_1.3_1_2.H58.1.Lang             | 2.5.1        |
| WCAG2AA.Principle2.Guideline2_4.2_4_1.H64.1                  | 2.5.1        |
| WCAG2AA.Principle4.Guideline4_1.4_1_1.F77                    | 2.5.1        |



#### Rules to avoid in testing

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


<hr>

02/15/2021 | 03:17:p

