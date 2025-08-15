import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { ProgramExplainerStepView } from "./sqm-program-explainer-step-view";

/**
 * @uiName Program Explainer Step
 * @exampleGroup Common Components
 * @example Program Explainer Step - <sqm-program-explainer-step description="Explore and use our product while earning points in the process!" header="Earn points" icon="cash-stack"></sqm-program-explainer-step>
 * @validParents ["sqm-program-explainer"]
 */
@Component({
  tag: "sqm-program-explainer-step",
  shadow: true,
})
export class ProgramExplainerStep {
  /**
   * @uiName Title
   */
  @Prop() header: string;

  /**
   * @uiName Description
   * @uiWidget textArea
   */
  @Prop() description: string;

  /**
   * @uiName Text color
   * @uiWidget color
   * @format color
   */
  @Prop() textColor?: string;

  /**
   * @uiName Background color
   * @uiWidget color
   * @format color
   */
  @Prop() backgroundColor?: string;

  /**
   * Amount in pixels
   * @uiName Border radius
   * @type number
   */
  @Prop() borderRadius?: number;

  /**
   * @uiName Icon Background color
   * @uiWidget color
   * @format color
   */
  @Prop() iconBackgroundColor?: string;

  /**
   * @uiName Icon color
   * @uiWidget color
   * @format color
   */
  @Prop() iconColor?: string;

  /**
   * Displayed in place of an icon
   *
   * @uiName Image URL
   * @uiWidget imageUpload
   * @format url
   */
  @Prop() imageUrl?: string;

  /**
   * Full list of valid icon names available in the [Shoelace Icon Library](https://shoelace.style/components/icon). This value is case sensitive.
   *
   * @uiName Icon
   */
  @Prop() icon?: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return <ProgramExplainerStepView {...getProps(this)} />;
  }
}
