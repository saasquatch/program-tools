import { Component, h, Prop } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { DividedLayoutView } from "./sqm-divided-layout-view";
import { getProps } from "../../utils/utils";

/**
 * Shows it's children as either a row or a column, with a division in between them.
 * Spacing is left up to the child
 *
 * @uiName Divided Layout
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
   * Uses Shorthand CSS border syntax allowing specification of thickness, fill style and color.
   * @uiName Border style
   */
  @Prop() dividerStyle: string = "1px solid #EAEAEA";

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
