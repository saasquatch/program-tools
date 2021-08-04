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

  /**@uiName Space between stats */
  @Prop() space: Spacing = "xxx-large";

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
