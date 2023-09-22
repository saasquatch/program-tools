import { JSONSchema7 } from "json-schema";
import React from "react";
import { Button } from "../Button";
import Form from "@rjsf/core";
import { ArrayFieldTemplate } from "./ArrayFieldTemplate";
import { FieldTemplate } from "../FieldTemplate";
import { ObjectFieldTemplate } from "../ObjectFieldTemplate";
import { RJSFInput } from "../Input";

export default {
  title: "RJSF / Array Field Template",
  component: ArrayFieldTemplate,
};

const log = (type: any) => console.log.bind(console, type);

export const Default = () => {
  const schema: JSONSchema7 = {
    type: "object",
    properties: {
      listOfStrings: {
        type: "array",
        title: "A list of strings",
        items: {
          type: "string",
          default: "test array field",
        },
      },
    },
  };

  const uiSchema = {
    listOfStrings: {
      items: {
        "ui:widget": RJSFInput,
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
        ObjectFieldTemplate={ObjectFieldTemplate}
      >
        <Button buttonType="primary" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export const FixedList = () => {
  const schema: JSONSchema7 = {
    type: "object",
    properties: {
      listOfStrings: {
        type: "array",
        title: "A list of strings",
        items: {
          type: "string",
          default: "test array field",
        },
      },
    },
  };

  const uiSchema = {
    listOfStrings: {
      items: {
        "ui:widget": RJSFInput,
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
        ObjectFieldTemplate={ObjectFieldTemplate}
      >
        <Button buttonType="primary" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export const NestedList = () => {
  const schema: JSONSchema7 = {
    type: "object",
    properties: {
      listOfStrings: {
        type: "array",
        title: "A list of strings",
        items: {
          type: "string",
          default: "test array field",
        },
      },
    },
  };

  const uiSchema = {
    listOfStrings: {
      items: {
        "ui:widget": RJSFInput,
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
        ObjectFieldTemplate={ObjectFieldTemplate}
      >
        <Button buttonType="primary" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
