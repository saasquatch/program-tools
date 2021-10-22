import { Component, h, Host, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useReferralIframe } from "./useReferralIframe";
import {
  ReferralIframeView,
  ReferralIframeViewProps,
} from "./sqm-referral-iframe-view";
import { isDemo } from "@saasquatch/component-boilerplate";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";

/**
 * @uiName Referral IFrame
 */
@Component({
  tag: "sqm-referral-iframe",
})
export class SqmReferralIframe {
  @State()
  ignored = true;

  /**
   * @uiName URL of iframe to display
   */
  @Prop() iframeSrc: string = "https://example.com";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<ReferralIframeViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { data } = isDemo()
      ? useReferralIframeDemo(getProps(this))
      : useReferralIframe(getProps(this));
    return (
      <Host style={{ display: "contents" }}>
        <ReferralIframeView data={data}></ReferralIframeView>
      </Host>
    );
  }
}

function useReferralIframeDemo(props: SqmReferralIframe) {
  return deepmerge(
    {
      data: {
        content: props,
        shareCode: "SHARECODE123",
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
