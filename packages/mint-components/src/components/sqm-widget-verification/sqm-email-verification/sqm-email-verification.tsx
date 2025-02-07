import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { useWidgetEmailVerification } from "./useEmailVerification";
import { DemoData } from "../../../global/demo";
import {
  WidgetEmailVerificationView,
  WidgetEmailVerificationViewProps,
} from "./sqm-email-verification-view";
import { getProps } from "../../../utils/utils";
import { isDemo, useSetParent } from "@saasquatch/component-boilerplate";
import deepmerge from "deepmerge";
import { SHOW_CODE_NAMESPACE } from "../keys";

/**
 * @uiName Widget Verification Gate
 */
@Component({
  tag: "sqm-email-verification",
  shadow: true,
})
export class WidgetEmailVerification {
  /**
   * @uiName Verify email widget header text
   */
  @Prop()
  verifyEmailHeaderText: string =
    "Start by verifying your email. We’ll send you a code through our referral provider, impact.com.";
  /**
   * @uiName Send code to email alert header
   */
  @Prop()
  sendCodeErrorHeader: string = "There was an error sending your code";
  /**
   * @uiName Support link text
   */
  @Prop()
  supportLink: string = "support team";
  /**
   * @uiName Send code to email alert description
   */
  @Prop()
  sendCodeErrorDescription: string =
    "Please try again. If this problem continues, contact our program {supportLink} team.";
  /**
   * @uiName Email input label
   */
  @Prop()
  emailLabel: string = "Email";
  /**
   * @uiName Send code button text
   */
  @Prop()
  sendCodeText: string = "Send code";
  /**
   * @uiName Send code button text
   */
  @Prop()
  emailValidationErrorText: string = "Please enter a valid email";
  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<WidgetEmailVerificationViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  getTextProps() {
    return getProps(this);
  }

  render() {
    const props = isDemo()
      ? useDemoWidgetEmailVerification(this)
      : useWidgetEmailVerification(this);

    return <WidgetEmailVerificationView {...props} />;
  }
}

function useDemoWidgetEmailVerification(
  props: WidgetEmailVerification
): WidgetEmailVerificationViewProps {
  const setShowCode = useSetParent(SHOW_CODE_NAMESPACE);

  return deepmerge(
    {
      states: {
        error: true,
        initialLoading: false,
        loading: false,
        email: "test@example.com",
        sendCodeError: true,
      },
      callbacks: {
        submitEmail: async () => setShowCode(true),
      },
      text: props.getTextProps(),
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
