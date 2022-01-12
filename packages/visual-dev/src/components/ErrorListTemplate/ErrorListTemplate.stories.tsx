import { JSONSchema7 } from "json-schema";
import React from "react";
import { Button } from "../Button";
import { RJSFInput } from "../Input";
import Form, { WidgetProps } from "@rjsf/core";
import { ErrorListTemplate } from "./ErrorListTemplate";
import { FieldTemplate } from "../FieldTemplate";
import { ObjectFieldTemplate } from "../ObjectFieldTemplate";

export default {
  title: "RJSF / Error List Template",
  component: FieldTemplate,
};

const log = (type: any) => console.log.bind(console, type);

export const WithErrors = () => {
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
        ObjectFieldTemplate={ObjectFieldTemplate}
        ErrorList={ErrorListTemplate}
        extraErrors={{ field: { __errors: ["This field cannot be blank"] } }}
      >
        <Button buttonType="primary" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
