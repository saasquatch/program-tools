import { isDemo, navigation } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
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

  /**
   * Page navigated to after sign-in
   *
   * @uiName Next Page Path
   */
  @Prop()
  nextPage: string = "/";

  /**
   * Label for email field
   *
   * @uiName Email Label
   */
  @Prop()
  emailLabel: string = "Email";

  /**
   * Label for password field
   *
   * @uiName Password Label
   */
  @Prop()
  passwordLabel: string = "Password";

  /**
   * Label for submit button
   *
   * @uiName Submit Button Text
   */
  @Prop()
  submitLabel: string = "Sign In";

  /**
   * Label for forgotten password button
   *
   * @uiName Forgot Password Text
   */
  @Prop()
  forgotPasswordLabel: string = "Forgot Password?";

  /**
   * Label for register button
   *
   * @uiName Register Button Text
   */
  @Prop()
  registerLabel: string = "Register";

  /**
   * @uiName Heading Label
   */
  @Prop()
  pageLabel: string = "Sign in to your account";

  /**
   * Register redirect path
   *
   * @uiName Register Path
   */
  @Prop() registerPath: string = "/register";

  /**
   * Forgot password redirect path
   *
   * @uiName Forgot Password Path
   */
  @Prop() forgotPasswordPath: string = "/forgotPassword";

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
