import { isDemo, navigation } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { createStyleSheet } from "../../styling/JSS";
import {
  PortalLoginView,
  PortalLoginViewProps,
} from "../sqm-portal-login/sqm-portal-login-view";
import { usePortalLogin } from "../sqm-portal-login/usePortalLogin";

/**
 * @uiName Microsite Login
 */
@Component({
  tag: "sqm-portal-google-login",
  shadow: true,
})
export class PortalGoogleLogin {
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
   * @uiName Network error message
   * Displayed when the login fails due to a network error. The participant can try refreshing the page.
   */
  @Prop() networkErrorMessage: string =
    "An error occurred while logging you in. Please refresh the page and try again.";

  /**
   * @uiName Google account error message
   * Displayed when user tries to sign in with Google account but has not registered.
   */
  @Prop() googleUserNotRegisteredError: string =
    "Your Google account has not registered on our platform. Please complete the registration process with your Google account.";

  /**
   * @uiName Register CTA
   */
  @Prop() registerCTA: string = "Don't have an account?";

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

    const styles = {
      RegisterButton: {
        "&::part(label)": {
          padding: "0",
        },
      },
    };

    const sheet = createStyleSheet(styles);
    const styleString = sheet.toString();

    const content = {
      forgotPasswordButton: (
        <slot name="forgotPassword">
          <a onClick={() => navigation.push(states.forgotPasswordPath)}>
            {this.forgotPasswordLabel}
          </a>
        </slot>
      ),
      googleButton: (
        <sqm-google-sign-in
          onInitComplete={callbacks.googleSubmit}
        ></sqm-google-sign-in>
      ),
      secondaryButton: (
        <slot name="secondaryButton">
          <style>{styleString}</style>
          <span>
            {this.registerCTA}{" "}
            <sl-button
              size="large"
              type="text"
              disabled={states.loading}
              onClick={() => navigation.push(states.registerPath)}
              className={sheet.classes.RegisterButton}
            >
              {this.registerLabel}
            </sl-button>
          </span>
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
function useLoginDemo(props: PortalGoogleLogin): Partial<PortalLoginViewProps> {
  return deepmerge(
    {
      states: {
        error: "",
        loading: false,
        forgotPasswordPath: "/forgotPassword",
        registerPath: "/register",
        showLoginForm: "manual",
      },
      callbacks: {
        googleSubmit: async () => {
          console.log("google submit");
        },
        submit: async (_event) => {
          console.log("submit");
        },
      },
      content: {
        googleButton: null,
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
