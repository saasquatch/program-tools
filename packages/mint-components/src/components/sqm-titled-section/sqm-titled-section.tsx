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
   * @uiName Text Align
   * @uiType string
   * @uiEnum ["left", "center", "right"]
   */
  @Prop() align: "left" | "center" | "right" = "left";

  /**
   * @uiName Label margin style
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   */
  @Prop() labelMargin: Spacing = "small";
  /**
   * @uiName Section padding
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
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
