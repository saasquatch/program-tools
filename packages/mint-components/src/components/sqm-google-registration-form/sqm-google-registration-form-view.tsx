import { h, VNode } from "@stencil/core";
import {
  AuthButtonsContainer,
  AuthColumn,
  AuthWrapper,
  ErrorStyles,
  HostBlock,
} from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";
import { RegistrationFormState } from "../sqm-portal-registration-form/useRegistrationFormState";
import { TextSpanView } from "../sqm-text-span/sqm-text-span-view";

export interface PortalGoogleRegistrationFormViewProps {
  states: {
    error: string;
    loading: boolean;
    hideInputs: boolean;
    registrationFormState: RegistrationFormState;
    // loginPath: string;
  };
  callbacks: {
    submit: Function;
    inputFunction: Function;
  };
  content: {
    formData?: VNode;
    terms?: VNode;
    passwordField?: VNode;
    secondaryButton?: VNode;
    emailLabel?: string;
    passwordLabel?: string;
    submitLabel?: string;
    pageLabel?: string;
    confirmPasswordLabel: string;
    requiredFieldErrorMessage: string;
    invalidEmailErrorMessage: string;
    meetsRequirementsText?: string;
    doesNotMeetRequirementsText?: string;
    minErrorText?: string;
    uppercaseErrorText?: string;
    lowercaseErrorText?: string;
    hasErrorText?: string;
  };
  refs: {
    formRef: any;
  };
}

const style = {
  Wrapper: { ...AuthWrapper, "max-width": "600px" },
  Column: AuthColumn,
  HostBlock: HostBlock,

  ":host": {
    margin: "0 auto",
    width: "100%",
  },

  ButtonsContainer: AuthButtonsContainer,
  ErrorStyle: ErrorStyles,
};

const vanillaStyle = `
sqm-portal-register {
  margin: 0 auto;
  width: 100%;
  display: block;
}

:host{
  display: block;
}

:host([hidden]) {
  display: none;
}
`;

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

const countries = [
  {
    countryCode: "CA",
    displayName: "Canada",
  },
  {
    countryCode: "ES",
    displayName: "Spain",
  },
  {
    countryCode: "UK",
    displayName: "United Kingdom",
  },
  {
    countryCode: "US",
    displayName: "United States",
  },
  {
    countryCode: "AR",
    displayName: "Argentina",
  },
  {
    countryCode: "AU",
    displayName: "Australia",
  },
  {
    countryCode: "ZW",
    displayName: "Zimbabwe",
  },
];

export function PortalGoogleRegistrationFormView(
  props: PortalGoogleRegistrationFormViewProps
) {
  const { states, callbacks, content } = props;
  return (
    <div class={sheet.classes.Wrapper}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <TextSpanView type="h3">{content.pageLabel}</TextSpanView>
      <sl-form
        class={sheet.classes.Column}
        // onSl-submit={callbacks.submit}
        // ref={(el: HTMLFormElement) => (refs.formRef.current = el)}
        novalidate
      >
        {states.error && (
          <sqm-form-message type="error" exportparts="erroralert-icon">
            <div part="erroralert-text">{props.states.error}</div>
          </sqm-form-message>
        )}
        <sl-input
          exportparts="label: input-label, base: input-base"
          type="firstName"
          name="/firstName"
          label={content.emailLabel || "First Name"}
          disabled={states.loading}
          required
        ></sl-input>
        <sl-input
          exportparts="label: input-label, base: input-base"
          type="lastName"
          name="/lastName"
          label={content.emailLabel || "Last Name"}
          disabled={states.loading}
          required
        ></sl-input>

        {!states.hideInputs && (
          <sl-input
            exportparts="label: input-label, base: input-base"
            type="email"
            name="/email"
            label={content.emailLabel || "Email"}
            disabled={states.loading}
            required
            validationError={({ value }: { value: string }) => {
              if (!value) {
                return content.requiredFieldErrorMessage;
              }
              // this matches shoelace validation, but could be better
              if (!value.includes("@")) {
                return content.invalidEmailErrorMessage;
              }
            }}
            {...(states.registrationFormState?.validationErrors?.email
              ? {
                  class: sheet.classes.ErrorStyle,
                  helpText:
                    states.registrationFormState?.validationErrors?.email ||
                    content.requiredFieldErrorMessage,
                }
              : [])}
          ></sl-input>
        )}
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
        {content.terms}
        <div class={sheet.classes.ButtonsContainer}>
          <sl-button
            submit
            loading={states.loading}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            {content.submitLabel || "Register"}
          </sl-button>
          {content.secondaryButton}
        </div>
      </sl-form>
    </div>
  );
}
