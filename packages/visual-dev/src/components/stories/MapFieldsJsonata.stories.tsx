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
).add("Custom headings", () => {
  const props = {
    options:{
      defaultValue: `{"":""}`,
      keyTitle: "Custom key",
      valueTitle: "Custom value",
    },
    formContext: {
      formData: {
        schema: "",
      },
    },
    value: `{
        "":""
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
).add("Custom headings and buttons", () => {
  const props = {
    options:{
      defaultValue: `{"":""}`,
      keyTitle: "Custom key",
      valueTitle: "Custom value",
      addButtonText: "Add Button",
      addButtonTextEmpty: "Add Button Empty State",
    },
    formContext: {
      formData: {
        schema: "",
      },
    },
    value: `{
        "":""
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
).add("Custom headings and buttons (Empty)", () => {
  const props = {
    options:{
      defaultValue: `{"":""}`,
      keyTitle: "Custom key",
      valueTitle: "Custom value",
      addButtonText: "Add Button",
      addButtonTextEmpty: "Add Button Empty State",
    },
    formContext: {
      formData: {
        schema: "",
      },
    },
    value: ``,
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

storiesOf(
  "UI Schema Widgets / JSONata Editor Prefilled Fields",
  module
).add("Single Row Array", () => {
  const props = {
    options:{
      defaultValue: `[""]`,
      singleRowArray: true,
      initialValue: `[""]`,
    },
    formContext: {
      formData: {
        schema: "",
      },
    },
    value: "",
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
