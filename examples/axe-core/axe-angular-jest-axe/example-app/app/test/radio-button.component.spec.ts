import { RadioButtonComponent } from './../components/radio-button.component';
import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "@testing-library/angular";

import  *  as  rulesConfig  from  '../axeConfig/axe-config.json';

expect.extend(toHaveNoViolations);

describe("RadioButton component", () => {
  it("should be accessible", async () => {
    const { container } = await render(RadioButtonComponent);

    const results = await axe(container, {
      rules: rulesConfig.rules
    })
  
    expect(results).toHaveNoViolations();
  });
});
