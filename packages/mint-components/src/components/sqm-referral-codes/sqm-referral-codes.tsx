import { isDemo } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";
import { CopyTextView, CopyTextViewProps } from "../views/copy-text-view";
import { useReferralCodes } from "./useReferralCodes";

/**
 * @uiName Referral Codes
 * @exampleGroup Sharing
 * @example Referral Code - <sqm-referral-codes></sqm-referral-code>
 */
@Component({
  tag: "sqm-referral-codes",
  shadow: true,
})
export class ReferralCodes {
  @Prop() titleText: string = "Your referral code";

  // referral code props

  // share link props

  // email button props
  /**
   * @uiGroup Email
   */
  @Prop() email_buttonText: string = "Share via email";

  // facebook messenger props
  /**
   * @uiGroup Facebook Messenger
   */
  @Prop() fbmessenger_buttonText: string = "Message on Facebook";

  // whatsapp props
  /**
   * @uiGroup WhatsApp
   */
  @Prop() whatsapp_buttonText: string = "Text on WhatsApp";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<CopyTextViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const thisProps = getProps(this);
    const props = isDemo()
      ? useDemoReferralCodes(thisProps)
      : useReferralCodes(thisProps);

    console.log(props);

    return (
      <div>
        <div>
          {this.titleText}
          <sl-button>{"<"}</sl-button>
          {props.states.currentPage + 1} of {props.states.pageCount}
          <sl-button>{">"}</sl-button>
        </div>
        <sqm-referral-code codeOverride="OVERRIDE"></sqm-referral-code>
        <sqm-share-link linkOverride="example.com"></sqm-share-link>
        <sqm-share-button medium="email" messageLinkOverride="example.com">
          {this.email_buttonText}
        </sqm-share-button>
        <sqm-share-button
          medium="fbmessenger"
          messageLinkOverride="example.com"
          shareLinkOverride="example.com"
        >
          {this.fbmessenger_buttonText}
        </sqm-share-button>
        <sqm-share-button medium="whatsapp" messageLinkOverride="example.com">
          {this.whatsapp_buttonText}
        </sqm-share-button>
      </div>
    );
  }
}

function useDemoReferralCodes(props: ReferralCodes) {
  const [currentPage, setCurrentPage] = useState(0);

  return deepmerge(
    {
      data: {
        referralData: [],
      },
      states: {
        loading: false,
        currentPage,
        pageCount: 1,
      },
      callbacks: {
        onPrev: () => setCurrentPage(currentPage - 1),
        onNext: () => setCurrentPage(currentPage + 1),
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
