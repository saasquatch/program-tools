import { h } from "@stencil/core";
import { Column, HostBlock, Wrapper } from "../../global/mixins";
import jss from "jss";
import preset from "jss-preset-default";

export interface PortalVerifyEmailViewProps {
  states: {
    error: string;
    loading: boolean;
    verified: boolean;
    resendSuccess: boolean;
  };
  callbacks: { submit: (event: any) => Promise<void> };
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

export function PortalVerifyEmailView(props: PortalVerifyEmailViewProps) {
  const { states, callbacks } = props;
  return (
    <div class={sheet.classes.Wrapper}>
      <style type="text/css">{styleString}</style>
      <sl-form class={sheet.classes.Column} onSl-submit={callbacks.submit}>
        {props.states.error && (
          <sqm-form-message type="error" exportparts="erroralert-icon">
            <div part="erroralert-text">{props.states.error}</div>
          </sqm-form-message>
        )}
        {props.states.resendSuccess && (
          <sl-alert type="success" open>
            <sl-icon slot="icon" name="check2-circle"></sl-icon>
            Your verification email has been resent successfully.
          </sl-alert>
        )}
        <sl-title>
          {states.verified ? "Email Verified" : "Please Verify Your Email"}
        </sl-title>
        <div>
          <sl-button
            submit
            loading={states.loading}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            {states.verified ? "Continue" : "Verify Email"}
          </sl-button>
        </div>
      </sl-form>
    </div>
  );
}
