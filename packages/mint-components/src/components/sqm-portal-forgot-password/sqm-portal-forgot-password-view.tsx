import { h } from "@stencil/core";
import {
  AuthButtonsContainer,
  AuthColumn,
  AuthWrapper,
} from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";
import { TextSpanView } from "../sqm-text-span/sqm-text-span-view";

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
    secondaryButton: any;
    messageSlot: any;
    emailLabel?: string;
    submitLabel?: string;
    successAlertText?: string;
  };
}

const style = {
  Wrapper: AuthWrapper,
  Column: { ...AuthColumn },
  ButtonsContainer: AuthButtonsContainer,

  SecondaryButton: {
    cursor: "pointer",
    width: "25%",
  },
};

const vanillaStyle = `
:host {
  display: block;
}
:host([hidden]): {
  display: none;
}
`;

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function PortalForgotPasswordView(props: PortalForgotPasswordViewProps) {
  const { states, callbacks, content } = props;
  return (
    <div class={sheet.classes.Wrapper} part="sqm-base">
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
          exportparts="label: input-label"
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
          <div class={sheet.classes.SecondaryButton}>
            {content.secondaryButton}
          </div>
        </div>
      </sl-form>
    </div>
  );
}
