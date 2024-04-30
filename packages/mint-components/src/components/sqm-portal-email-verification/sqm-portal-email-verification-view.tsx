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
    isVerified?: boolean;
    loadingVerification?: boolean;
    countdown?: number;
  };
  callbacks: {
    submit: (event: any) => Promise<void>;
  };
  content: {
    email: string;
    verifyMessage: string;
    emailVerificationHeader: string;
    resendEmailButtonText: string;
    verificationStatusMessage?: string;
    verificationLoadingMessage?: string;
    verificationResentMessage?: string;
  };
}

const style = {
  Wrapper: AuthWrapper,
  Column: { ...AuthColumn },
  ButtonLink: {
    fontSize: "14px",
    color: "var(--sl-color-primary-500)",
    display: "inline-block !important",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  ButtonLinkLoading: {
    fontSize: "14px",
    color: "var(--sl-color-gray-500)",
    opacity: "0.6",
    display: "inline-block !important",
    textDecoration: "underline",
    "&:hover": {
      cursor: "not-allowed",
    },
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
      verificationStatusMessage,
      verificationLoadingMessage,
      verificationResentMessage,
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
            <div part="successalert-text">{verificationResentMessage}</div>
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
        {
          <p style={{ color: "var(--sl-color-gray-500)", fontSize: "14px" }}>
            {intl.formatMessage(
              {
                id: `verificationStatus`,
                defaultMessage: states.loadingVerification
                  ? verificationLoadingMessage + " {countdown}"
                  : verificationStatusMessage,
              },
              {
                countdown: states.loadingVerification ? (
                  <sl-spinner></sl-spinner>
                ) : (
                  states.countdown
                ),
              }
            )}
          </p>
        }
        <a
          class={
            states.loading
              ? sheet.classes.ButtonLinkLoading
              : sheet.classes.ButtonLink
          }
          onClick={callbacks.submit}
        >
          {resendEmailButtonText}
        </a>
      </sl-form>
    </div>
  );
}
