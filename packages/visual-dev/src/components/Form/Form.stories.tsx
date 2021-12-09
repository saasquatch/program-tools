import { JSONSchema7 } from "json-schema";
import React from "react";
import { Button } from "../Button";
import { RJSFRadio } from "../Radio";
import { RJSFRadioCardWidget } from "../RadioCard";
import { RJSFCheckbox } from "../Checkbox";
import {
  RJSFCancellableInput,
  RJSFClearableInput,
  RJSFInput,
  RJSFLockableInput,
  RJSFNumericalInput,
} from "../Input";
import Form, { WidgetProps } from "@rjsf/core";

export default {
  title: "Components / Form",
  component: Form,
};

const log = (type: any) => console.log.bind(console, type);

export const SimpleForm = () => {
  const uiSchema = {
    "ui:widget": (props: WidgetProps) => {
      return <RJSFInput {...props} />;
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

export const SimpleFormDisabled = () => {
  const uiSchema = {
    "ui:widget": (props: WidgetProps) => {
      return <RJSFInput {...props} />;
    },
    "ui:disabled": true,
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

export const NumericalForm = () => {
  const uiSchema = {
    "ui:widget": (props: WidgetProps) => {
      return <RJSFNumericalInput {...props} />;
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

export const NumericalFormDisabled = () => {
  const uiSchema = {
    "ui:widget": (props : WidgetProps) => {
      return <RJSFNumericalInput {...props} />;
    },
    "ui:disabled": true,
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

export const LockableForm = () => {
  const uiSchema = {
    "ui:widget": (props: WidgetProps) => {
      return <RJSFLockableInput {...props} />;
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

export const ClearableForm = () => {
  const uiSchema = {
    "ui:widget": (props: WidgetProps) => {
      return <RJSFClearableInput {...props} />;
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

export const ClearableFormDisabled = () => {
  const uiSchema = {
    "ui:widget": (props: WidgetProps) => {
      return <RJSFClearableInput {...props} />;
    },
    "ui:disabled": true,
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

export const ExampleCancellableForm = () => {
  const uiSchema = {
    "ui:widget": (props: WidgetProps) => {
      return <RJSFCancellableInput {...props} />;
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

export const CheckboxForm = () => {
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

export const CheckboxFormDisabled = () => {
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

export const RadioForm = () => {
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
      "ui:widget": RJSFRadio,
      "ui:options": {
        label: false,
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

export const RadioFormDisabled = () => {
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
      "ui:widget": RJSFRadio,
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

export const RadioFormWithLabels = () => {
  const schema: JSONSchema7 = {
    type: "object",
    properties: {
      numberEnumRadio: {
        type: "number",
        title: "Number enum",
        enum: [1, 2, 3],
        enumNames: ["Option A", "Option B", "Option C"],
      },
    },
  };

  const uiSchema = {
    numberEnumRadio: {
      "ui:widget": RJSFRadio,
      "ui:options": {
        label: false,
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

export const RadioCardForm = () => {
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
            key: 0,
            icon: "icon-sqh-friends",
            title: "Promoter and Referred Friend",
            description:
              "Retract rewards from both the promoter and the referred friend",
          },
          {
            key: 1,
            icon: "alert",
            title: "Referred Friend",
            description: "Only retract rewards from the Referred Friend",
          },
          {
            key: 2,
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
