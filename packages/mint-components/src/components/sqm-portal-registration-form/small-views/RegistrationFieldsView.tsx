import { h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";
import { intl } from "../../../global/global";
// import { intl } from "../../../../global/global";
// import { createStyleSheet } from "../../../../styling/JSS";
// import { vatLabels } from "../../countries";
// import { TaxCountry } from "../../sqm-tax-and-cash/data";
// import { INDIRECT_TAX_PROVINCES } from "../../subregions";
// import { formatErrorMessage } from "../../utils";

export interface RegistrationFieldsViewProps {
  states: {
    loading: boolean;
    isGoogle: boolean;
    enablePasswordValidation: boolean;
    registrationFormState: {
      disabled?: boolean;
      initialData?: {
        confirmPassword?: string;
      };
      validationErrors?: {
        confirmPassword?: string;
      };
    };
  };
  //AL: TODO
  callbacks: {};
  text: {
    // indirectTaxNumber: string;
    // error: {
    //   indirectTaxNumber: string;
    // };
    // passwordLabel: string;
    // confirmPasswordLabel: string;
    // requiredFieldErrorMessage: string;
    // invalidEmailErrorMessage: string;
    // meetsRequirementsText: string;
    // doesNotMeetRequirementsText: string;
    // minErrorText: string;
    // uppercaseErrorText: string;
    // lowercaseErrorText: string;
    // hasErrorText: string;
  };
  content: {
    passwordLabel: string;
    confirmPasswordLabel: string;
    requiredFieldErrorMessage: string;
    invalidEmailErrorMessage: string;
    meetsRequirementsText: string;
    doesNotMeetRequirementsText: string;
    minErrorText: string;
    uppercaseErrorText: string;
    lowercaseErrorText: string;
    hasErrorText: string;
  };
}

const style = {
  Container: {
    width: "100%",
  },
  InputsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--sl-spacing-medium)",
  },
  HR: {
    border: "1px solid #E0E0E0",
    margin: "10px 0",
  },
  Input: { maxWidth: "500px" },
  Checkbox: {
    "&::part(control)": {
      borderRadius: "0 !important",
    },
  },
  SearchInput: {
    padding: "var(--sl-spacing-x-small)",
  },
  ErrorInput: {
    maxWidth: "500px",
    "&::part(base)": {
      border: "1px solid var(--sl-color-danger-500)",
      borderRadius: "var(--sl-input-border-radius-medium)",
    },

    "&::part(help-text)": {
      color: "var(--sl-color-danger-500)",
    },
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

const vanillaStyle = `
    :host{
      display: block;   
    }
    * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
    }
  `;

export const RegistrationFieldsView = (props: RegistrationFieldsViewProps) => {
  //AL :TODO callbacks
  const { states, callbacks, content } = props;
  const { classes } = sheet;

  const RegularFields = () => {
    return (
      <div class={classes.InputsContainer}>
        <sqm-password-field
          fieldLabel={content.passwordLabel}
          disable-validation={!states.enablePasswordValidation}
          meetsRequirementsText={content.meetsRequirementsText}
          doesNotMeetRequirementsText={content.doesNotMeetRequirementsText}
          minErrorText={content.minErrorText}
          uppercaseErrorText={content.uppercaseErrorText}
          lowercaseErrorText={content.lowercaseErrorText}
          hasErrorText={content.hasErrorText}
        ></sqm-password-field>
        <sl-input
          exportparts="label: input-label, base: input-base"
          type="password"
          name="/confirmPassword"
          label={content.confirmPasswordLabel}
          disabled={states.loading || states.registrationFormState?.disabled}
          required
          {...(states.registrationFormState?.initialData?.confirmPassword
            ? {
                value:
                  states.registrationFormState?.initialData?.confirmPassword,
              }
            : {})}
          {...(states.registrationFormState?.validationErrors?.confirmPassword
            ? {
                class: sheet.classes.ErrorInput,
                helpText:
                  states.registrationFormState?.validationErrors
                    ?.confirmPassword || content.requiredFieldErrorMessage,
              }
            : [])}
        ></sl-input>
      </div>
    );
  };

  const GoogleFields = () => {
    //AL:TODO
    const countries = [
      {
        countryCode: "CA",
        displayName: "Canada",
      },
      {
        countryCode: "ES",
        displayName: "Spain",
      },
    ];

    return (
      <sl-select
        id="countryCode"
        exportparts="label: input-label, base: input-base"
        name="/countryCode"
        label={"Country"}
        value={"CA"}
      >
        {countries?.map((c) => (
          <sl-menu-item value={c.countryCode}>{c.displayName}</sl-menu-item>
        ))}
      </sl-select>
    );
  };

  const activeInput = states.isGoogle ? <GoogleFields /> : <RegularFields />;

  return (
    <div>
      <form class={classes.Container}>
        <style type="text/css">
          {styleString}
          {vanillaStyle}
        </style>
        <div>{activeInput}</div>
      </form>
    </div>
  );
};
