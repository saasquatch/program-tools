import { navigation } from "@saasquatch/component-boilerplate";
import { h } from "@stencil/core";

export interface PortalRegisterViewProps {
  states: {
    error: string;
    loading: boolean;
  };
  refs: {
    formRef: any;
  };
}

export function PortalRegisterView(props: PortalRegisterViewProps) {
  const { states, refs } = props;
  return (
    <div class="Wrapper Column">
      <sl-form class="Column" ref={refs.formRef} id="portal-register">
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
          </sl-button>
          <sl-button type="text" onClick={() => navigation.push("/login")}>
            Sign in
          </sl-button>
        </div>
      </sl-form>
    </div>
  );
}
