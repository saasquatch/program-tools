import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { ErrorStyles } from "../../global/mixins";
import { RegistrationFormState } from "../sqm-portal-registration-form/useRegistrationFormState";

export interface NameFieldsViewProps {
  states: {
    registrationFormState?: RegistrationFormState;
    content: {
      firstNameLabel: string;
      lastNameLabel: string;
    };
  };
}

const style = {
  ErrorStyle: ErrorStyles,
  FieldsContainer: {
    "& sl-input": {
      "margin-bottom": "var(--sl-spacing-large)",
    },
  },
};

const vanillaStyle = `
:host {
  margin: 0 auto;
  width: 100%;
  display: block;
}

sl-input::part(label){
  font-size: var(--sl-input-label-font-size-small);
  font-weight: var(--sl-font-weight-semibold);
}
`;

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function NameFieldsView(props: NameFieldsViewProps) {
  const { states } = props;
  const validationErrors = states?.registrationFormState?.validationErrors;
  return (
    <div class={sheet.classes.FieldsContainer}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <sl-input
        exportparts="label: input-label, base: input-base"
        name="/firstName"
        type="text"
        label={states.content.firstNameLabel}
        required
        disabled={
          states.registrationFormState?.loading ||
          states.registrationFormState?.disabled
        }
        {...(states.registrationFormState?.initialData?.firstName
          ? {
              value: states.registrationFormState?.initialData?.firstName,
            }
          : {})}
        {...(validationErrors?.firstName
          ? {
              class: sheet.classes.ErrorStyle,
              helpText: validationErrors?.firstName || "Cannot be empty",
            }
          : [])}
      ></sl-input>
      <sl-input
        exportparts="label: input-label, base: input-base"
        name="/lastName"
        type="text"
        label={states.content.lastNameLabel}
        required
        disabled={
          states.registrationFormState?.loading ||
          states.registrationFormState?.disabled
        }
        {...(states.registrationFormState?.initialData?.lastName
          ? {
              value: states.registrationFormState?.initialData?.lastName,
            }
          : {})}
        {...(validationErrors?.lastName
          ? {
              class: sheet.classes.ErrorStyle,
              helpText: validationErrors?.lastName || "Cannot be empty",
            }
          : [])}
      ></sl-input>
    </div>
  );
}
