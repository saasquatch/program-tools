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
   * Page navigated to after registration
   *
   * @uiName Next Page
   */
  @Prop()
  nextPage: string = "/";

  /**
   * The page that users are redirected to from the verification email.
   *
   * @uiName Email Redirection Base Path
   */
  @Prop()
  redirectPath: string = "/verifyEmail";

  /**
   * @uiName Email Label
   */
  @Prop()
  emailLabel: string = "Email";

  /**
   * @uiName Password Label
   */
  @Prop()
  passwordLabel: string = "Password";

  /**
   * @uiName Submit Button Text
   */
  @Prop()
  submitLabel: string = "Register";

  /**
   * @uiName Login Button Text
   */
  @Prop()
  loginLabel: string = "Sign in";

  /**
   * @uiName Confirm Password Label
   */
  @Prop() confirmPasswordLabel: string = "Confirm Password";

  /**
   * Show or hide the confirm password input
   *
   * @uiName Show Confirm Password Field
   * @default
   */
  @Prop()
  confirmPassword: boolean = false;

  /**
   * @uiName Enable Password Validation
   */
  @Prop()
  enablePasswordValidation: boolean = true;

  /**
   * Hide default input fields to use custom fields
   *
   * @uiName Hide Default Inputs
   * @default
   */
  @Prop()
  hideInputs: boolean = false;

  /**
   * @uiName Heading Label
   */
  @Prop()
  pageLabel: string = "Register";

  /**
   * Login button redirection path
   *
   * @uiName Login Path
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
            type="text"
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
