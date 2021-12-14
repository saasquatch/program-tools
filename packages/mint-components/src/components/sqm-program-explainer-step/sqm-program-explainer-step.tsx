import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { ProgramExplainerStepView } from "./sqm-program-explainer-step-view";

/**
 * @uiName Program Explainer Step
 */
@Component({
  tag: "sqm-program-explainer-step",
  shadow: true,
})
export class ProgramExplainerStep {
  /**
   * @uiName Title
   */
  @Prop() title: string;

  /**
   * @uiName Description
   */
  @Prop() description: string;

  /**
   * @uiName Color
   */
  @Prop() color: string;

  /**
   * @uiName Background
   */
  @Prop() background: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return <ProgramExplainerStepView {...getProps(this)} />;
  }
}
