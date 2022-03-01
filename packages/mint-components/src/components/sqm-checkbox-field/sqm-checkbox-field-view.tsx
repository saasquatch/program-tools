import { h } from "@stencil/core";
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
    checkboxRequired?: boolean;
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
    margin: 0,
    marginTop: "5px",
    color: "var(--sl-color-danger-500)",
    fontSize: "var(--sl-input-help-text-font-size-medium)",
    fontFamily: "var(--sl-font-sans)",
    fontWeight: "var(--sl-font-weight-normal)",
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
sl-checkbox::part(label){
  font-size: var(--sl-input-label-font-size-small);
  font-weight: var(--sl-font-weight-semibold);
}
sl-checkbox::part(base){
  align-items: start;
}
`;

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function CheckboxFieldView(props: CheckboxFieldViewProps) {
  const { states, content, callbacks } = props;
  const validationErrors = states?.validationErrors;

  return (
    <div class={sheet.classes.FieldContainer}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <sl-checkbox
        exportparts="label: input-label"
        name={`/${content.checkboxName}`}
        checked={states.checked}
        onSl-change={(e) => {
          e.target.value = e.target.checked;
          callbacks.setChecked(e.target.value);
        }}
        {...(content.checkboxRequired ? { required: true } : [])}
        {...(!states.checked && validationErrors?.[content.checkboxName]
          ? {
              class: sheet.classes.ErrorStyle,
            }
          : [])}
      >
        {intl.formatMessage(
          {
            id: content.checkboxName + "-message",
            defaultMessage: content.checkboxLabel,
          },
          {
            labelLink: (
              <a href={content.checkboxLabelLink} target="_blank">
                {content.checkboxLabelLinkText || content.checkboxLabelLink}
              </a>
            ),
          }
        )}
        {!states.checked && validationErrors?.[content.checkboxName] && (
          <p class={sheet.classes.ErrorMessageStyle}>{content.errorMessage}</p>
        )}
      </sl-checkbox>
    </div>
  );
}
