import { InputTwoComponent } from './../components/input-two.component';
import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "@testing-library/angular";

import  *  as  rulesConfig  from  '../axeConfig/axe-config.json';

expect.extend(toHaveNoViolations);

describe("InputTwo component", () => {
  it("should be accessible", async () => {
    const { container } = await render(InputTwoComponent);

    const results = await axe(container, {
      rules: rulesConfig.rules
    })
  
    expect(results).toHaveNoViolations();
  });
});
