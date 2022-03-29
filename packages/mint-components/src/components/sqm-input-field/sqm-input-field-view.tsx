import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { ErrorStyles } from "../../global/mixins";
import { ValidationErrors } from "../sqm-portal-register/useValidationState";

export interface InputFieldViewProps {
  states: {
    validationErrors?: ValidationErrors;
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
  const validationErrors = states?.validationErrors;

  return (
    <div class={sheet.classes.FieldContainer}>
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
        {...(validationErrors?.[content.fieldName]
          ? {
              class: sheet.classes.ErrorStyle,
              helpText:
                content.errorMessage || validationErrors?.[content.fieldName],
            }
          : [])}
      ></sl-input>
    </div>
  );
}
