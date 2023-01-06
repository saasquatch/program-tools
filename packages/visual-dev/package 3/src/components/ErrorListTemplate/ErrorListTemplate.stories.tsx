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

export const OneError = () => {
  const uiSchema = {
    field: {
      "ui:title": "Field Title",
      "ui:description":
        "Field descriptions appear below their respective fields now. Descriptions can get quite long",
      "ui:widget": (props: WidgetProps) => {
        return <RJSFInput {...props} />;
      },
      "ui:help": "This is help text",
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

export const MultipleErrorsForOneField = () => {
  const uiSchema = {
    field: {
      "ui:title": "Field Title",
      "ui:description":
        "Field descriptions appear below their respective fields now. Descriptions can get quite long",
      "ui:widget": (props: WidgetProps) => {
        return <RJSFInput {...props} />;
      },
      "ui:help": "This is help text",
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
        extraErrors={{
          field: {
            __errors: [
              "This field cannot be blank",
              "This field doesn't meet some validation requirement",
              "This field has a lot of issues",
            ],
          },
        }}
      >
        <Button buttonType="primary" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export const ManyErrors = () => {
  const uiSchema = {
    field1: {
      "ui:widget": (props: WidgetProps) => {
        return <RJSFInput {...props} />;
      },
    },
    field2: {
      "ui:widget": (props: WidgetProps) => {
        return <RJSFInput {...props} />;
      },
    },
    field3: {
      "ui:widget": (props: WidgetProps) => {
        return <RJSFInput {...props} />;
      },
    },
    field4: {
      "ui:widget": (props: WidgetProps) => {
        return <RJSFInput {...props} />;
      },
    },
    field5: {
      "ui:widget": (props: WidgetProps) => {
        return <RJSFInput {...props} />;
      },
    },
    field6: {
      "ui:widget": (props: WidgetProps) => {
        return <RJSFInput {...props} />;
      },
    },
  };

  const schema: JSONSchema7 = {
    type: "object",
    properties: {
      field1: {
        type: "string",
      },
      field2: {
        type: "string",
      },
      field3: {
        type: "string",
      },
      field4: {
        type: "string",
      },
      field5: {
        type: "string",
      },
      field6: {
        type: "string",
      },
    },
    required: ["field1"],
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
        extraErrors={{
          field1: { __errors: ["This field cannot be blank"] },
          field2: { __errors: ["This field has an error"] },
          field3: { __errors: ["This field has an error"] },
          field4: { __errors: ["This field has an error"] },
          field5: { __errors: ["This field has an error"] },
          field6: { __errors: ["This field has an error"] },
        }}
      >
        <Button buttonType="primary" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export const LongError = () => {
  const uiSchema = {
    field: {
      "ui:title": "Field Title",
      "ui:description":
        "Field descriptions appear below their respective fields now. Descriptions can get quite long",
      "ui:widget": (props: WidgetProps) => {
        return <RJSFInput {...props} />;
      },
      "ui:help": "This is help text",
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
        extraErrors={{
          field: {
            __errors: [
              "This field cannot be blank. This is some extra text to test how the template responds to long error messages. Hopefully everything wraps correctly and the form doesn't have issues with long messages like this one.",
            ],
          },
        }}
      >
        <Button buttonType="primary" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
