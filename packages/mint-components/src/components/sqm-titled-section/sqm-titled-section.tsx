import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { Spacing } from "../../global/mixins";
import { getProps } from "../../utils/utils";
import { PortalSectionView } from "./sqm-portal-section-view";

/**
 * @uiName Titled Section
 * @slots [{"name":"label", "title":"Label"},{"name":"content", "title":"Content"}]
 * @exampleGroup Layout
 * @example Titled Section - <sqm-titled-section text-align="center" label-margin="small" padding="none"><div slot="label">Section Label</div><div slot="content">Add your section content here!</div></sqm-titled-section>
 */
@Component({
  tag: "sqm-titled-section",
  shadow: true,
})
export class TitledSection {
  /**
   * Label for the section unless overwritten via the label slot.
   *
   * @uiName Label
   */
  @Prop() label: string;

  /**
   * @uiName Text Align
   * @uiType string
   * @uiEnum ["left", "center", "right"]
   * @uiEnumNames ["Left", "Center", "Right"]
   */
  @Prop() textAlign: "left" | "center" | "right" = "left";

  /**
   * @uiName Label Margin Style
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() labelMargin: Spacing = "small";
  /**
   * @uiName Section Padding
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
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
