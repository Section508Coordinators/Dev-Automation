# Automated tools and rulesets

<hr>

Go to the [GitHub Playbook-Automation published page](https://section508coordinators.github.io/Dev-Automation/)

<hr>

## Rulesets (pass/fail criteria)

Not all accessibility standards can be tested using automated rules alone. For criteria that *can* be tested through automation, third party rules (pass/fail criteria) are not always in full alignment with the DHS Trusted Tester pass/fail criteria. To help teams integrate test automation and implement it in a way that uses rules that align as closely as possible to Trusted Tester criteria, OAST has reviewed the rulesets for the ***axe-core*** and ***HTML Code Sniffer*** accessibility libraries and made recommendations for which of those rules more closely align.

When applying selected rules within some test tools presented on this site, the developer/tester can take the straightforward approach of configuring the tool to use only the desired rules - which can be identified by their rule name.  In other cases, the developer/tester must take a different approach. Instead of identifying the rule name they want to use in testing, they must cite the ruleset library and then list the rules they want to exclude from testing, where the balance of the rules in the ruleset will then be used as the desired rules when testing.  For your convenience, the rules listed below are arranged in two different formats of "Rules to use in testing" and "Rules to avoid in Trusted Tester testing".

Also note that assessment of rulesets is an ongoing activity. Below are the most recent assessments of the axe-core and HTML Code sniffer rules as of April 15 2020.

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

#### Rules to avoid in Trusted Tester testing

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
| WCAG2AA.Principle1.Guideline1_3.1_3_1.H42.2               | 2.5.1        |
| WCAG2AA.Principle2.Guideline2_4.2_4_1.H64.1               | 2.5.1        |



<hr>

02/15/2021 | 01:45:p
