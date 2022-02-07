import Form from "@rjsf/core";
import { JSONSchema7 } from "json-schema";
import React from "react";
import { Button } from "../../Button";
import { RJSFRadioActionWidget } from "../../RadioAction/rjsf-RadioAction";

export default {
  title: "Components / Form / RadioAction",
  component: Form,
};

const log = (type: any) => console.log.bind(console, type);

export const Default = () => {
  const schema: JSONSchema7 = {
    type: "object",
    properties: {
      numberEnumRadio: {
        type: "number",
        title: "Number enum",
        enum: [1, 2, 3],
      },
    },
  };

  const uiSchema = {
    numberEnumRadio: {
      "ui:widget": RJSFRadioActionWidget,
      "ui:options": {
        label: false,
        ruleOptions: [
          {
            value: 1,
            title: "Promoter and Referred Friend",
            description:
              "Retract rewards from both the promoter and the referred friend",
          },
          {
            value: 2,
            title: "Referred Friend",
            description: "Only retract rewards from the Referred Friend",
          },
          {
            value: 3,
            title: "Promoter",
            description: "Only retract rewards from the Promoter",
          },
        ],
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

export const TwoColumns = () => {
  const schema: JSONSchema7 = {
    type: "object",
    properties: {
      numberEnumRadio: {
        type: "number",
        title: "Number enum",
        enum: [1, 2, 3],
      },
    },
  };

  const uiSchema = {
    numberEnumRadio: {
      "ui:widget": RJSFRadioActionWidget,
      "ui:options": {
        label: false,
        twoColumns: true,
        ruleOptions: [
          {
            value: 1,
            title: "Promoter and Referred Friend",
            description:
              "Retract rewards from both the promoter and the referred friend",
          },
          {
            value: 2,
            title: "Referred Friend",
            description: "Only retract rewards from the Referred Friend",
          },
          {
            value: 3,
            title: "Promoter",
            description: "Only retract rewards from the Promoter",
          },
        ],
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
