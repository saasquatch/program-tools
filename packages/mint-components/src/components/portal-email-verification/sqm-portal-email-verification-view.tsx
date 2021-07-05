import { h } from "@stencil/core";

export interface PortalEmailVerificationViewProps {
  states: {
    error: string;
    loading: boolean;
  };
  refs: {
    formRef: any;
  };
}

export function PortalEmailVerificationView(
  props: PortalEmailVerificationViewProps
) {
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
            Request Verification
          </sl-button>
        </div>
      </sl-form>
    </div>
  );
}
