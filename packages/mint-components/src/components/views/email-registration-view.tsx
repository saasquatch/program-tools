import { h, VNode } from "@stencil/core";
import {
  AuthButtonsContainer,
  AuthColumn,
  AuthWrapper,
  ErrorStyles,
  gap,
} from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";
import { RegistrationFormState } from "../sqm-portal-registration-form/useRegistrationFormState";

export interface EmailRegistrationViewProps {
  states: {
    error: string;
    loading: boolean;
    registrationFormState?: RegistrationFormState; // TODO HOOK - check if this type is good
  };
  callbacks: {
    submit: (event: any) => Promise<void>;
  };
  content: {
    hideBorder?: boolean;
    fraudErrorMessage?: string;
    fraudErrorMessageTitle?: string;
    emailLabel?: string;
    firstNameLabel?: string;
    lastNameLabel?: string;
    registerLabel?: string;
    includeName?: boolean;
    topSlot?: VNode;
    bottomSlot?: VNode;
    invalidEmailErrorMessage: string;
    requiredFieldErrorMessage: string;
    paddingTop?: string;
    paddingRight?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    backgroundColor?: string;
  };
}

const style = {
  Wrapper: {
    ...AuthWrapper,
    ...gap({ direction: "column", size: "var(--sl-spacing-small)" }),
  },
  Column: AuthColumn,
  ForgotButtonContainer: {
    display: "inline",
    cursor: "pointer",
    "font-size": "13px",
    "font-weight": "600",
    color: "#AAAAAA",
    margin: "0",
  },
  ButtonsContainer: AuthButtonsContainer,
  ErrorStyle: ErrorStyles,
};

const vanillaStyle = `
:host {
  display: block;
}
:host([hidden]): {
  display: none;
}
a svg {
  margin: 0 auto;
  display: block;
}
`;

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function EmailRegistrationView(props: EmailRegistrationViewProps) {
  const { states, callbacks, content } = props;

  const getErrorMessage = (
    error: string,
    fraudErrorMessage: string,
    fraudErrorMessageTitle: string
  ) => {
    return error === "FRAUD" ? (
      <sqm-form-message type="error" exportparts="erroralert-icon">
        <b>{fraudErrorMessageTitle}</b>
        <div part="erroralert-text">{fraudErrorMessage}</div>
      </sqm-form-message>
    ) : (
      <sqm-form-message type="error" exportparts="erroralert-icon">
        <div part="erroralert-text">{error}</div>
      </sqm-form-message>
    );
  };

  const emailValidationRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <div
      class={sheet.classes.Wrapper}
      style={{
        border: `${content.hideBorder ? "none" : "1px solid #eaeaea"}`,
        backgroundColor: content.backgroundColor,
        "padding-top": `var(--sl-spacing-${content.paddingTop})`,
        "padding-right": `var(--sl-spacing-${content.paddingRight})`,
        "padding-bottom": `var(--sl-spacing-${content.paddingBottom})`,
        "padding-left": `var(--sl-spacing-${content.paddingLeft})`,
      }}
    >
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      {content.topSlot}

      <sl-form class={sheet.classes.Column} onSl-submit={callbacks.submit}>
        {props.states.error &&
          getErrorMessage(
            props.states.error,
            props.content.fraudErrorMessage,
            props.content.fraudErrorMessageTitle
          )}
        {content.includeName && (
          <sl-input
            exportparts="label: input-label, base: input-base"
            type="name"
            name="/firstName"
            label={content.firstNameLabel || "First Name"}
            disabled={states.loading}
          ></sl-input>
        )}
        {content.includeName && (
          <sl-input
            exportparts="label: input-label, base: input-base"
            type="name"
            name="/lastName"
            label={content.lastNameLabel || "Last Name"}
            disabled={states.loading}
          ></sl-input>
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
            if (!value.match(emailValidationRegex)) {
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
        <div
          class={sheet.classes.ButtonsContainer}
          style={{
            paddingTop: `${
              content.includeName ? "var(--sl-spacing-medium)" : "0"
            }`,
          }}
        >
          <sl-button
            submit
            loading={states.loading}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            {content.registerLabel || "Registration"}
          </sl-button>
        </div>
      </sl-form>
      {content.bottomSlot}
    </div>
  );
}
