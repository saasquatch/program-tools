import { h } from "@stencil/core";

export interface PortalRegisterViewProps {
  states: {
    error: string;
    loading: boolean;
  };
  callbacks: {
    submit;
  };
}

export function PortalRegisterView(props: PortalRegisterViewProps) {
  const { states, callbacks } = props;
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
          label="Email"
          disabled={states.loading}
          required
        ></sl-input>
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
            Register
            {/* slot button text */}
          </sl-button>
          {/* slot Sign in button */}
        </div>
      </sl-form>
    </div>
  );
}
