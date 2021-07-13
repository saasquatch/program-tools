import { h } from "@stencil/core";

export interface PortalRegisterViewProps {
  states: {
    error: string;
    loading: boolean;
  };
  callbacks: {
    submit;
  };
  content: {
    formData?: any;
    secondaryButton?: any;
    emailLabel?: string;
    passwordLabel?: string;
    submitLabel?: string;
  };
}

export function PortalRegisterView(props: PortalRegisterViewProps) {
  const { states, callbacks, content } = props;
  return (
    <div class="Wrapper Column">
      <sl-form class="Column" onSl-submit={callbacks.submit}>
        {props.states.error && (
          <sqm-form-message type="error" exportparts="erroralert-icon">
            <div part="erroralert-text">{props.states.error}</div>
          </sqm-form-message>
        )}
        <sl-input
          exportparts="label: input-label"
          type="email"
          name="/email"
          label={content.emailLabel || "Email"}
          disabled={states.loading}
          required
        ></sl-input>
        <sl-input
          exportparts="label: input-label"
          type="password"
          name="/password"
          label={content.passwordLabel || "Password"}
          disabled={states.loading}
          required
        ></sl-input>
        {content.formData}
        <div>
          <sl-button
            submit
            loading={states.loading}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            {content.submitLabel || "Register"}
          </sl-button>
          {content.secondaryButton}
        </div>
      </sl-form>
    </div>
  );
}
