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
   * Redirect participants to this page after they successfully register.
   *
   * @uiName Registration Redirect
   * @uiWidget pageSelect
   */
  @Prop()
  nextPage: string = "/";

  /**
   * Redirect participants to this page from their verification email
   *
   * @uiName Email Verification Redirect
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
   * @uiName Confirm Password Field Label
   */
  @Prop() confirmPasswordLabel: string = "Confirm Password";

  /**
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
   * Hides the email and password fields. Note: If you hide default inputs, you must add additional input fields. They must have the input name attributes "email" and "password" for this form to succeed.
   *
   * @uiName Hide Default Fields
   */
  @Prop()
  hideInputs: boolean = false;

  /**
   * @uiName Header Text
   */
  @Prop()
  pageLabel: string = "Register";

  /**
   * Redirect participants to this page after clicking the login button.
   *
   * @uiName Login Redirect
   * @uiWidget pageSelect
   */
  @Prop() loginPath: string = "/login";

  /**
   * The message to be displayed when a required field is not filled.
   *
   * @uiName Required Field Message
   * @uiWidget textArea
   */
  @Prop() requiredFieldErrorMessage: string = "Cannot be empty";

  /**
   * The message to be displayed when a the form submission fails unexpectedly.
   *
   * @uiName Network Error Message
   * @uiWidget textArea
   */
  @Prop() networkErrorMessage: string = "Network request failed.";

  /**
   * The message to be displayed when password inputs do not match.
   *
   * @uiName Password Mismatch Message
   * @uiWidget textArea
   */
  @Prop() passwordMismatchErrorMessage: string = "Passwords do not match.";

  /**
   * The message to be displayed when the email used is invalid or blocked.
   *
   * @uiName Invalid Email Message
   * @uiWidget textArea
   */
  @Prop() invalidEmailErrorMessage: string = "Must be a valid email address";

  /**
   * The message to be displayed when the registration form is disabled.
   *
   * @uiName Form Disabled Message
   * @uiWidget textArea
   */
  @Prop() formDisabledErrorMessage: string =
    "The registration form is currently disabled.";

  /**
   * The key of the registration form used for this microsite.
   *
   * @uiName Form Key
   * @required
   */
  @Prop() formKey: string;

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
        confirmPassword: props.confirmPassword,
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
