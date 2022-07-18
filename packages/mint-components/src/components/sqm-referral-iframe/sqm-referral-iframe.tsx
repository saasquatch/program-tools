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
   * URL of iframe to display
   * @uiName Iframe Source
   * @required
   */
  @Prop() iframeSrc: string;
  /**
   * Define the height of the iframe with any valid CSS height value. Example: 100px, 5rem, or auto.
   * @uiName Iframe Height
   */
  @Prop() iframeHeight: string = "100%";
  /**
   * Width of the iframe container  to Define the width of the iframe with any valid CSS width value. Example: 100px, 5rem, or auto.
   * @uiName Iframe Width
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
      return (
        <RequiredPropsError
          missingProps={missingProps}
          heading={"An error occured while loading this page"}
          subheading={
            "A technical problem prevented this iframe from loading. Please contact us with the link to this page."
          }
          description={"Values for the following attributes are missing:"}
        />
      );
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
