import { isDemo, navigation } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { BaseRegistrationFormView } from "../sqm-base-registration/sqm-base-registration-form-view";
import {
  PortalRegistrationFormView,
  PortalRegistrationFormViewProps,
} from "../sqm-portal-registration-form/sqm-portal-registration-form-view";
import { usePortalRegistrationForm } from "../sqm-portal-registration-form/usePortalRegistrationForm";
import { usePortalGoogleRegistrationForm } from "./usePortalGoogleRegistrationForm";
import { createStyleSheet } from "../../styling/JSS";

@Component({
  tag: "sqm-portal-google-registration-form",
  shadow: true,
})
export class PortalGoogleRegistrationForm {
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
   * Login Call-to-action
   *
   * @uiName Login CTA
   */
  @Prop() loginCTA: string = "Already have an account?";

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
   * Can be "signup_with", "signin_with", "continue_with", or "signin"
   *
   * @uiName Google button text
   */
  @Prop() googleButtonText: string = "signup_with";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<PortalRegistrationFormViewProps>;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoGoogleData?: DemoData<PortalRegistrationFormViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, callbacks, refs } = isDemo()
      ? useRegisterDemo(this)
      : usePortalRegistrationForm(this);

    const styles = {
      LoginButton: {
        "&::part(label)": {
          padding: "0",
        },
      },
    };

    const sheet = createStyleSheet(styles);
    const styleString = sheet.toString();

    const {
      handleGoogleInit,
      handleEmailSubmit,
      showRegistrationForm,
      emailValidationError,
    } = isDemo() ? useGoogleDemo(this) : usePortalGoogleRegistrationForm(this);

    const content = {
      formData: <slot name="formData"></slot>,
      googleButton: (
        <sqm-google-sign-in
          text={this.googleButtonText}
          onInitComplete={handleGoogleInit}
        ></sqm-google-sign-in>
      ),
      secondaryButton: (
        <slot name="secondaryButton">
          <style>{styleString}</style>
          <span>
            {this.loginCTA}{" "}
            <sl-button
              size="large"
              type="text"
              disabled={states.loading}
              onClick={() => navigation.push(states.loginPath)}
              className={sheet.classes.LoginButton}
            >
              {this.loginLabel}
            </sl-button>{" "}
          </span>
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

    if (showRegistrationForm.mode === "base") {
      return (
        <BaseRegistrationFormView
          states={{
            error: emailValidationError,
          }}
          callbacks={{ handleEmailSubmit }}
          content={content}
        />
      );
    }

    return (
      <PortalRegistrationFormView
        states={{
          ...states,
          hidePasswords: showRegistrationForm.mode === "google",
        }}
        callbacks={callbacks}
        content={{
          ...content,
        }}
        refs={refs}
      ></PortalRegistrationFormView>
    );
  }
}
function useRegisterDemo(
  props: PortalGoogleRegistrationForm
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
        passwordField: null,
      },
      refs: {
        formRef: {},
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}

type PortalGoogleResult = {
  emailValidationError: boolean;
  handleEmailSubmit: () => void;
  showRegistrationForm: { mode: string };
  handleGoogleInit: () => void;
};

function useGoogleDemo(
  props: PortalGoogleRegistrationForm
): PortalGoogleResult {
  const [showRegistrationForm, setShowRegistrationForm] = useState({
    mode: "base",
  });

  return deepmerge(
    {
      emailValidationError: true,
      handleEmailSubmit: () => setShowRegistrationForm({ mode: "manual" }),
      showRegistrationForm,
      handleGoogleInit: () => setShowRegistrationForm({ mode: "google" }),
    },
    props.demoGoogleData || {},
    { arrayMerge: (_, a) => a }
  );
}
