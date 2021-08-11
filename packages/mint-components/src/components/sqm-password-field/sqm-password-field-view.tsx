import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { ErrorStyles } from "../../global/mixins";

export interface PortalPasswordFieldViewProps {
  states: {
    enableValidation: boolean;
    dynamicValidation: VNode | string;
    validationErrors: Record<string, string>;
    content: {
      fieldLabel: string;
    };
  };
  callbacks: {
    onInput: (input: InputEvent) => void;
  };
}

const style = {
  InputContainer: {
    "& > :not(:last-child)": {
      "margin-bottom": "20px",
    },
  },
  ErrorStyle: ErrorStyles,
};

const vanillaStyle = `
:host {
  margin: 0 auto;
  width: 100%;
  display: block;
}
:host([hidden]): {
  display: none;
}
`;

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function PortalResetPasswordView(props: PortalPasswordFieldViewProps) {
  const { states, callbacks } = props;

  return (
    <div class={sheet.classes.InputContainer}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <sl-input
        exportparts="label: input-label"
        type="password"
        name="/password"
        label={states.content.fieldLabel || "Password"}
        required
        validationError={({ value }) => {
          if (!value) {
            return "Cannot be empty";
          }
        }}
        {...(states.validationErrors?.password
          ? {
              class: sheet.classes.ErrorStyle,
              helpText: states.validationErrors?.password || "Cannot be empty",
            }
          : [])}
        onInput={(input) => states.enableValidation && callbacks.onInput(input)}
      ></sl-input>
      {states.dynamicValidation}
    </div>
  );
}
