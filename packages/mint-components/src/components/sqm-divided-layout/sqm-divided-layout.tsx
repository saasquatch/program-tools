import { Component, h, Prop } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { DividedLayoutView } from "./sqm-divided-layout-view";
import { getProps } from "../../utils/utils";

/**
 * Shows it's children as either a row or a column, with a division in between them.
 * Spacing is left up to the child
 *
 * @uiName Divided Layout
 * @validParents ["sqm-brand","sqm-portal-container","div","sqm-popup-container","sqm-hero","sqm-referral-card","sqm-titled-section","sqb-program-section","sqb-conditional-section"]
 * @exampleGroup Layout
 * @slots [{"name":"", "title":"Layout Content"}]
 */
@Component({
  tag: "sqm-divided-layout",
  shadow: true,
})
export class DividedLayout {
  /**
   * @uiName Direction
   * @uiType string
   * @uiEnum ["row", "column"]
   * @uiEnumNames ["Row", "Column"]
   */
  @Prop() direction: "row" | "column";

  /**
   * Overrides max-width of content area
   * @uiName Content Area Width
   * @uiType string
   */
  @Prop() contentAreaWidth: string | null;

  /**
   * @undocumented
   * Uses Shorthand CSS border syntax allowing specification of thickness, fill style and color.
   * @uiName Border style
   */
  @Prop() dividerStyle: string =
    "var(--sqm-border-thickness) solid var(--sqm-border-color)";

  /**
   * Background color of the divider
   * @uiName Divider Background Color
   * @uiWidget color
   */
  @Prop() backgroundColor?: string = "#FFFFFF";

  /**
   * Color of the divider (defaults to default text color if none is set)
   * @uiName Divider Background Color
   * @uiWidget color
   */
  @Prop() borderColor?: string;
  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return (
      <DividedLayoutView {...getProps(this)}>
        <slot />
      </DividedLayoutView>
    );
  }
}
