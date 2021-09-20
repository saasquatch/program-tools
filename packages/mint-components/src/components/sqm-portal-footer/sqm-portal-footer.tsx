import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { FSRFooterView } from "./sqm-portal-footer-view";

/**
 * @uiName Portal Footer
 */
@Component({
  tag: "sqm-portal-footer",
  shadow: true,
})
export class SQMPortalFooter {
  @State()
  ignored = true;

  @Prop() supportEmail: string;
  @Prop() termsLink: string;
  @Prop() faqLink: string;
  @Prop() showPoweredBy: boolean;
  @Prop() poweredByLink?: string;
  @Prop() paddingTop?: string = "large";
  @Prop() paddingRight?: string = "large";
  @Prop() paddingBottom?: string = "large";
  @Prop() paddingLeft?: string = "large";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    return <FSRFooterView {...getProps(this)} />;
  }
}
