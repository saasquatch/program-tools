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

export interface LeadFormViewProps {
  states: {
    error: string;
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
    pageLabel?: string;
    requiredFieldErrorMessage: string;
    invalidEmailErrorMessage: string;
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

export function LeadFormView(props: LeadFormViewProps) {
  const { states, refs, callbacks, content } = props;

  if (states.error) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
          <sqm-form-message type="error" exportparts="erroralert-icon">
            <div part="erroralert-text">{props.states.error}</div>
          </sqm-form-message>
        )}

        <sl-input
          exportparts="label: input-label, base: input-base"
          type="text"
          name="/lastName"
          label={content.firstNameLabel || "First Name"}
          disabled={states.loading}
          required
          validationError={({ value }: { value: string }) => {
            if (!value) {
              return content.requiredFieldErrorMessage;
            }
          }}
          {...(states.leadFormState?.validationErrors?.firstName
            ? {
                class: sheet.classes.ErrorStyle,
                helpText:
                  states.leadFormState?.validationErrors?.firstName ||
                  content.requiredFieldErrorMessage,
              }
            : [])}
        ></sl-input>
        <sl-input
          exportparts="label: input-label, base: input-base"
          type="text"
          name="/lastName"
          label={content.lastNameLabel || "Last Name"}
          disabled={states.loading}
          required
          validationError={({ value }: { value: string }) => {
            if (!value) {
              return content.requiredFieldErrorMessage;
            }
          }}
          {...(states.leadFormState?.validationErrors?.lastName
            ? {
                class: sheet.classes.ErrorStyle,
                helpText:
                  states.leadFormState?.validationErrors?.lastName ||
                  content.requiredFieldErrorMessage,
              }
            : [])}
        ></sl-input>
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
      </sl-form>
    </div>
  );
}
