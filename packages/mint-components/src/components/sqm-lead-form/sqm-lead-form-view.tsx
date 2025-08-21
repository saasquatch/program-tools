import { h, VNode } from "@stencil/core";
import {
  AuthButtonsContainer,
  AuthColumn,
  AuthWrapper,
  ErrorStyles,
  HostBlock,
} from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";
import { TextSpanView } from "../sqm-text-span/sqm-text-span-view";
import { LeadFormState } from "./useLeadFormState";
import { intl } from "../../global/global";

export interface LeadFormViewProps {
  states: {
    error: string;
    success: boolean;
    loading: boolean;
    leadFormState: LeadFormState;
    referralCode: string;
  };
  callbacks: {
    submit: Function;
    inputFunction: Function;
  };
  content: {
    formData?: VNode;
    emailLabel?: string;
    firstNameLabel?: string;
    lastNameLabel?: string;
    submitLabel?: string;
    resubmitFormLabel?: string;
    pageLabel?: string;
    supportLink?: string;
    submitSuccessHeader?: string;
    submitSuccessDescription?: string;
    submitErrorHeader?: string;
    submitErrorDescription?: string;
    requiredFieldErrorMessage: string;
    invalidEmailErrorMessage: string;
  };
  refs: {
    formRef: any;
  };
}

type RequiredFieldErrorParams = {
  fieldLabel: string;
};

const style = {
  Wrapper: { ...AuthWrapper, "max-width": "600px" },
  Column: AuthColumn,
  HostBlock: HostBlock,

  ":host": {
    margin: "0 auto",
    width: "100%",
  },
  NameFieldWrapper: {
    display: "flex",
    gap: "var(--sl-spacing-medium)",
  },
  ContinueButton: { maxWidth: "169px" },
  ButtonsContainer: AuthButtonsContainer,
  SuccessAlertContainer: {
    "&::part(base)": {
      backgroundColor: "var(--sl-color-green-100)",
      borderTop: "none",
    },
  },
  ErrorAlertContainer: {
    "&::part(base)": {
      backgroundColor: "var(--sl-color-red-100)",
      borderTop: "none",
    },
  },
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

export function LeadFormView(props: LeadFormViewProps) {
  const { states, refs, callbacks, content } = props;

  if (states.error) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  const getRequiredFieldErrorMessage = ({
    fieldLabel,
  }: RequiredFieldErrorParams) =>
    intl.formatMessage(
      {
        id: "requiredFieldErrorMessage",
        defaultMessage: content.requiredFieldErrorMessage,
      },
      {
        fieldLabel,
      }
    );

  if (states.success) {
    return (
      <div class={sheet.classes.Wrapper} part="sqm-base">
        <style type="text/css">
          {vanillaStyle}
          {styleString}
        </style>
        <TextSpanView type="h3">{content.pageLabel}</TextSpanView>
        <sqm-form-message exportparts="success-icon">
          <b>{content.submitSuccessHeader}</b>
          <br />
          <div part="successalert-text">{content.submitSuccessDescription}</div>
        </sqm-form-message>
        <sl-button
          // AL: TODO add button to allow user to submit another form
          class={sheet.classes.ContinueButton}
          // onClick={callbacks.submitAnotherForm}
          loading={states.loading}
          exportparts="base: primarybutton-base"
          type="default"
        >
          {content.resubmitFormLabel}
        </sl-button>
      </div>
    );
  }

  return (
    <div class={sheet.classes.Wrapper} part="sqm-base">
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <TextSpanView type="h3">{content.pageLabel}</TextSpanView>
      <sl-form
        class={sheet.classes.Column}
        onSl-submit={callbacks.submit}
        ref={(el: HTMLFormElement) => (refs.formRef.current = el)}
        novalidate
      >
        {states.error && (
          <sl-alert
            exportparts="base: alert-base, icon:alert-icon"
            type="danger"
            class={sheet.classes.ErrorAlertContainer}
            open
          >
            <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
            <b>{content.submitErrorHeader}</b>
            <br />
            {intl.formatMessage(
              {
                id: "submitErrorDescription",
                defaultMessage: content.submitErrorDescription,
              },
              {
                supportLink: (
                  <a
                    target="_blank"
                    href={`mailto:advocate-support@impact.com`}
                  >
                    {content.supportLink}
                  </a>
                ),
              }
            )}
          </sl-alert>
        )}
        <div class={sheet.classes.NameFieldWrapper}>
          <sqm-lead-input-field
            style={{ width: "50%" }}
            field-label="First Name"
            field-name="firstName"
          ></sqm-lead-input-field>
          <sqm-lead-input-field
            style={{ width: "50%" }}
            field-label="Last Name"
            field-name="lastName"
          ></sqm-lead-input-field>
        </div>
        <sl-input
          exportparts="label: input-label, base: input-base"
          type="email"
          name="/email"
          label={content.emailLabel || "Email"}
          disabled={states.loading}
          required
          validationError={({ value }: { value: string }) => {
            if (!value) {
              return getRequiredFieldErrorMessage({
                fieldLabel: content.emailLabel || "Email",
              });
            }
            // this matches shoelace validation, but could be better
            if (!value.includes("@")) {
              return content.invalidEmailErrorMessage;
            }
          }}
          {...(states.leadFormState?.validationErrors?.email
            ? {
                class: sheet.classes.ErrorStyle,
                helpText:
                  states.leadFormState?.validationErrors?.email ||
                  content.requiredFieldErrorMessage,
              }
            : [])}
        ></sl-input>
        <input
          type="hidden"
          hidden
          name="/rsReferralCode"
          value={states.referralCode}
        ></input>
        {/* Must use inline styling to target slotted element here */}
        {content.formData}
        <div class={sheet.classes.ButtonsContainer}>
          <sl-button
            submit
            loading={states.loading}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            {content.submitLabel || "Register"}
          </sl-button>
        </div>
      </sl-form>
    </div>
  );
}
