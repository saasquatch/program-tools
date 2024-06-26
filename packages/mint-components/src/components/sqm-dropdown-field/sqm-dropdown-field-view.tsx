import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { intl } from "../../global/global";
import { RegistrationFormState } from "../sqm-portal-registration-form/useRegistrationFormState";

export interface DropdownFieldViewProps {
  states: {
    registrationFormState?: RegistrationFormState;
  };
  content: {
    dropdownName: string;
    dropdownLabel: string;
    dropdownOptional?: boolean;
    errorMessage: string;
    selectOptions?: VNode | VNode[];
  };
}

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
`;

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function DropdownFieldView(props: DropdownFieldViewProps) {
  const { states, content } = props;
  const validationErrors = states?.registrationFormState?.validationErrors;
  return (
    <div class={sheet.classes.FieldContainer} part="sqm-base">
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <sl-select
        exportparts="label: input-label, base: input-base"
        label={content.dropdownLabel}
        name={`/${content.dropdownName}`}
        {...(!content.dropdownOptional ? { required: true } : [])}
        disabled={
          states.registrationFormState?.loading ||
          states.registrationFormState?.disabled
        }
        {...(states.registrationFormState?.initialData?.[content.dropdownName]
          ? {
              value:
                states.registrationFormState?.initialData?.[
                  content.dropdownName
                ],
            }
          : {})}
        {...(validationErrors?.[content.dropdownName]
          ? {
              class: sheet.classes.ErrorStyle,
            }
          : [])}
      >
        {content.selectOptions}
      </sl-select>
      {validationErrors?.[content.dropdownName] && (
        <p class={sheet.classes.ErrorMessageStyle}>
          {intl.formatMessage({
            id: `errorMessage-${content.dropdownName}`,
            defaultMessage: content.errorMessage,
          })}
        </p>
      )}
    </div>
  );
}
