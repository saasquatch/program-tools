import { JSONSchema7 } from "json-schema";
import React from "react";
import { Button } from "../Button";
import { RJSFInput } from "../Input";
import Form, { WidgetProps } from "@rjsf/core";
import { FieldTemplate } from "./FieldTemplate";

export default {
  title: "RJSF / Field Template",
  component: FieldTemplate,
};

const log = (type: any) => console.log.bind(console, type);

export const Default = () => {
  const uiSchema = {
    "ui:title": "Field Title",
    "ui:description":
      "Field descriptions appear below their respective fields now. Descriptions can get quite long",
    "ui:widget": (props: WidgetProps) => {
      return <RJSFInput {...props} />;
    },
  };

  const schema: JSONSchema7 = {
    type: "string",
  };

  return (
    <div style={{ margin: "100px", resize: "horizontal", overflow: "hidden" }}>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")}
        FieldTemplate={FieldTemplate}
      >
        <Button buttonType="primary" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export const WithHelp = () => {
  const uiSchema = {
    "ui:title": "Field Title",
    "ui:description":
      "Field descriptions appear below their respective fields now. Descriptions can get quite long",
    "ui:help": "Help text can also be added to fields",
    "ui:widget": (props: WidgetProps) => {
      return <RJSFInput {...props} />;
    },
  };

  const schema: JSONSchema7 = {
    type: "string",
  };

  return (
    <div style={{ margin: "100px", resize: "horizontal", overflow: "hidden" }}>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")}
        FieldTemplate={FieldTemplate}
      >
        <Button buttonType="primary" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export const Required = () => {
  const uiSchema = {
    field: {
      "ui:title": "Field Title",
      "ui:description":
        "Field descriptions appear below their respective fields now. Descriptions can get quite long",
      "ui:widget": (props: WidgetProps) => {
        return <RJSFInput {...props} />;
      },
    },
  };

  const schema: JSONSchema7 = {
    type: "object",
    properties: {
      field: {
        type: "string",
      },
    },
    required: ["field"],
  };

  return (
    <div style={{ margin: "100px", resize: "horizontal", overflow: "hidden" }}>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")}
        FieldTemplate={FieldTemplate}
      >
        <Button buttonType="primary" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
