import { isDemo, navigation } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { PortalLoginView, PortalLoginViewProps } from "./sqm-portal-login-view";
import { usePortalLogin } from "./usePortalLogin";

/**
 * @uiName Microsite Login
 */
@Component({
  tag: "sqm-portal-login",
  shadow: true,
})
export class PortalLogin {
  @State()
  ignored = true;

  /**
   * Redirect participants to this page after they successfully login.
   *
   * @uiName Login redirect
   * @uiWidget pageSelect
   */
  @Prop()
  nextPage: string = "/";

  /**
   * @uiName Email field label
   */
  @Prop()
  emailLabel: string = "Email";

  /**
   * @uiName Password field label
   */
  @Prop()
  passwordLabel: string = "Password";

  /**
   * @uiName Submit button text
   */
  @Prop()
  submitLabel: string = "Sign In";

  /**
   * Redirect participants to this page to reset their password
   * @uiName Forgot password redirect
   * @uiWidget pageSelect
   */
  @Prop() forgotPasswordPath: string = "/forgotPassword";

  /**
   * @uiName Forgot password text
   */
  @Prop()
  forgotPasswordLabel: string = "Forgot Password?";

  /**
   * @uiName Register button text
   */
  @Prop()
  registerLabel: string = "Register";

  /**
   * Redirect participants to this page to start registration.
   * @uiName Register button redirect
   * @uiWidget pageSelect
   */
  @Prop() registerPath: string = "/register";

  /**
   * @uiName Heading label
   * @uiWidget textArea
   */
  @Prop() pageLabel: string = "Sign in to your account";

  /**
   * Displayed when the login fails due to a network error. The participant can try refreshing the page.
   * @uiName Network error message
   */
  @Prop() networkErrorMessage: string =
    "An error occurred while logging you in. Please refresh the page and try again.";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<PortalLoginViewProps>;

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
          <a onClick={() => navigation.push(states.forgotPasswordPath)}>
            {this.forgotPasswordLabel}
          </a>
        </slot>
      ),
      secondaryButton: (
        <slot name="secondaryButton">
          <sl-button
            type="text"
            disabled={states.loading}
            onClick={() => navigation.push(states.registerPath)}
          >
            {this.registerLabel}
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
function useLoginDemo(props: PortalLogin): Partial<PortalLoginViewProps> {
  return deepmerge(
    {
      states: {
        error: "",
        loading: false,
        forgotPasswordPath: "/forgotPassword",
        registerPath: "/register",
      },
      callbacks: {
        submit: async (_event) => {
          console.log("submit");
        },
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
