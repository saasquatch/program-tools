import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, VNode } from "@stencil/core";
import { Spacing } from "../../global/mixins";
import { getProps } from "../../utils/utils";
import { PortalSectionView } from "./sqm-portal-section-view";

/**
 * @uiName Titled Section
 * @validParents ["sqm-portal-container","div","sqm-divided-layout","sqm-brand","template","sqm-hero","sqm-tab", "sqm-referred-registration", "sqb-program-section","sqb-conditional-section", "sqm-instant-access-registration", "sqm-referral-card"]
 * @validChildren ["div","sqm-portal-container","p","sqm-timeline","h1","h2","h3","h5","h4","sqm-qr-code","sqm-referral-code","sqm-referral-codes","sqm-share-code","sqm-share-link","sqm-text","span"]
 * @slots [{"name":"label", "title":"Label"},{"name":"content", "title":"Content"}]
 * @exampleGroup Layout
 * @example Titled Section - <sqm-titled-section text-align="center" label-margin="small" padding="none"><div slot="label"><h2>Section Label</h2></div><div slot="content"><p>Add your section content here!</p></div></sqm-titled-section>
 */
@Component({
  tag: "sqm-titled-section",
  shadow: true,
})
export class TitledSection {
  /**
   * Text value shown when there is no label slot declared.
   *
   * @uiName Label
   * @uiType string
   */
  @Prop() label: string | VNode;

  /**
   * @uiName Text alignment
   * @uiType string
   * @uiEnum ["left", "center", "right"]
   * @uiEnumNames ["Left", "Center", "Right"]
   */
  @Prop() textAlign: "left" | "center" | "right" = "left";

  /**
   * Margin applied to the bottom of the label slot
   *
   * @uiName Label bottom margin
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() labelMargin: Spacing = "small";
  /**
   * Padding applied to all 4 sides of the container
   *
   * @uiName Section padding
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
