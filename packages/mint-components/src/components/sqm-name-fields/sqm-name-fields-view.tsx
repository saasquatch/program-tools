import { isPossiblePhoneNumber } from "libphonenumber-js";
import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { ErrorStyles } from "../../global/mixins";

export interface NameFieldsViewProps {
  states: {
    validationErrors?: Record<string, string>;
    content: {
      firstNameLabel: string;
      lastNameLabel: string;
    };
  };
}

const style = {
  InputContainer: {
    "& > :not(:last-child)": {
      "margin-bottom": "20px",
    },
  },
  FieldsContainer: {
    "& > :not(:last-child)": {
      "margin-bottom": "var(--sl-spacing-large)",
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

sl-input::part(label){
  font-size: var(--sl-input-label-font-size-small);
  font-weight: var(--sl-font-weight-semibold);
}
`;

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function NameFieldsView(props: NameFieldsViewProps) {
  const { states } = props;
  const validationErrors = states?.validationErrors;
  return (
    <div class={sheet.classes.FieldsContainer}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <sl-input
        exportparts="label: input-label"
        name="/firstName"
        type="text"
        label={states.content.firstNameLabel}
        required
        {...(validationErrors?.firstName
          ? {
              class: sheet.classes.ErrorStyle,
              helpText: validationErrors?.firstName || "Cannot be empty",
            }
          : [])}
      ></sl-input>
      <sl-input
        exportparts="label: input-label"
        name="/lastName"
        type="text"
        label={states.content.lastNameLabel}
        required
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
