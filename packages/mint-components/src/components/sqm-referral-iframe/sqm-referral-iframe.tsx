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
import { getMissingProps, getProps } from "../../utils/utils";
import { RequiredPropsError } from "../../utils/RequiredPropsError";

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
   * @uiRequired
   */
  @Prop() iframeSrc: string;
  /**
   * @uiName Height of the iframe container
   */
  @Prop() iframeHeight: string = "100%";
  /**
   * @uiName Width of the iframe container
   */
  @Prop() iframeWidth: string = "100%";
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
    const missingProps = getMissingProps([
      {
        attribute: "iframe-src",
        value: this.iframeSrc,
      },
    ]);

    if (missingProps) {
      return <RequiredPropsError missingProps={missingProps} />;
    }

    const { states, data } = isDemo()
      ? useReferralIframeDemo(getProps(this))
      : useReferralIframe(getProps(this));

    return (
      <Host style={{ display: "contents" }}>
        <ReferralIframeView data={data} states={states}></ReferralIframeView>
      </Host>
    );
  }
}

function useReferralIframeDemo(props: SqmReferralIframe) {
  return deepmerge(
    {
      states: {
        content: {
          iframeSrc: "https://example.com",
          ...props,
        },
      },
      data: {
        shareCode: "SHARECODE123",
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
