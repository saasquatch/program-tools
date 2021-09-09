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
   * @uiName Page navigated to after sign-in
   */
  @Prop()
  nextPage: string = "/";

  /**
   * @uiName Label for email field
   */
  @Prop()
  emailLabel: string = "Email";

  /**
   * @uiName Label for password field
   */
  @Prop()
  passwordLabel: string = "Password";

  /**
   * @uiName Label for submit button
   */
  @Prop()
  submitLabel: string = "Sign In";

  /**
   * @uiName Label for forgotten password button
   */
  @Prop()
  forgotPasswordLabel: string = "Forgot Password?";

  /**
   * @uiName Label for register navigation button
   */
  @Prop()
  registerLabel: string = "Register";

  /**
   * @uiName Heading label
   */
  @Prop()
  pageLabel: string = "Sign in to your account";

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
          <a onClick={() => navigation.push("/forgotPassword")}>
            {this.forgotPasswordLabel}
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
      states: { error: "", loading: false },
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
