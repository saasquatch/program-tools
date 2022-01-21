import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { PortalContainerView } from "./sqm-portal-container-view";
import { getProps } from "../../utils/utils";
import { Spacing } from "../../global/mixins";

/**
 * @uiName Portal Container
 */
@Component({
  tag: "sqm-portal-container",
  shadow: true,
})
export class PortalContainer {
  @State()
  ignored = true;
  /**
   * @uiName Direction
   * @uiType string
   * @uiEnum ["row", "column"]
   */
  @Prop() direction: "row" | "column" = "column";
  /**
   * @uiName Padding
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   */
  @Prop() padding: Spacing;
  /**
   * @uiName Gap
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   */
  @Prop() gap: Spacing = "xxx-large";

  /** @uiName Minimum width */
  @Prop() minWidth?: string;

  
  /**
   * @uiName Display
   * @uiType string
   * @uiEnum ["grid", "flex"]
   */
   @Prop() display: "grid" | "flex" = "grid";

  /**
   * @uiName Maximum width
   */
  @Prop() maxWidth?: string = "100%";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return (
      <PortalContainerView {...getProps(this)}>
        <slot />
      </PortalContainerView>
    );
  }
}
