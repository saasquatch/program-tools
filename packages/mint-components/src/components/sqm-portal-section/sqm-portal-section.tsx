import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { PortalSectionView } from "./sqm-portal-section-view";
import { getProps } from "../../utils/utils";
import { Spacing } from "../../global/mixins";

/**
 * @uiName Portal Section
 */
@Component({
  tag: "sqm-portal-section",
  shadow: true,
})
export class PortalSection {
  @State()
  ignored = true;

  /**@uiName Label margin style */
  @Prop() labelMargin: string = "12px";
  /** @uiName Section padding */
  @Prop() padding: Spacing = "none";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const label = <slot name="label" />;
    const content = <slot name="content" />;
    return <PortalSectionView {...{ ...getProps(this), label, content }} />;
  }
}
