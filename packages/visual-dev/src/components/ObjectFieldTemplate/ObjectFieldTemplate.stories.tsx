import { JSONSchema7 } from "json-schema";
import React from "react";
import { Button } from "../Button";
import { RJSFInput } from "../Input";
import Form, { WidgetProps } from "@rjsf/core";
import { ObjectFieldTemplate } from "./ObjectFieldTemplate";
import { FieldTemplate } from "../FieldTemplate";

export default {
  title: "RJSF / Object Field Template",
  component: ObjectFieldTemplate,
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
    type: "object",
    title: "Object Field Title",
    description: "This is an object field description",
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
        ObjectFieldTemplate={ObjectFieldTemplate}
      >
        <Button buttonType="primary" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export const TwoColumns = () => {
  const uiSchema = {
    "ui:options": {
      customCSS: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "var(--sq-spacing-small)",
      },
    },
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
    type: "object",
    title: "Object Field Title",
    description: "This is an object field description",
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
        ObjectFieldTemplate={ObjectFieldTemplate}
      >
        <Button buttonType="primary" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export const UISchemaTitle = () => {
  const uiSchema = {
    field1: {
      "ui:title": "First Object Field (UI Schema Title)",
      "ui:description":
        "Field descriptions appear below their respective fields now. Descriptions can get quite long",
      field11: {
        "ui:title": "First String Field",
        "ui:description":
          "Field descriptions appear below their respective fields now. Descriptions can get quite long",
        "ui:widget": (props: WidgetProps) => {
          return <RJSFInput {...props} />;
        },
      },
    },
    field2: {
      "ui:title": "Second String Field",
      "ui:description":
        "Field descriptions appear below their respective fields now. Descriptions can get quite long",
      "ui:widget": (props: WidgetProps) => {
        return <RJSFInput {...props} />;
      },
    },
  };

  const schema: JSONSchema7 = {
    type: "object",
    title: "Object Field Title",
    description: "This is an object field description",
    properties: {
      field1: {
        type: "object",
        title: "Object Field Title (Schema Title)",
        properties: {
          field11: {
            type: "string",
          },
        },
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
        ObjectFieldTemplate={ObjectFieldTemplate}
      >
        <Button buttonType="primary" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
