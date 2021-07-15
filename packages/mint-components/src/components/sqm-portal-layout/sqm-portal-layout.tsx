import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { PortalLayoutView } from "./sqm-portal-layout-view";
import { getProps } from "../../utils/utils";

/**
 * @uiName Portal Layout
 */
@Component({
  tag: "sqm-portal-layout",
  shadow: true,
})
export class PortalLayout {
  @State()
  ignored = true;

  /** @uiName Direction */
  @Prop() direction: "row" | "column";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return (
      <PortalLayoutView {...getProps(this)}>
        <slot />
      </PortalLayoutView>
    );
  }
}
