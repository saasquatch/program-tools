import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { ProgramExplainerView } from "./sqm-program-explainer-view";

/**
 * @uiName Program Explainer
 * @validParents ["sqm-portal-container","div","sqm-divided-layout","sqm-brand","template","sqb-program-section","sqb-conditional-section"]
 * @validChildren ["sqm-program-explainer-step"]
 * @exampleGroup Common Components
 * @slots [{"name":"", "title":"Explainer", "validChildren":["sqm-program-explainer-step"]}]
 * @example Program Explainer - <sqm-program-explainer header="How it works"><sqm-program-explainer-step description="Explore and use our product while earning points in the process!" header="Earn points" icon="cash-stack"></sqm-program-explainer-step><sqm-program-explainer-step description="Use your points and redeem rewards like one free month of Enterprise or a visa giftcard" header="Redeem rewards" icon="people"></sqm-program-explainer-step></sqm-program-explainer>
 */
@Component({
  tag: "sqm-program-explainer",
  shadow: true,
})
export class ProgramExplainer {
  @State()
  ignored = true;

  /**
   * @uiName Header text
   */
  @Prop() header: string;

  /**
   * @uiName Header text color
   * @uiWidget color
   * @format color
   */
  @Prop() textColor: string;

  /**
   * @uiName Header background color
   * @uiWidget color
   * @format color
   */
  @Prop() backgroundColor: string;

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
