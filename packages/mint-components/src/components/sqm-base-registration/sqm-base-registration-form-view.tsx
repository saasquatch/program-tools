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

export interface BaseRegistrationFormViewProps {
  states: {
    error: string;
    loading: boolean;
    hideInputs: boolean;
    // registrationFormState: RegistrationFormState;
    // loginPath: string;
  };
  callbacks: {
    submit: Function;
    setShowRegistrationForm: (next: boolean) => void;
    inputFunction: Function;
  };
  content: {
    googleButton?: VNode;
    formData?: VNode;
    terms?: VNode;
    secondaryButton?: VNode;
    emailLabel?: string;
    submitLabel?: string;
    pageLabel?: string;
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

  ButtonsContainer: {
    ...AuthButtonsContainer,
    gap: "var(--sl-spacing-medium)",
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

export function BaseRegistrationFormView(props: BaseRegistrationFormViewProps) {
  const { states, content, callbacks } = props;
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
          // {...(states.registrationFormState?.validationErrors?.email
          //   ? {
          //       class: sheet.classes.ErrorStyle,
          //       helpText:
          //         states.registrationFormState?.validationErrors?.email ||
          //         content.requiredFieldErrorMessage,
          //     }
          //   : [])}
        ></sl-input>
        <div class={sheet.classes.ButtonsContainer}>
          <sl-button
            // submit
            onClick={() => callbacks.setShowRegistrationForm(true)}
            loading={states.loading}
            exportparts="base: primarybutton-base"
            type="primary"
            style={{ margin: "0" }}
          >
            {content.submitLabel || "Register"}
          </sl-button>
          <sl-menu-divider style={{ margin: "0" }} />
          {content.googleButton}
        </div>
      </sl-form>
    </div>
  );
}
