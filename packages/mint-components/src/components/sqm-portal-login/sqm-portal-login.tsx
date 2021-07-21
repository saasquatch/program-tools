import { isDemo, navigation } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { PortalLoginView, PortalLoginViewProps } from "./sqm-portal-login-view";
import { usePortalLogin } from "./usePortalLogin";

/**
 * @uiName Portal Login
 */
@Component({
  tag: "sqm-portal-login",
  shadow: true,
})
export class PortalLogin {
  @State()
  ignored = true;

  @Prop()
  nextPage = "/";

  @Prop()
  nextPageUrlParameter = "nextPage";

  @Prop()
  emailLabel = "Email";

  @Prop()
  passwordLabel = "Password";

  @Prop()
  submitLabel = "Sign In";

  @Prop()
  pageLabel : string = "Sign in to your account";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {

    const { states, callbacks } = isDemo()
      ? useLoginDemo(this)
      : usePortalLogin(this);
    const content = {
      forgotPasswordButton: (
        <slot name="forgotPassword">
          <a
            onClick={() => navigation.push("/forgotPassword")}
          >
            Forgot Password?
          </a>
        </slot>
      ),
      secondaryButton: (
        <slot name="secondaryButton">
          <sl-button
            type="text"
            disabled={states.loading}
            onClick={() => navigation.push("/register")}
          >
            Register
          </sl-button>
        </slot>
      ),
      emailLabel: this.emailLabel,
      passwordLabel: this.passwordLabel,
      submitLabel: this.submitLabel,
      pageLabel: this.pageLabel,
    };
    return (
      <PortalLoginView
        states={states}
        callbacks={callbacks}
        content={content}
      ></PortalLoginView>
    );
  }
}
function useLoginDemo({
  nextPage,
  nextPageUrlParameter,
}): Partial<PortalLoginViewProps> {
  return {
    states: { error: "", loading: false },
    callbacks: {
      submit: async (_event) => {
        nextPage;
        nextPageUrlParameter;
      },
    },
  };
}
