import { isDemo, navigation } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import {
  PortalRegistrationFormView,
  PortalRegistrationFormViewProps,
} from "./sqm-portal-registration-form-view";
import { usePortalRegistrationForm } from "./usePortalRegistrationForm";

/**
 * @uiName Microsite Registration
 * @slots [{"name":"formData","title":"Additional Fields"},{"name":"terms","title":"Terms And Conditions Fields"}]
 */
@Component({
  tag: "sqm-portal-registration-form",
  shadow: true,
})
export class PortalRegistrationForm {
  @State()
  ignored = true;

  /**
   * Page participants are navigated to after registration.
   *
   * @uiName Registration Redirect Path
   * @uiWidget pageSelect
   */
  @Prop()
  nextPage: string = "/";

  /**
   * The page that participants are redirected to from the verification email.
   *
   * @uiName Email Redirection Path
   * @uiWidget pageSelect
   */
  @Prop()
  redirectPath: string = "/verifyEmail";

  /**
   * @uiName Email Field Label
   */
  @Prop()
  emailLabel: string = "Email";

  /**
   * @uiName Password Field Label
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
   * Show or hide the confirm password input.
   *
   * @uiName Show Confirm Password Field
   */
  @Prop()
  confirmPassword: boolean = false;

  /**
   * @uiName Disable Password Validation
   */
  @Prop()
  disablePasswordValidation: boolean = false;

  /**
   * Hide default input fields to use custom fields.
   *
   * @uiName Hide Default Inputs
   */
  @Prop()
  hideInputs: boolean = false;

  /**
   * @uiName Header Text
   */
  @Prop()
  pageLabel: string = "Register";

  /**
   * Login button redirection path.
   *
   * @uiName Login Redirect Path
   * @uiWidget pageSelect
   */
  @Prop() loginPath: string = "/login";

  /**
   * Microsite Registration Form Key
   *
   * @uiName Form Key
   */
  @Prop() formKey: string = "microsite-registration";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<PortalRegistrationFormViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, callbacks, refs } = isDemo()
      ? useRegisterDemo(this)
      : usePortalRegistrationForm(this);
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
      <PortalRegistrationFormView
        states={states}
        callbacks={callbacks}
        content={content}
        refs={refs}
      ></PortalRegistrationFormView>
    );
  }
}
function useRegisterDemo(
  props: PortalRegistrationForm
): Pick<PortalRegistrationFormViewProps, "states" | "callbacks" | "refs"> {
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
