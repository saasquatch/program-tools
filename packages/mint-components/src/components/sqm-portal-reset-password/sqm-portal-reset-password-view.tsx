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
    oobCodeValidating: boolean;
    oobCodeValid: boolean;
  };
  callbacks: {
    submit: (node: any) => void;
    gotoNextPage: () => void;
    failed: () => void;
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

  Banner: {
    "&::part(erroralert-base)": {
      margin: "15px 0px",
    },
  },

  CodeError: {
    "&::part(erroralert-base)": {
      "margin-bottom": "15px",
    },
  },

  CodeSuccess: {
    "&::part(successalert-base)": {
      "margin-bottom": "15px",
    },
  },
};

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function PortalResetPasswordView(props: PortalResetPasswordViewProps) {
  const { states, callbacks } = props;

  if (states.reset) {
    return (
      <div class={`${sheet.classes.Wrapper} ${sheet.classes.Column}`}>
        <style type="text/css">{styleString}</style>
        <sqm-form-message
          class={sheet.classes.CodeSuccess}
          exportparts="success-icon"
        >
          <div part="successalert-text">
            Your password has been reset and you are being redirected. If you
            are not redirected, please click Continue.
          </div>
        </sqm-form-message>
        <div>
          <sl-button
            onClick={callbacks.gotoNextPage}
            loading={states.loading}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            Continue
          </sl-button>
        </div>
      </div>
    );
  }

  if (states.oobCodeValidating) {
    return <div />;
  }

  if (!states.oobCodeValid) {
    return (
      <div class={`${sheet.classes.Wrapper} ${sheet.classes.Column}`}>
        <style type="text/css">{styleString}</style>
        <sqm-form-message
          class={sheet.classes.CodeError}
          type="error"
          exportparts="erroralert-icon"
        >
          <div part="erroralert-text">
            The password reset code is invalid or has expired, please try again.
          </div>
        </sqm-form-message>
        <div>
          <sl-button
            onClick={callbacks.failed}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            Continue
          </sl-button>
        </div>
      </div>
    );
  }

  return (
    <div class={sheet.classes.Wrapper}>
      <style type="text/css">{styleString}</style>
      <sl-form class={sheet.classes.Column} onSl-submit={callbacks.submit}>
        <sl-title>
          {states.reset ? "Password Reset" : "Reset your password"}
        </sl-title>
        {props.states.error && (
          <sqm-form-message
            type="error"
            class={sheet.classes.Banner}
            exportparts="erroralert-icon"
          >
            <div part="erroralert-text">{props.states.error}</div>
          </sqm-form-message>
        )}
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
