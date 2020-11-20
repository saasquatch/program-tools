import { storiesOf } from "@storybook/react";
import React from "react";
import LoadingSpinner, {LoadingSpinnerLarge} from "./LoadingSpinner";


storiesOf("Components / Loading Spinner", module).add("Normal", () => {
  return (
    <div style={{ margin: "100px" }}>
      <LoadingSpinner />
    </div>
  );
});

storiesOf("Components / Loading Spinner", module).add("Large", () => {
  return (
    <div style={{ margin: "100px" }}>
      <LoadingSpinnerLarge />
    </div>
  );
});
