import { storiesOf } from "@storybook/react";
import React from "react";
import JSONataEditor from "../MapFieldsJsonata";

storiesOf("UI Schema Widgets / JSONata Editor Prefilled Fields", module).add(
  "Empty",
  () => {
    const props = {
      options:{
        defaultValue: `{"":""}`,
      },
      formContext: {
        formData: {
          schema: "",
        },
      },
      value: `{"":""}`,
      onChange: () => {
        console.log("change");
      },
    };
    return (
      <div style={{ margin: "100px" }}>
        <JSONataEditor {...props} />
      </div>
    );
  }
);

storiesOf("UI Schema Widgets / JSONata Editor Prefilled Fields", module).add(
  "Single Rule",
  () => {
    const props = {
      options:{
        defaultValue: `{"":""}`,
      },
      formContext: {
        formData: {
          schema: "",
        },
      },
      value: `{"email":"text"}`,
      onChange: () => {
        console.log("change");
      },
    };
    return (
      <div style={{ margin: "100px" }}>
        <JSONataEditor {...props} />
      </div>
    );
  }
);

storiesOf(
  "UI Schema Widgets / JSONata Editor Prefilled Fields",
  module
).add("Variables", () => {
  const props = {
    options:{
      defaultValue: `{"":""}`,
    },
    formContext: {
      formData: {
        schema: "",
      },
    },
    value: `{
        select:select
      }`,
    onChange: () => {
      console.log("change");
    },
  };
  return (
    <div style={{ margin: "100px" }}>
      <JSONataEditor {...props} />
    </div>
  );
});


storiesOf(
  "UI Schema Widgets / JSONata Editor Prefilled Fields",
  module
).add("Array", () => {
  const props = {
    options:{
      defaultValue: `{"":""}`,
    },
    formContext: {
      formData: {
        schema: "",
      },
    },
    value: `[""]`,
    onChange: () => {
      console.log("change");
    },
  };
  return (
    <div style={{ margin: "100px" }}>
      <JSONataEditor {...props} />
    </div>
  );
});
