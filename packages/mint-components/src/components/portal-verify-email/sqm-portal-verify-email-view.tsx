import { h } from "@stencil/core";

export interface PortalVerifyEmailViewProps {
  states: {
    error: string;
    loading: boolean;
    verified: boolean;
  };
  callbacks: {
    gotoNextPage: () => void;
    failed: () => void;
  };
}

export function PortalVerifyEmailView(props: PortalVerifyEmailViewProps) {
  const { states, callbacks } = props;

  if (states.verified) {
    return (
      <div class="Wrapper Column">
        <sqm-form-message exportparts="success-icon">
          <div part="successalert-text">
            Your email has been verified and you are being redirected. If you
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

  if (props.states.error) {
    return (
      <div class="Wrapper Column">
        <sqm-form-message type="error" exportparts="erroralert-icon">
          <div part="erroralert-text">
            The email verification code is invalid or has expired, please try
            again.
          </div>
        </sqm-form-message>
        <div>
          <sl-button
            onClick={callbacks.failed}
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
}
