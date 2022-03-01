import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { Country } from "./useCountryField";

export interface CountryFieldViewProps {
  states: {
    validationErrors?: Record<string, string>;
  };
  content: {
    dropdownName: string;
    dropdownLabel: string;
    dropdownRequired?: boolean;
    errorMessage: string;
    selectOptions?: VNode | VNode[];
  };
  data: {
    countries: Country[];
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

export function CountryFieldView(props: CountryFieldViewProps) {
  const { states, content, data } = props;
  const validationErrors = states?.validationErrors;

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
        {data.countries?.map((country) => (
          <sl-menu-item value={country.displayName}>
            {country.displayName}
          </sl-menu-item>
        ))}
      </sl-select>
      {validationErrors?.[content.dropdownName] && (
        <p class={sheet.classes.ErrorMessageStyle}>{content.errorMessage}</p>
      )}
    </div>
  );
}
