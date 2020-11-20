import { storiesOf } from "@storybook/react";
import React from "react";
import Select from "../Select";

storiesOf("Components / Select", module).add("Empty Selection", () => {
  return (
    <div style={{ margin: "100px" }}>
        <Select
          onChange={() => console.log("New Selection")}
          options={[
            { value: true, label: "Option 1" },
            { value: false, label: "Option 2" },
          ]}
          disabled={false}
          placeholder={"Select value"}
        />
    </div>
  );
});

storiesOf("Components / Select", module).add("Enabled", () => {
  return (
    <div style={{ margin: "100px" }}>
        <Select
          value={"Option 1"}
          onChange={() => console.log("New Selection")}
          options={[
            { value: true, label: "Option 1" },
            { value: false, label: "Option 2" },
          ]}
          disabled={false}
          placeholder={"Select value"}
        />
    </div>
  );
});

storiesOf("Components / Select", module).add("Disabled", () => {
  return (
    <div style={{ margin: "100px" }}>
        <Select
          value={"Option 1"}
          onChange={() => console.log("New Selection")}
          options={[
            { value: true, label: "Option 1" },
            { value: false, label: "Option 2" },
          ]}
          disabled={true}
          placeholder={"Select value"}
        />
    </div>
  );
});