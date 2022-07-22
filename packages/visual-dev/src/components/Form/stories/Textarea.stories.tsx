import Form, { WidgetProps } from "@rjsf/core";
import { JSONSchema7 } from "json-schema";
import React from "react";
import { Button } from "../../Button";
import { RJSFTextarea } from "../../TextArea";

export default {
  title: "RJSF / Widgets / Textarea",
  component: Form,
};

const log = (type: any) => console.log.bind(console, type);

export const Default = () => {
  const uiSchema = {
    "ui:widget": (props: WidgetProps) => {
      return <RJSFTextarea {...props} />;
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
      >
        <Button buttonType="primary" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export const CustomHeight = () => {
  const uiSchema = {
    "ui:widget": (props: WidgetProps) => {
      return <RJSFTextarea {...props} />;
    },
    "ui:options": {
      height: "80px",
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
      >
        <Button buttonType="primary" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
