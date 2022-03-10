import Form, { WidgetProps } from "@rjsf/core";
import { JSONSchema7 } from "json-schema";
import React from "react";
import { Button } from "../../Button";
import { RJSFSwitch } from "../../Switch";

export default {
  title: "Components / Form / Switch",
  component: Form,
};

const log = (type: any) => console.log.bind(console, type);

export const Default = () => {
  const uiSchema = {
    "ui:widget": (props: WidgetProps) => {
      return <RJSFSwitch {...props} />;
    },
  };

  const schema: JSONSchema7 = {
    type: "boolean",
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
