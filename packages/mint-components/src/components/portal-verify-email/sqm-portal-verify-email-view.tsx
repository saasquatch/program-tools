import { h } from "@stencil/core";

export interface PortalVerifyEmailViewProps {
  states: {
    error: string;
    loading: boolean;
    verified: boolean;
  };
  callbacks: { submit: (event: any) => Promise<void> };
}

export function PortalVerifyEmailView(props: PortalVerifyEmailViewProps) {
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
