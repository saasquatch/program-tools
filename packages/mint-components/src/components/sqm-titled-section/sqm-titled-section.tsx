import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { Spacing } from "../../global/mixins";
import { getProps } from "../../utils/utils";
import { PortalSectionView } from "./sqm-portal-section-view";

/**
 * @uiName Section (with title)
 */
@Component({
  tag: "sqm-titled-section",
  shadow: true,
})
export class TitledSection {

  @Prop() label: string;

  /**
   * @uiName Label margin style
   */
   @Prop() labelMargin: string = "12px";
  /** 
   * @uiName Section padding 
  */
  @Prop() padding: Spacing = "none";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const label = <slot name="label">{this.label}</slot>;
    const content = <slot name="content" />;
    return <PortalSectionView {...{ ...getProps(this), label, content }} />;
  }
}
