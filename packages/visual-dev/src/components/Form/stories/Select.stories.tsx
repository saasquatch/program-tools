import Form from "@rjsf/core";
import { JSONSchema7 } from "json-schema";
import React from "react";
import { Button, RJSFSelect } from "../../..";

export default {
  title: "Components / Form / Select",
  component: Form,
};

const log = (type: any) => console.log.bind(console, type);

export const SelectFormAnyOf = () => {
  const schema: JSONSchema7 = {
    type: "object",
    properties: {
      num: {
        type: "number",
        anyOf: [
          {
            type: "number",
            title: "one",
            enum: [1],
          },
          {
            type: "number",
            title: "two",
            enum: [2],
          },
          {
            type: "number",
            title: "three",
            enum: [3],
          },
        ],
      },
    },
  };

  const uiSchema = {
    num: {
      "ui:widget": RJSFSelect,
    },
  };
  return (
    <div style={{ margin: "100px" }}>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")}
      >
        <Button buttonType="primary" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export const SelectFormOneOf = () => {
  const schema: JSONSchema7 = {
    type: "object",
    properties: {
      num: {
        oneOf: [
          {
            properties: {
              API_Options: {
                enum: ["SaaSquatch Hosted (Recommended)"],
              },
            },
          },
          {
            properties: {
              API_Options: {
                enum: ["Custom TangoCard Account (Advanced)"],
              },
              api_key: {
                type: "string",
                title: "Platform Name",
                // description: "Your TangoCard Platform Name"
              },
              api_secret: {
                type: "string",
                title: "Platform Key",
                // description: "Your TangoCard Platform Key"
              },
            },
          },
        ],
      },
    },
  };

  const uiSchema = {
    num: {
      "ui:widget": RJSFSelect,
    },
  };
  return (
    <div style={{ margin: "100px" }}>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")}
      >
        <Button buttonType="primary" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
