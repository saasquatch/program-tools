import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

export interface DropdownFieldViewProps {
  states: {
    validationErrors?: Record<string, string>;
    checked: boolean;
  };
  content: {
    dropdownName: string;
    dropdownLabel: string;
    dropdownRequired?: boolean;
    errorMessage: string;
    selectOptions?: VNode | VNode[];
  };
  callbacks: {
    setChecked: Function;
  };
}

const style = {
  ErrorStyle: {
    "&::part(base)": {
      background: "var(--sl-color-danger-10)",
      borderColor: "var(--sl-color-danger-500)",
      outline: "var(--sl-color-danger-500)",
    },
    "&::part(base) > *": {
      background: "red",
    },
    "&:host": {
      "--focus-ring": "0 0 0 var(--sl-focus-ring-width) red !important",
    },
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
  const { states, content, callbacks } = props;
  const validationErrors = states?.validationErrors;

  console.log(content.dropdownName);
  return (
    <div class={sheet.classes.FieldContainer}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <sl-select
        exportparts="label: input-label"
        label={content.dropdownLabel}
        name={`/${content.dropdownName}`}
        {...(content.dropdownRequired ? { required: true } : [])}
        {...(validationErrors?.[content.dropdownName]
          ? {
              class: sheet.classes.ErrorStyle,
            }
          : [])}
      >
        {content.selectOptions}
      </sl-select>
      {validationErrors?.[content.dropdownName] && (
        <p class={sheet.classes.ErrorMessageStyle}>{content.errorMessage}</p>
      )}
    </div>
  );
}
