import { h } from "@stencil/core";
import { Column, HostBlock, Wrapper } from "../../global/mixins";
import jss from "jss";
import preset from "jss-preset-default";

export interface PortalResetPasswordViewProps {
  states: {
    error: string;
    loading: boolean;
    reset: boolean;
    confirmPassword?: boolean;
  };
  callbacks: {
    submit: (node: any) => void;
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

  InputContainer: {
    "& > :not(:last-child)": {
      "margin-bottom": "20px",
    },
  },
};

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function PortalResetPasswordView(props: PortalResetPasswordViewProps) {
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
        <sl-title>
          {states.reset ? "Password Reset" : "Reset your password"}
        </sl-title>
        {!states.reset &&
          (states.confirmPassword ? (
            <div class={sheet.classes.InputContainer}>
              <sl-input
                exportparts="label: input-label"
                type="password"
                name="/password"
                label="Password"
                disabled={states.loading}
                required
              ></sl-input>
              <sl-input
                exportparts="label: input-label"
                type="password"
                name="/confirmPassword"
                label="Confirm Password"
                disabled={states.loading}
                required
              ></sl-input>
            </div>
          ) : (
            <sl-input
              exportparts="label: input-label"
              type="password"
              name="/password"
              label="Password"
              disabled={states.loading}
              required
            ></sl-input>
          ))}
        <div>
          <sl-button
            submit
            loading={states.loading}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            {states.reset ? "Continue" : "Reset Password"}
          </sl-button>
        </div>
      </sl-form>
    </div>
  );
}
