import { h } from "@stencil/core";

export interface PortalForgotPasswordViewProps {
  states: {
    error: string;
    loading: boolean;
  };
  refs: {
    formRef: any;
  };
}

export function PortalForgotPasswordView(props: PortalForgotPasswordViewProps) {
  const { states, refs } = props;
  return (
    <div class="Wrapper Column">
      <sl-form class="Column" ref={refs.formRef} id="portal-email-verification">
        {props.states.error && (
          <sqm-form-message type="error" exportparts="erroralert-icon">
            <div part="erroralert-text">{props.states.error}</div>
          </sqm-form-message>
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
