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
import { GoogleRegistrationFormState } from "./useGoogleRegistrationFormState";

export interface PortalGoogleRegistrationFormViewProps {
  states: {
    isGoogle: boolean;
    error: string;
    loading: boolean;
    confirmPassword: boolean;
    hideInputs: boolean;
    registrationFormState?: GoogleRegistrationFormState;
    enablePasswordValidation?: boolean;
    loginPath: string;
  };
  callbacks: {
    submit: Function;
    inputFunction: Function;
    setShowRegistrationForm: (next: boolean) => void;
    handleGoogleInit: (res: any) => void;
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
    confirmPasswordLabel?: string;
    networkErrorMessage?: string;
    passwordMismatchErrorMessage?: string;
    invalidEmailErrorMessage?: string;
    formDisabledErrorMessage?: string;
    requiredFieldErrorMessage?: string;
    meetsRequirementsText?: string;
    doesNotMeetRequirementsText?: string;
    minErrorText?: string;
    uppercaseErrorText?: string;
    lowercaseErrorText?: string;
    hasErrorText?: string;
  };
  // slots: {
  //   conditionalRegistrationFields?: VNode;
  // };
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

export function PortalGoogleRegistrationFormView(
  props: PortalGoogleRegistrationFormViewProps
) {
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
        {states.registrationFormState?.disabled ? (
          <sqm-form-message type="error" exportparts="erroralert-icon">
            <div part="erroralert-text">
              {states.registrationFormState.disabledMessage}
            </div>
          </sqm-form-message>
        ) : (
          states.error && (
            <sqm-form-message type="error" exportparts="erroralert-icon">
              <div part="erroralert-text">{props.states.error}</div>
            </sqm-form-message>
          )
        )}
        {/* Must use inline styling to target slotted element here */}
        {content.formData}
        {!states.hideInputs && (
          <sl-input
            exportparts="label: input-label, base: input-base"
            type="email"
            name="/email"
            label={content.emailLabel || "Email"}
            disabled={states.loading || states.registrationFormState?.disabled}
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
            {...(states.registrationFormState?.initialData?.email
              ? {
                  value: states.registrationFormState?.initialData?.email,
                }
              : {})}
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
        {!states.isGoogle && !states.hideInputs && (
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
        )}
        {!states.isGoogle && content.passwordField}
        {!states.isGoogle && !states.hideInputs && states.confirmPassword && (
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
                  class: sheet.classes.ErrorStyle,
                  helpText:
                    states.registrationFormState?.validationErrors
                      ?.confirmPassword || content.requiredFieldErrorMessage,
                }
              : [])}
          ></sl-input>
        )}
        {content.terms}
        <div class={sheet.classes.ButtonsContainer}>
          <sl-button
            submit
            loading={states.loading}
            disabled={states.registrationFormState?.disabled}
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
