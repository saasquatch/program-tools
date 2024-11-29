import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { useWidgetEmailVerification } from "./useEmailVerification";
import { DemoData } from "../../../global/demo";
import {
  WidgetEmailVerificationView,
  WidgetEmailVerificationViewProps,
} from "./sqm-email-verification-view";
import { getProps } from "../../../utils/utils";

/**
 * @uiName Widget Verification Gate
 */
@Component({
  tag: "sqm-email-verification",
  shadow: true,
})
export class WidgetEmailVerification {
  @Prop()
  cashVerifyHeaderText: string = "Cash Payouts";
  @Prop()
  cashVerifySubHeaderText: string =
    "To receive your cash payouts, we’ll send a code to your email through our referral provider, impact.com.";
  /**
   * @uiName Email input label
   */
  @Prop()
  email: string = "Email";
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
    const props = useWidgetEmailVerification(this);

    return <WidgetEmailVerificationView {...props} />;
    // return (
    //   <div>
    //     <form onSubmit={props.submitEmail}>
    //       <input type="email" name="email" required />
    //       <button type="submit">{props.loading ? "Loading" : "Verify"}</button>
    //     </form>
    //   </div>
    // );
  }
}
