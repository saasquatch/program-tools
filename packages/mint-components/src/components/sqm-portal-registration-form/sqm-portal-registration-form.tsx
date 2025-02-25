import { isDemo, navigation } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import {
  PortalRegistrationFormView,
  PortalRegistrationFormViewProps,
} from "./sqm-portal-registration-form-view";
import { RegistrationFieldsView } from "./small-views/RegistrationFieldsView";
import { usePortalRegistrationForm } from "./usePortalRegistrationForm";
import { BaseRegistrationFormView } from "../sqm-base-registration/sqm-base-registration-form-view";

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
   * @uiName Registration redirect
   * @uiWidget pageSelect
   */
  @Prop()
  nextPage: string = "/";

  /**
   * Redirect participants to this page from their verification email
   *
   * @uiName Email verification redirect
   * @uiWidget pageSelect
   */
  @Prop()
  redirectPath: string = "/verifyEmail";

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
  submitLabel: string = "Register";

  /**
   * @uiName Login button text
   */
  @Prop()
  loginLabel: string = "Sign in";

  /**
   * @uiName Confirm password field label
   */
  @Prop() confirmPasswordLabel: string = "Confirm Password";

  /**
   * @uiName Show confirm password field
   */
  @Prop()
  confirmPassword: boolean = false;

  /**
   * @uiName Disable password validation
   */
  @Prop()
  disablePasswordValidation: boolean = false;

  /**
   * Hides the email and password fields. Note: If you hide default inputs, you must add additional input fields. They must have the input name attributes "email" and "password" for this form to succeed.
   *
   * @uiName Hide default fields
   */
  @Prop()
  hideInputs: boolean = false;

  /**
   * @uiName Header text
   */
  @Prop()
  pageLabel: string = "Register";

  /**
   * Redirect participants to this page after clicking the login button.
   *
   * @uiName Login redirect
   * @uiWidget pageSelect
   */
  @Prop() loginPath: string = "/login";

  /**
   * The message to be displayed when a required field is not filled.
   *
   * @uiName Required field message
   * @uiWidget textArea
   */
  @Prop() requiredFieldErrorMessage: string = "Cannot be empty";

  /**
   * The message to be displayed when a the form submission fails unexpectedly.
   *
   * @uiName Network error message
   * @uiWidget textArea
   */
  @Prop() networkErrorMessage: string = "Network request failed.";

  /**
   * The message to be displayed when password inputs do not match.
   *
   * @uiName Password mismatch message
   * @uiWidget textArea
   */
  @Prop() passwordMismatchErrorMessage: string = "Passwords do not match.";

  /**
   * The message to be displayed when the email used is invalid or blocked.
   *
   * @uiName Invalid email message
   * @uiWidget textArea
   */
  @Prop() invalidEmailErrorMessage: string = "Must be a valid email address";

  /**
   * The message to be displayed when the registration form is disabled.
   *
   * @uiName Form disabled message
   * @uiWidget textArea
   */
  @Prop() formDisabledErrorMessage: string =
    "The registration form is currently disabled.";

  /**
   * @uiName Password requirement met
   */
  @Prop() meetsRequirementsText: string = "Password has met all requirements";

  /**
   * @uiName Password requirement failed
   */
  @Prop() doesNotMeetRequirementsText: string =
    "Password must meet the following requirements:";

  /**
   * @uiName Minimum length text
   */
  @Prop() minErrorText: string = "be a minimum of 8 characters";

  /**
   * @uiName Missing uppercase text
   */
  @Prop() uppercaseErrorText: string = "contain at least 1 uppercase character";

  /**
   * @uiName Missing lowercase text
   */
  @Prop() lowercaseErrorText: string = "contain at least 1 lowercase character";

  /**
   * @uiName Missing number or symbol text
   */
  @Prop() hasErrorText: string = "contain at least 1 number or symbol";

  /**
   * The key of the registration form used for this microsite.
   *
   * @uiName Form key
   * @required
   */
  @Prop() formKey: string;

  /**
   * Login Call-to-action
   *
   * @uiName Login CTA
   */
  @Prop() loginCTA: string;

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
      googleButton: (
        <sqm-google-sign-in
          onInitComplete={callbacks.handleGoogleInit}
        ></sqm-google-sign-in>
      ),
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
      networkErrorMessage: this.networkErrorMessage,
      passwordMismatchErrorMessage: this.passwordMismatchErrorMessage,
      invalidEmailErrorMessage: this.invalidEmailErrorMessage,
      formDisabledErrorMessage: this.formDisabledErrorMessage,
      requiredFieldErrorMessage: this.requiredFieldErrorMessage,
      meetsRequirementsText: this.meetsRequirementsText,
      doesNotMeetRequirementsText: this.doesNotMeetRequirementsText,
      minErrorText: this.minErrorText,
      uppercaseErrorText: this.uppercaseErrorText,
      lowercaseErrorText: this.lowercaseErrorText,
      hasErrorText: this.hasErrorText,
    };

    // AL: when user clicks "Register", show the base registration form
    if (!states.showRegistrationForm) {
      return (
        <BaseRegistrationFormView
          states={states}
          callbacks={callbacks}
          content={content}
          refs={refs}
        />
      );
    }

    return (
      <PortalRegistrationFormView
        states={states}
        callbacks={callbacks}
        content={content}
        refs={refs}
        // slots={{ conditionalRegistrationFields }}
      ></PortalRegistrationFormView>
    );
  }
}
function useRegisterDemo(
  props: PortalRegistrationForm
): Pick<PortalRegistrationFormViewProps, "states" | "callbacks" | "refs"> &
  any {
  return deepmerge(
    {
      states: {
        error: "",
        loading: false,
        confirmPassword: props.confirmPassword,
        hideInputs: props.hideInputs || false,
        customPasswordField: false,
        loginPath: "/login",
        isGoogle: false,
      },
      callbacks: {
        handleGoogleInit: () => {},
        setShowRegistrationForm: () => {},
        submit: async (_event) => {
          console.log("submit");
        },
        inputFunction: () => {},
      },
      content: {
        pageLabel: "Register",
        formData: null,
      },
      refs: {
        formRef: {},
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
