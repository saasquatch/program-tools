import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import {
  PortalVerifyEmailView,
  PortalVerifyEmailViewProps,
} from "./sqm-portal-verify-email-view";
import { usePortalVerifyEmail } from "./usePortalVerifyEmail";
import { getProps } from "../../utils/utils";

/**
 * @uiName Microsite Verify Email
 */
@Component({
  tag: "sqm-portal-verify-email",
  shadow: true,
})
export class PortalVerifyEmail {
  @State()
  ignored = true;

  /**
   * Redirect participants to this page when they successfully verify their email.
   *
   * @uiName Successful verification redirect
   * @uiWidget pageSelect
   */
  @Prop()
  nextPage: string = "/";

  /**
   * Redirect participants to this page if verification fails due to an outdated verification attempt.
   *
   * @uiName Failed verification redirect
   * @uiWidget pageSelect
   */
  @Prop()
  failedPage: string = "/";

  /**
   * @uiName Verify email text
   * @uiWidget textArea
   */
  @Prop()
  verifyEmailText: string = "Verify your email";

  /**
   * @uiName Email verification success text
   * @uiWidget textArea
   */
  @Prop()
  verifySuccessText: string =
    "Your email has been verified and you are being redirected. If you are not redirected, please click Continue.";

  /**
   * @uiName Email verification invalid text
   * @uiWidget textArea
   */
  @Prop() verifyInvalidText: string =
    "The email verification code is invalid or has expired, please try again.";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<PortalVerifyEmailViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, data, callbacks, content } = isDemo()
      ? usePortalVerifyEmailDemo(getProps(this))
      : usePortalVerifyEmail(getProps(this));
    return (
      <PortalVerifyEmailView
        states={states}
        data={data}
        callbacks={callbacks}
        content={content}
      />
    );
  }
}
function usePortalVerifyEmailDemo(
  props: PortalVerifyEmail
): PortalVerifyEmailViewProps {
  return deepmerge(
    {
      states: { error: "", loading: false, verified: true },
      data: {
        oobCode: "code",
      },
      callbacks: {
        failed: () => {
          console.log("failed");
        },
        gotoNextPage: () => {},
      },
      content: {
        verifySuccessText: props.verifySuccessText,
        verifyEmailText: props.verifyEmailText,
        verifyInvalidText: props.verifyInvalidText,
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
