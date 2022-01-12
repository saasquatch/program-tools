import { JSONSchema7 } from "json-schema";
import React from "react";
import { Button } from "../Button";
import { RJSFInput } from "../Input";
import Form, { WidgetProps } from "@rjsf/core";
import { ArrayFieldTemplate } from "./ArrayFieldTemplate";
import { FieldTemplate } from "../FieldTemplate";

export default {
  title: "RJSF / Array Field Template",
  component: ArrayFieldTemplate,
};

const log = (type: any) => console.log.bind(console, type);

export const Default = () => {
  const uiSchema = {
    field1: {
      "ui:title": "First Field",
      "ui:description":
        "Field descriptions appear below their respective fields now. Descriptions can get quite long",
      "ui:widget": (props: WidgetProps) => {
        return <RJSFInput {...props} />;
      },
    },
    field2: {
      "ui:title": "Second Field",
      "ui:description":
        "Field descriptions appear below their respective fields now. Descriptions can get quite long",
      "ui:widget": (props: WidgetProps) => {
        return <RJSFInput {...props} />;
      },
    },
  };

  const schema: JSONSchema7 = {
    type: "array",
    title: "Array Field Title",
    description: "This is an array field description",
    properties: {
      field1: {
        type: "string",
      },
      field2: {
        type: "string",
      },
    },
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
        ArrayFieldTemplate={ArrayFieldTemplate}
      >
        <Button buttonType="primary" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
