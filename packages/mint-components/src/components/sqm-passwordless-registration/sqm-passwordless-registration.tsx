import { isDemo, navigation } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import {
  PasswordlessRegistrationView,
  PasswordlessRegistrationViewProps,
} from "./sqm-passwordless-registration-view";

/**
 * @uiName Microsite Registration
 */
@Component({
  tag: "sqm-passwordless-registration",
  shadow: true,
})
export class PasswordlessRegistration {
  @State()
  ignored = true;

  /**
   * Redirect participants to this page after they successfully Registration.
   *
   * @uiName Registration Redirect
   * @uiWidget pageSelect
   */
  @Prop()
  nextPage: string = "/";

  /**
   * @uiName Email Field Label
   */
  @Prop()
  emailLabel: string = "Email";

  /**
   * @uiName Submit Button Text
   */
  @Prop()
  submitLabel: string = "Sign In";

  /**
   * @uiName Register Button Text
   */
  @Prop()
  registerLabel: string = "Register";

  /**
   * Redirect participants to this page to start registration.
   * @uiName Register Button Redirect
   * @uiWidget pageSelect
   */
  @Prop() registerPath: string = "/register";

  /**
   * @uiName Heading Label
   * @uiWidget textArea
   */
  @Prop() pageLabel: string = "Sign in to your account";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<PasswordlessRegistrationViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, callbacks } = useRegistrationDemo(this);
    // isDemo() ? useRegistrationDemo(this) : usePasswordlessRegistration(this);
    const content = {
      emailLabel: this.emailLabel,
      submitLabel: this.submitLabel,
      pageLabel: this.pageLabel,
    };
    return (
      <PasswordlessRegistrationView
        states={states}
        callbacks={callbacks}
        content={content}
      ></PasswordlessRegistrationView>
    );
  }
}
function useRegistrationDemo(
  props: PasswordlessRegistration
): Partial<PasswordlessRegistrationViewProps> {
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
