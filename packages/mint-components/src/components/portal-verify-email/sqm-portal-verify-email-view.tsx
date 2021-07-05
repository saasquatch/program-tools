import { navigation } from "@saasquatch/component-boilerplate";
import { h } from "@stencil/core";

export interface PortalVerifyEmailViewProps {
  states: {
    error: string;
    loading: boolean;
    verified: boolean;
  };
  callbacks: {
    verify: () => void;
  };
}

export function PortalVerifyEmailView(props: PortalVerifyEmailViewProps) {
  const { states, callbacks } = props;
  return (
    <div class="Wrapper Column">
      <sl-form class="Column" id="portal-verify-email">
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
            onClick={
              states.verified
                ? () => navigation.push("/portal")
                : callbacks.verify
            }
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
