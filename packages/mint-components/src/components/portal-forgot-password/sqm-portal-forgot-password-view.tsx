import { h } from "@stencil/core";

export interface PortalForgotPasswordViewProps {
  states: {
    error: string;
    loading: boolean;
    resendSuccess : boolean;
  };
  callbacks: {
    submit: (event: any) => Promise<void>;
  };
}

export function PortalForgotPasswordView(props: PortalForgotPasswordViewProps) {
  const { states, callbacks } = props;
  return (
    <div class="Wrapper Column">
      <sl-form class="Column" onSl-submit={callbacks.submit}>
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
        <sl-input
          exportparts="label: input-label"
          type="email"
          name="/email"
          label="Email"
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
            Request Password Reset
          </sl-button>
        </div>
      </sl-form>
    </div>
  );
}
