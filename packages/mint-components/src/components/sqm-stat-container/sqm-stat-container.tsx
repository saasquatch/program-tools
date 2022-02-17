import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { StatContainerView } from "./sqm-stat-container-view";
import { getProps } from "../../utils/utils";
import { Spacing } from "../../global/mixins";

/**
 * @uiName Stat Container
 */
@Component({
  tag: "sqm-stat-container",
  shadow: true,
})
export class StatContainer {
  @State()
  ignored = true;

  /**
   * @uiName Space between stats
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() space: Spacing = "xxx-large";

  /**
   * @uiName Display
   * @uiType string
   * @uiEnum ["grid", "flex"]
   * @uiEnumNames ["Grid", "Flex"]
   */
  @Prop() display: "grid" | "flex" = "grid";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return (
      <StatContainerView {...getProps(this)}>
        <slot />
      </StatContainerView>
    );
  }
}
