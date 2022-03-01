import { h } from "@stencil/core";
import { intl } from "../../global/global";
import { AuthColumn, AuthWrapper } from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";
import { TextSpanView } from "../sqm-text-span/sqm-text-span-view";

export interface PortalEmailVerificationViewProps {
  states: {
    error: string;
    loading: boolean;
    success: boolean;
  };
  callbacks: {
    submit: (event: any) => Promise<void>;
  };
  content: {
    email: string;
    verifyMessage: string;
    emailVerificationHeader: string;
    resendEmailButtonText: string;
  };
}

const style = {
  Wrapper: AuthWrapper,
  Column: { ...AuthColumn },
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

export function PortalEmailVerificationView(
  props: PortalEmailVerificationViewProps
) {
  const {
    states,
    callbacks,
    content: {
      email,
      verifyMessage,
      emailVerificationHeader,
      resendEmailButtonText,
    },
  } = props;
  return (
    <div class={sheet.classes.Wrapper}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <TextSpanView type="h3">{emailVerificationHeader}</TextSpanView>
      <sl-form class={sheet.classes.Column} onSl-submit={callbacks.submit}>
        {props.states.error && (
          <sqm-form-message type="error" exportparts="erroralert-icon">
            <div part="erroralert-text">{props.states.error}</div>
          </sqm-form-message>
        )}
        {props.states.success && (
          <sqm-form-message type="success" exportparts="successalert-icon">
            <div part="successalert-text">
              Your verification email has been resent successfully
            </div>
          </sqm-form-message>
        )}

        <TextSpanView type="p">
          {intl.formatMessage(
            {
              id: "verifyMessage",
              defaultMessage: verifyMessage,
            },
            {
              email: (
                <span style={{ fontWeight: "var(--sl-font-weight-semibold)" }}>
                  {email}
                </span>
              ),
            }
          )}
        </TextSpanView>
        <sl-button
          submit
          loading={states.loading}
          exportparts="base: primarybutton-base"
          type="primary"
        >
          {resendEmailButtonText}
        </sl-button>
      </sl-form>
    </div>
  );
}
