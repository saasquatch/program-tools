import { h } from "@stencil/core";
import {
  AuthButtonsContainer,
  AuthColumn,
  AuthWrapper,
} from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";
import { TextSpanView } from "../sqm-text-span/sqm-text-span-view";
import { navigation } from "@saasquatch/component-boilerplate";

export interface PortalForgotPasswordViewProps {
  states: {
    error: string;
    loading: boolean;
    success: boolean;
    loginPath: string;
  };
  callbacks: {
    submit: (event: any) => Promise<void>;
  };
  content: {
    messageSlot: any;
    emailLabel?: string;
    submitLabel?: string;
    successAlertText?: string;
    loginText?: string;
    backgroundColor?: string;
    borderRadius?: string;
    border?: string;
    textColor?: string;
  };
  // styles?: {
  //   backgroundColor?: string;
  //   borderRadius?: string;
  //   border?: string;
  //   textColor?: string;
  // };
}

const vanillaStyle = `
:host {
  display: block;
}
:host([hidden]): {
  display: none;
}
`;

export function PortalForgotPasswordView(props: PortalForgotPasswordViewProps) {
  const { states, callbacks, content } = props;

  const style = {
    FormWrapper: {
      ...AuthWrapper,
      background: content.backgroundColor || "var(--sqm-portal-background)",
      borderRadius: content.borderRadius || "var(--sqm-border-radius-normal)",
      border:
        content.border ||
        "var(--sqm-border-thickness) solid var(--sqm-border-color)",
    },
    Column: { ...AuthColumn },
    ButtonsContainer: AuthButtonsContainer,

    SecondaryButton: {
      margin: "auto",
      display: "block",
      cursor: "pointer",
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  return (
    <div class={sheet.classes.FormWrapper} part="sqm-base">
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <TextSpanView type="h3">{content.messageSlot}</TextSpanView>
      <sl-form class={sheet.classes.Column} onSl-submit={callbacks.submit}>
        {props.states.error && (
          <sqm-form-message type="error" exportparts="erroralert-icon">
            <div part="erroralert-text">{props.states.error}</div>
          </sqm-form-message>
        )}
        {props.states.success && (
          <sqm-form-message type="success" exportparts="successalert-icon">
            <div part="successalert-text">{content.successAlertText}</div>
          </sqm-form-message>
        )}
        <sl-input
          exportparts="label: input-label, base: input-base"
          type="email"
          name="/email"
          label={content.emailLabel || "Email"}
          disabled={states.loading}
          required
        ></sl-input>
        <div class={sheet.classes.ButtonsContainer}>
          <sl-button
            submit
            loading={states.loading}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            {content.submitLabel || "Reset Password"}
          </sl-button>
          {/* <div class={sheet.classes.SecondaryButton}>
            {content.secondaryButton}
          </div> */}
          <sl-button
            type="secondary"
            exportparts="base: secondarybutton-base"
            class={sheet.classes.SecondaryButton}
            disabled={states.loading}
            onClick={() => navigation.push(states.loginPath)}
          >
            {content.loginText}
          </sl-button>
        </div>
      </sl-form>
    </div>
  );
}
