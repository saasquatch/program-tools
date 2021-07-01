import { navigation } from "@saasquatch/component-boilerplate";
import { h } from "@stencil/core";

export interface LoginViewProps {
  states: {
    error: string;
    loading: boolean;
  };
  refs: {
    formRef: any;
  };
}

export function LoginView(props: LoginViewProps) {
  const { states, refs } = props;
  return (
    <div class="Wrapper Column">
      <sl-form
        class="Column"
        ref={(el: HTMLFormElement) => (refs.formRef.current = el)}
        id="login"
      >
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
        <a onClick={() => navigation.push("/reset")}>Forgot password?</a>
        <div>
          <sl-button
            submit
            loading={states.loading}
            exportparts="base: primarybutton-base"
            type="primary"
          >
            Login
          </sl-button>
          <sl-button type="text" onClick={() => navigation.push("/register")}>
            Sign up
          </sl-button>
        </div>
      </sl-form>
    </div>
  );
}
