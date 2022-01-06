import { h } from "@stencil/core";
import {
  AuthButtonsContainer,
  AuthColumn,
  AuthWrapper
} from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";
import { TextSpanView } from "../sqm-text-span/sqm-text-span-view";

export interface PortalLoginViewProps {
  states: {
    error: string;
    loading: boolean;
    forgotPasswordPath: string,
    registerPath: string,
  };
  callbacks: {
    submit: (event: any) => Promise<void>;
  };
  content: {
    forgotPasswordButton?: any;
    secondaryButton?: any;
    emailLabel?: string;
    passwordLabel?: string;
    submitLabel?: string;
    pageLabel?: string;
  };
}

const style = {
  Wrapper: AuthWrapper,
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

export function PortalLoginView(props: PortalLoginViewProps) {
  const { states, callbacks, content } = props;
  return (
    <div class={sheet.classes.Wrapper}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <TextSpanView type="h3">{content.pageLabel}</TextSpanView>
      <sl-form class={sheet.classes.Column} onSl-submit={callbacks.submit}>
        {props.states.error && (
          <sqm-form-message type="error" exportparts="erroralert-icon">
            <div part="erroralert-text">{props.states.error}</div>
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
        <div>
          <sl-input
            exportparts="label: input-label"
            type="password"
            name="/password"
            label={content.passwordLabel || "Password"}
            disabled={states.loading}
            required
          ></sl-input>
          <div class={sheet.classes.ForgotButtonContainer}>
            {content.forgotPasswordButton}
          </div>
        </div>
        <div class={sheet.classes.ButtonsContainer}>
          <sl-button
            submit
            loading={states.loading}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            {content.submitLabel || "Login"}
          </sl-button>
          {content.secondaryButton}
        </div>
      </sl-form>
    </div>
  );
}
