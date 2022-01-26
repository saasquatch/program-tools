import { isDemo, navigation } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import {
  PortalRegisterView,
  PortalRegisterViewProps,
} from "./sqm-portal-register-view";
import { usePortalRegister } from "./usePortalRegister";

/**
 * @uiName Portal Register
 */
@Component({
  tag: "sqm-portal-register",
  shadow: true,
})
export class PortalRegister {
  @State()
  ignored = true;

  /**
   * @uiName Page navigated to after registration
   */
  @Prop()
  nextPage: string = "/";

  /**
   * The page that users are redirected to from the verification email.
   *
   * @uiName Email redirection base path
   */
  @Prop()
  redirectPath: string = "/verifyEmail";

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
  submitLabel: string = "Register";

  /**
   * @uiName Label for login navigation button
   */
  @Prop()
  loginLabel: string = "Sign in";

  /**
   * @uiName Label for confirm password field
   */
  @Prop() confirmPasswordLabel: string = "Confirm Password";

  /**
   * @uiName Show confirm password field
   */
  @Prop()
  confirmPassword: boolean = false;

  /**
   * @uiName Use password field with live validation
   */
  @Prop()
  enablePasswordValidation: boolean = true;

  /**
   * @uiName Hide default input fields to use custom fields
   */
  @Prop()
  hideInputs: boolean = false;

  /**
   * @uiName Heading label
   */
  @Prop()
  pageLabel: string = "Register";

  /**
   * @uiName Sign in button redirection path
   */
  @Prop() loginPath: string = "/login";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<PortalRegisterViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, callbacks, refs } = isDemo()
      ? useRegisterDemo(this)
      : usePortalRegister(this);
    const content = {
      formData: <slot name="formData"></slot>,
      secondaryButton: (
        <slot name="secondaryButton">
          <sl-button
            variant="text"
            disabled={states.loading}
            onClick={() => navigation.push(states.loginPath)}
          >
            {this.loginLabel}
          </sl-button>
        </slot>
      ),
      terms: <slot name="terms"></slot>,
      emailLabel: this.emailLabel,
      passwordLabel: this.passwordLabel,
      submitLabel: this.submitLabel,
      pageLabel: this.pageLabel,
      confirmPasswordLabel: this.confirmPasswordLabel,
    };

    return (
      <PortalRegisterView
        states={states}
        callbacks={callbacks}
        content={content}
        refs={refs}
      ></PortalRegisterView>
    );
  }
}
function useRegisterDemo(
  props: PortalRegister
): Pick<PortalRegisterViewProps, "states" | "callbacks" | "refs"> {
  return deepmerge(
    {
      states: {
        error: "",
        loading: false,
        confirmPassword: true,
        hideInputs: props.hideInputs || false,
        customPasswordField: false,
        loginPath: "/login",
      },
      callbacks: {
        submit: async (_event) => {
          console.log("submit");
        },
        inputFunction: () => {},
      },
      refs: {
        formRef: {},
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
