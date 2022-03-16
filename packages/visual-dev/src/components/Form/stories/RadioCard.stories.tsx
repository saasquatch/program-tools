import Form from "@rjsf/core";
import { JSONSchema7 } from "json-schema";
import React from "react";
import { Button } from "../../Button";
import { RJSFRadioCardWidget } from "../../RadioCard";

export default {
  title: "RJSF / Widgets / RadioCard",
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
      "ui:widget": RJSFRadioCardWidget,
      "ui:options": {
        label: false,
        ruleOptions: [
          {
            value: 1,
            icon: "icon-sqh-friends",
            title: "Promoter and Referred Friend",
            description:
              "Retract rewards from both the promoter and the referred friend",
          },
          {
            value: 2,
            icon: "alert",
            title: "Referred Friend",
            description: "Only retract rewards from the Referred Friend",
          },
          {
            value: 3,
            icon: "icon-sqh-street-view",
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
