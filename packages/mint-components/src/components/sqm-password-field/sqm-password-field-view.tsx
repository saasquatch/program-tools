import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { ErrorStyles } from "../../global/mixins";
import { RegistrationFormState } from "../sqm-portal-registration-form/useRegistrationFormState";

export interface PortalPasswordFieldViewProps {
  states: {
    enableValidation: boolean;
    dynamicValidation: VNode | string;
    registrationFormState: RegistrationFormState;
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

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function PortalResetPasswordView(props: PortalPasswordFieldViewProps) {
  const { states, callbacks } = props;

  return (
    <div
      class={sheet.classes.InputContainer}
      part="sqm-password-field-container"
    >
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
        disabled={
          states.registrationFormState?.loading ||
          states.registrationFormState?.disabled
        }
        validationError={({ value }) => {
          if (!value) {
            return "Cannot be empty";
          }
        }}
        {...(states.registrationFormState?.initialData?.password
          ? {
              value: states.registrationFormState?.initialData?.password,
            }
          : {})}
        {...(states.registrationFormState?.validationErrors?.password
          ? {
              class: sheet.classes.ErrorStyle,
              helpText:
                states.registrationFormState?.validationErrors?.password ||
                "Cannot be empty",
            }
          : [])}
        onInput={(input) => states.enableValidation && callbacks.onInput(input)}
      ></sl-input>
      {states.dynamicValidation}
    </div>
  );
}
