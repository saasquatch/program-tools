import { h } from "@stencil/core";

export interface PortalResetPasswordViewProps {
  states: {
    error: string;
    loading: boolean;
    reset: boolean;
  };
  callbacks: {
    submit: (node: any) => void;
  };
}

export function PortalResetPasswordView(props: PortalResetPasswordViewProps) {
  const { states, callbacks } = props;
  return (
    <div class="Wrapper Column">
      <sl-form class="Column" onSl-submit={callbacks.submit}>
        {props.states.error && (
          <sqm-form-message type="error" exportparts="erroralert-icon">
            <div part="erroralert-text">{props.states.error}</div>
          </sqm-form-message>
        )}
        <sl-title>
          {states.reset ? "Password Reset" : "Reset your password"}
        </sl-title>
        {!states.reset && (
          <sl-input
            exportparts="label: input-label"
            type="password"
            name="/password"
            label="Password"
            disabled={states.loading}
            required
          ></sl-input>
        )}
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
