import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { StatContainerView } from "./sqm-stat-container-view";
import { getProps } from "../../utils/utils";

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

  /**@uiName Space between stats */
  @Prop() space: string = "64px";

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
