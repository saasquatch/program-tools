import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { intl } from "../../global/global";
import { RegistrationFormState } from "../sqm-portal-registration-form/useRegistrationFormState";
import { LeadFormState } from "./useLeadFormState";

export interface DropdownFieldViewProps {
  states: {
    leadFormState?: LeadFormState;
  };
  content: {
    dropdownName: string;
    dropdownLabel: string;
    dropdownOptional: boolean;
    optionalLabel: string;
    multiple: boolean;
    requiredFieldErrorMessage?: string;
    selectOptions?: VNode | VNode[];
  };
}

type RequiredFieldErrorParams = {
  dropdownLabel: string;
};

const style = {
  ErrorStyle: {
    "--sl-input-border-color": "var(--sl-color-danger-500)",
    "--sl-input-background-color": "var(--sl-color-danger-10)",
    "--sl-input-border-color-focus": "var(--sl-color-danger-500)",
    "--sl-input-border-color-hover": "var(--sl-color-danger-500)",
  },
  ErrorMessageStyle: {
    margin: 0,
    color: "var(--sl-color-danger-500)",
    fontSize: "var(--sl-input-help-text-font-size-medium)",
  },
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
sl-select::part(label){
  font-size: var(--sl-input-label-font-size-small);
  font-weight: var(--sl-font-weight-semibold);
}
sl-select::part(menu){
  max-height: 300px;
}
`;

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function LeadDropdownFieldView(props: DropdownFieldViewProps) {
  const { states, content } = props;
  const validationErrors = states?.leadFormState?.validationErrors;

  const getRequiredFieldErrorMessage = ({
    dropdownLabel,
  }: RequiredFieldErrorParams) =>
    intl.formatMessage(
      {
        id: `requiredFieldErrorMessage-${dropdownLabel}`,
        defaultMessage: content.requiredFieldErrorMessage,
      },
      {
        dropdownLabel,
      }
    );

  return (
    <div class={sheet.classes.FieldContainer} part="sqm-base">
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <sl-select
        style={{ maxHeight: "100px" }}
        exportparts="label: input-label, base: input-base"
        label={`${content.dropdownLabel}${
          content.dropdownOptional ? ` ${content.optionalLabel}` : ""
        }`}
        name={`/${content.dropdownName}`}
        multiple={content.multiple}
        {...(!content.dropdownOptional ? { required: true } : [])}
        disabled={
          states.leadFormState?.loading || states.leadFormState?.disabled
        }
        validationError={({ value }: { value: string }) => {
          if (!value && !content.dropdownOptional) {
            return getRequiredFieldErrorMessage({
              dropdownLabel: content.dropdownLabel,
            });
          }
        }}
        {...(states.leadFormState?.validationErrors?.[content.dropdownName]
          ? {
              class: sheet.classes.ErrorStyle,
            }
          : [])}
      >
        {content.selectOptions}
      </sl-select>
      {validationErrors?.[content.dropdownName] && (
        <p class={sheet.classes.ErrorMessageStyle}>
          {getRequiredFieldErrorMessage({
            dropdownLabel: content.dropdownLabel,
          })}
        </p>
      )}
    </div>
  );
}
