import { h } from "@stencil/core";

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
  };
}

export function PortalEmailVerificationView(
  props: PortalEmailVerificationViewProps
) {
  const {
    states,
    callbacks,
    content: { email },
  } = props;
  return (
    <div class="Wrapper Column">
      <sl-form class="Column" onSl-submit={callbacks.submit}>
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

        <h2>Verify Your Email</h2>
        <p>
          A verification email was sent to {email}. Please verify your email to
          continue to the portal.
        </p>
        <div>
          <sl-button
            submit
            loading={states.loading}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            Re-send Email
          </sl-button>
        </div>
      </sl-form>
    </div>
  );
}
