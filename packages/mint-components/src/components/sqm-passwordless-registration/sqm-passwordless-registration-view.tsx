import { h, VNode } from "@stencil/core";
import {
  AuthButtonsContainer,
  AuthColumn,
  AuthWrapper,
} from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";
import { PoweredByImg } from "../sqm-portal-footer/PoweredByImg";

export interface PasswordlessRegistrationViewProps {
  states: {
    error: string;
    loading: boolean;
  };
  callbacks: {
    submit: (event: any) => Promise<void>;
  };
  content: {
    emailLabel?: string;
    firstNameLabel?: string;
    lastNameLabel?: string;
    registerLabel?: string;
    includeName?: boolean;
    hidePoweredBy?: boolean;
    topSlot?: VNode;
    bottomSlot?: VNode;
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

export function PasswordlessRegistrationView(
  props: PasswordlessRegistrationViewProps
) {
  const { states, callbacks, content } = props;
  return (
    <div class={sheet.classes.Wrapper}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      {content.topSlot}

      <sl-form class={sheet.classes.Column} onSl-submit={callbacks.submit}>
        {props.states.error && (
          <sqm-form-message type="error" exportparts="erroralert-icon">
            <div part="erroralert-text">{props.states.error}</div>
          </sqm-form-message>
        )}

        {content.includeName && (
          <sl-input
            exportparts="label: input-label"
            type="name"
            name="/name"
            label={content.firstNameLabel || "First Name"}
            disabled={states.loading}
            required={}
          ></sl-input>
        )}
        {content.includeName && (
          <sl-input
            exportparts="label: input-label"
            type="name"
            name="/name"
            label={content.lastNameLabel || "Last Name"}
            disabled={states.loading}
            required
          ></sl-input>
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
            {content.registerLabel || "Registration"}
          </sl-button>
        </div>
      </sl-form>
      {content.bottomSlot}
      {!content.hidePoweredBy && (
        <a target="_blank" href={"www.saasquatch.com"}>
          <PoweredByImg />
        </a>
      )}
    </div>
  );
}
