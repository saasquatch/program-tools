import { h } from "@stencil/core";
import { Column, HostBlock, Wrapper } from "../../global/mixins";
import jss from "jss";
import preset from "jss-preset-default";

export interface PortalForgotPasswordViewProps {
  states: {
    error: string;
    loading: boolean;
    success: boolean;
  };
  callbacks: {
    submit: (event: any) => Promise<void>;
  };
  content: {
    secondaryButton: any;
    messageSlot: any;
    emailLabel?: string;
    submitLabel?: string;
  };
}

const style = {
  Wrapper: { ...Wrapper, ...Column },
  Column: Column,
  HostBlock: HostBlock,

  ":host": {
    margin: "0 auto",
    width: "100%",
  },
};

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function PortalForgotPasswordView(props: PortalForgotPasswordViewProps) {
  const { states, callbacks, content } = props;
  return (
    <div class={sheet.classes.Wrapper}>
      <style type="text/css">{styleString}</style>
      <sl-form class={sheet.classes.Column} onSl-submit={callbacks.submit}>
        {props.states.error && (
          <sqm-form-message type="error" exportparts="erroralert-icon">
            <div part="erroralert-text">{props.states.error}</div>
          </sqm-form-message>
        )}
        {props.states.success && (
          <sqm-form-message type="success" exportparts="successalert-icon">
            <div part="successalert-text">
              If an account with that email exists, a password reset email will
              be sent.
            </div>
          </sqm-form-message>
        )}
        {content.messageSlot}
        <sl-input
          exportparts="label: input-label"
          type="email"
          name="/email"
          label={content.emailLabel || "Email"}
          disabled={states.loading}
          required
        ></sl-input>
        <div>
          <sl-button
            submit
            loading={states.loading}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            {content.submitLabel || "Reset Password"}
          </sl-button>
          {content.secondaryButton}
        </div>
      </sl-form>
    </div>
  );
}
