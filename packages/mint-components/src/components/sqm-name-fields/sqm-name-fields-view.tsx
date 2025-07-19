import { h } from "@stencil/core";
import { ErrorStyles } from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";
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

*::part(input-label), *::part(select-label), *::part(textarea-label){
  font-size: var(--sqm-input-label-font-size, var(--sl-input-font-size-small));
  font-weight: var(--sl-font-weight-semibold);
  color: var(--sqm-input-label-color, var(--sqm-text), black);
}

*::part(input-base), *::part(select-base), *::part(textarea-base){
  background-color: var(--sqm-input-background, #fff);
  border-radius: var(--sqm-input-border-radius, var(--sl-input-border-radius-large), 0.25rem);
  color: var(--sqm-input-color, white);
  border-width: var(--sqm-border-thickness, 1px);
}

sl-input::part(base):focus,
sl-select::part(form-control-wrapper):focus,
sl-textare::part(textarea-label):focus {
  border-color: none;
  border: var(--sqm-input-focus-border, var(--sqm-border-thickness) solid var(--sl-input-border-color-focus));
}

*::part(input-label):disabled, *::part(select-label):disabled, *::part(textarea-label):disabled{
  background: var(--sqm-input-disabled-background, #f5f5f5);
  color: var(--sqm-input-disabled-color, var(--sl-color-gray-600));
}

sl-input {
  --sl-input-border-color-focus: var(--sqm-border-color-focus); 
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
