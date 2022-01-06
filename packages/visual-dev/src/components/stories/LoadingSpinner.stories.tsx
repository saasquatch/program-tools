import { storiesOf } from "@storybook/react";
import React from "react";
import {LoadingSpinner, LoadingSpinnerLarge} from "../LoadingSpinner";


storiesOf("Archived / Loading Spinner", module).add("Normal", () => {
  return (
    <div style={{ margin: "100px" }}>
      <LoadingSpinner />
    </div>
  );
});

storiesOf("Archived / Loading Spinner", module).add("Normal with props", () => {
  return (
    <div style={{ margin: "100px" }}>
      <LoadingSpinner left={"50px"} paddingRight={"10px"} right={"10px"} bottom={"5px"} color={"blue"} />
    </div>
  );
});

storiesOf("Archived / Loading Spinner", module).add("Large", () => {
  return (
    <div style={{ margin: "100px" }}>
      <LoadingSpinnerLarge />
    </div>
  );
});
