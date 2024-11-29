import { isDemo } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Fragment, Prop, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";
import { useReferralCodes } from "./useReferralCodes";
import {
  ReferralCodesView,
  ReferralCodesViewProps,
} from "./sqm-referral-codes-view";
import { PaginationView } from "../sqm-pagination/sqm-pagination-view";

/**
 * @uiName Referral Codes
 * @exampleGroup Sharing
 * @example Referral Codes - <sqm-referral-codes><sqm-pagination slot="pagination"></sqm-pagination><sqm-referral-code slot="shareCodes"></sqm-referral-code><sqm-portal-container gap="small" slot="shareButtons"><sqm-share-button medium="email">Share via email</sqm-share-button><sqm-share-button medium="facebook">Share on Facebook</sqm-share-button><sqm-share-button medium="whatsapp">Share on WhatsApp</sqm-share-button></sqm-portal-container></sqm-referral-codes>
 */
@Component({
  tag: "sqm-referral-codes",
  shadow: true,
})
export class ReferralCodes {
  @Prop() titleText?: string = "Your referral code";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<ReferralCodesViewProps>;

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

    const slots = {
      shareButtons: <slot name="shareButtons" />,
      shareCodes: <slot name="shareCodes" />,
      pagination: <slot name="pagination" />,
    };

    const viewProps = {
      slots,
      ...props,
    };

    return <ReferralCodesView {...viewProps} />;
  }
}

function useDemoReferralCodes(props: ReferralCodes) {
  return deepmerge(
    {
      titleText: "Your referral code",
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
