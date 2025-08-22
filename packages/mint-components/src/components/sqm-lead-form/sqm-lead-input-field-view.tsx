import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { intl } from "../../global/global";
import { ErrorStyles } from "../../global/mixins";
import { LeadFormState } from "./useLeadFormState";

export interface LeadInputFieldViewProps {
  states: {
    leadFormState?: LeadFormState;
  };
  content: {
    fieldName: string;
    fieldLabel: string;
    fieldType: "date" | "tel" | "text";
    fieldOptional?: boolean;
    requiredFieldErrorMessage: string;
  };
}

type RequiredFieldErrorParams = {
  fieldLabel: string;
};

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

export function LeadInputFieldView(props: LeadInputFieldViewProps) {
  const { states, content } = props;

  const getRequiredFieldErrorMessage = ({
    fieldLabel,
  }: RequiredFieldErrorParams) =>
    intl.formatMessage(
      {
        id: `requiredFieldErrorMessage-${fieldLabel}`,
        defaultMessage: content.requiredFieldErrorMessage,
      },
      {
        fieldLabel,
      }
    );

  return (
    <div part="sqm-base">
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <sl-input
        exportparts="label: input-label, base: input-base"
        name={`/${content.fieldName}`}
        type={content.fieldType}
        label={content.fieldLabel}
        {...(!content.fieldOptional ? { required: true } : [])}
        disabled={
          states.leadFormState?.loading || states.leadFormState?.disabled
        }
        validationError={({ value }: { value: string }) => {
          if (!value) {
            return getRequiredFieldErrorMessage({
              fieldLabel: content.fieldLabel,
            });
          }
        }}
        {...(states.leadFormState?.validationErrors?.[content.fieldName]
          ? {
              class: sheet.classes.ErrorStyle,
              helpText:
                states.leadFormState?.validationErrors?.[content.fieldName] ||
                content.requiredFieldErrorMessage,
            }
          : [])}
      ></sl-input>
    </div>
  );
}
