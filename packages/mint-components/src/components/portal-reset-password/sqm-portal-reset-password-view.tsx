import { h } from "@stencil/core";

export interface PortalResetPasswordViewProps {
  states: {
    error: string;
    loading: boolean;
    reset: boolean;
    oobCodeValidating: boolean;
    oobCodeValid?: boolean;
  };
  callbacks: {
    submit: (event: any) => void;
    failed: () => void;
    gotoNextPage: () => void;
  };
}

export function PortalResetPasswordView(props: PortalResetPasswordViewProps) {
  const { states, callbacks } = props;

  if (states.reset) {
    return (
      <div class="Wrapper Column">
        <sqm-form-message exportparts="success-icon">
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
      <div class="Wrapper Column">
        <sqm-form-message type="error" exportparts="erroralert-icon">
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
    <div class="Wrapper Column">
      <sl-form class="Column" onSl-submit={callbacks.submit}>
        {props.states.error && (
          <sqm-form-message type="error" exportparts="erroralert-icon">
            <div part="erroralert-text">{props.states.error}</div>
          </sqm-form-message>
        )}
        <sl-title>Reset your password</sl-title>
        <sl-input
          exportparts="label: input-label"
          type="password"
          name="/password"
          label="Password"
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
            Reset Password
          </sl-button>
        </div>
      </sl-form>
    </div>
  );
}
