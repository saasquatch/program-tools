import { storiesOf } from "@storybook/react";
import React from "react";
import { GenericInput, StyledSelect } from "../Inputs";

storiesOf("Components / Input", module).add("Text Input", () => {
    return (
      <div style={{ margin: "100px" }}>
        <GenericInput minWidth={"200px"} maxWidth={"400px"} type="text" />
      </div>
    );
  });

storiesOf("Components / Input", module).add("Select Input", () => {
    return (
      <div style={{ margin: "100px" }}>
        <StyledSelect minWidth={"200px"} maxWidth={"400px"}>
            <option>opt1</option>
            <option>opt2</option>
            <option>opt3</option>
            <option>really-long-opt4</option>
        </StyledSelect>
      </div>
    );
  });