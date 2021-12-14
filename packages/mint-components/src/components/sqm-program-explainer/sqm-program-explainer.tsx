import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { ProgramExplainerView } from "./sqm-program-explainer-view";

/**
 * @uiName Program Explainer
 */
@Component({
  tag: "sqm-program-explainer",
  shadow: true,
})
export class ProgramExplainer {
  @State()
  ignored = true;

  /**
   * @uiName Header
   */
  @Prop() header: string;

  /**
   * @uiName Title
   */
  @Prop() cardTitle: string;

  /**
   * @uiName Description
   */
  @Prop() description: string;

  /**
   * @uiName Color
   * @uiWidget color
   */
  @Prop() color: string;

  /**
   * @uiName Background
   * @uiWidget color
   */
  @Prop() background: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return (
      <ProgramExplainerView {...getProps(this)}>
        <slot />
      </ProgramExplainerView>
    );
  }
}
