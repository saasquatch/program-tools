import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, State } from "@stencil/core";
import { LoginView, LoginViewProps } from "./sqm-portal-login-view";
import { usePortalLogin } from "./usePortalLogin";

/**
 * @uiName Login
 */
@Component({
  tag: "sqm-portal-login",
  // styleUrl: "stn-login.scss",
  shadow: true,
})
export class Login {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, refs } =
      false && isDemo() ? useLoginDemo() : usePortalLogin();
    return <LoginView states={states} refs={refs} />;
  }
}
function useLoginDemo(): LoginViewProps {
  return {
    states: { error: "", loading: false },
    refs: { formRef: {} },
  };
}
