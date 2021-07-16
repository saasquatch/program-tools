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

  /** @uiName Direction */
  @Prop() direction: "row" | "column" = "column";
  /** @uiName Padding */
  @Prop() padding: Spacing;
  /** @uiName Gap */
  @Prop() gap: string;

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
