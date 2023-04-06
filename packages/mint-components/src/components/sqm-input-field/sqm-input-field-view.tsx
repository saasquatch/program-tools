import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { intl } from "../../global/global";
import { ErrorStyles } from "../../global/mixins";
import { RegistrationFormState } from "../sqm-portal-registration-form/useRegistrationFormState";

export interface InputFieldViewProps {
  states: {
    registrationFormState?: RegistrationFormState;
  };
  content: {
    fieldName: string;
    fieldLabel: string;
    fieldType: "date" | "tel" | "text";
    fieldOptional?: boolean;
    errorMessage: string;
  };
}

const style = {
  ErrorStyle: ErrorStyles,
  FieldContainer: {
    "margin-bottom": "var(--sl-spacing-large)",
  },
};

const vanillaStyle = `
:host {
  margin: 0 auto;
  width: 100%;
  display: block;
}
`;

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function InputFieldView(props: InputFieldViewProps) {
  const { states, content } = props;
  const validationErrors = states?.registrationFormState?.validationErrors;

  return (
    <div class={sheet.classes.FieldContainer} part="sqm-input-field-container">
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <sl-input
        exportparts="label: input-label"
        name={`/${content.fieldName}`}
        type={content.fieldType}
        label={content.fieldLabel}
        {...(!content.fieldOptional ? { required: true } : [])}
        disabled={
          states.registrationFormState?.loading ||
          states.registrationFormState?.disabled
        }
        {...(states.registrationFormState?.initialData?.[content.fieldName]
          ? {
              value:
                states.registrationFormState?.initialData?.[content.fieldName],
            }
          : {})}
        {...(validationErrors?.[content.fieldName]
          ? {
              class: sheet.classes.ErrorStyle,
              helpText: intl.formatMessage({
                id: `errorMessage-${content.fieldName}`,
                defaultMessage:
                  content.errorMessage || validationErrors?.[content.fieldName],
              }),
            }
          : [])}
      ></sl-input>
    </div>
  );
}
