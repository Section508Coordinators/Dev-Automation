import { TableComponent } from './../components/table.component';
import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "@testing-library/angular";

import  *  as  rulesConfig  from  '../axeConfig/axe-config.json';

expect.extend(toHaveNoViolations);

describe("Table component", () => {
  it("should be accessible", async () => {
    const { container } = await render(TableComponent);

    const results = await axe(container, {
      rules: rulesConfig.rules
    })
  
    expect(results).toHaveNoViolations();
  });
});
