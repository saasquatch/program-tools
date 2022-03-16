import Form from "@rjsf/core";
import { JSONSchema7 } from "json-schema";
import React from "react";
import { Button } from "../../Button";
import { RJSFCheckbox } from "../../Checkbox";

export default {
  title: "RJSF / Widgets / Checkbox",
  component: Form,
};

const log = (type: any) => console.log.bind(console, type);

export const Default = () => {
  const schema: JSONSchema7 = {
    type: "object",
    properties: {
      Done: {
        type: "boolean",
        title: "Done",
      },
    },
  };

  const uiSchema = {
    Done: {
      "ui:widget": RJSFCheckbox,
      "ui:options": {
        label: false,
        test: "test",
      },
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

export const Disabled = () => {
  const schema: JSONSchema7 = {
    type: "object",
    properties: {
      Done: {
        type: "boolean",
        title: "Done",
      },
    },
  };

  const uiSchema = {
    Done: {
      "ui:widget": RJSFCheckbox,
      "ui:options": {
        label: false,
      },
      "ui:disabled": true,
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
