import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { useWidgetEmailVerification } from "./useEmailVerification";
import { DemoData } from "../../../global/demo";
import {
  WidgetEmailVerificationView,
  WidgetEmailVerificationViewProps,
} from "./sqm-email-verification-view";
import { getProps } from "../../../utils/utils";
import { isDemo } from "@saasquatch/component-boilerplate";
import deepmerge from "deepmerge";

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
  return deepmerge(
    {
      states: {
        error: "",
        loading: false,
        email: "",
      },
      callbacks: {
        submitEmail: async () => {},
      },
      text: props.getTextProps(),
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
