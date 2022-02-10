import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { intl } from "../../global/global";

export interface CheckboxFieldViewProps {
  states: {
    validationErrors?: Record<string, string>;
    checked: boolean;
  };
  content: {
    checkboxName: string;
    checkboxLabel: string;
    checkboxLabelLink?: string;
    checkboxLabelLinkText?: string;
    errorMessage: string;
  };
  callbacks: {
    setChecked: Function;
  };
}

const style = {
  ErrorStyle: {
    "&::part(control)": {
      background: "var(--sl-color-danger-10)",
      borderColor: "var(--sl-color-danger-500)",
      outline: "var(--sl-color-danger-500)",
    },

    "&:host": {
      "--focus-ring": "0 0 0 var(--sl-focus-ring-width) red !important",
    },
  },
  ErrorMessageStyle: {
    marginTop: 0,
    color: "var(--sl-color-danger-500)",
    fontSize: "var(--sl-input-help-text-font-size-medium)",
  },
};

const vanillaStyle = `
:host {
  margin: 0 auto;
  width: 100%;
  display: block;
}
sl-checkbox::part(label){
  font-size: var(--sl-input-label-font-size-small);
  font-weight: var(--sl-font-weight-semibold);
}
`;

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function CheckboxFieldView(props: CheckboxFieldViewProps) {
  const { states, content, callbacks } = props;
  const validationErrors = states?.validationErrors;

  return (
    <div>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <sl-checkbox
        exportparts="label: input-label"
        name={`/${content.checkboxName}`}
        checked={states.checked}
        onSl-change={(e) => {
          console.log("on sl change");

          e.target.value = e.target.checked;
          callbacks.setChecked(e.target.value);
        }}
        required
        {...(!states.checked && validationErrors?.[content.checkboxName]
          ? {
              class: sheet.classes.ErrorStyle,
            }
          : [])}
      >
        {intl.formatMessage(
          {
            id: content.checkboxName,
            defaultMessage: content.checkboxLabel,
          },
          {
            labelLink: (
              <a href={content.checkboxLabelLink} target="_blank">
                {content.checkboxLabelLinkText}
              </a>
            ),
          }
        )}
      </sl-checkbox>
      {!states.checked && validationErrors?.[content.checkboxName] && (
        <p class={sheet.classes.ErrorMessageStyle}>{content.errorMessage}</p>
      )}
    </div>
  );
}
