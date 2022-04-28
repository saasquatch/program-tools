import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { ProgramExplainerView } from "./sqm-program-explainer-view";

/**
 * @uiName Program Explainer
 * @exampleGroup Common Components
 * @slot [{"name":"", "title":"Explainer", "validChildren":["sqm-program-explainer-step"]}]
 * @examples Program Explainer - <sqm-program-explainer header="How it works"><sqm-program-explainer-step description="Complete tasks like uploading your first video or sharing videos with friends" header="Earn points" icon="cash-stack" text-color="#000000"></sqm-program-explainer-step><sqm-program-explainer-step description="Use your points and redeem rewards like one free month of Enterprise or a visa giftcard" header="Redeem rewards" icon="people" text-color="#000000"></sqm-program-explainer-step></sqm-program-explainer>
 */
@Component({
  tag: "sqm-program-explainer",
  shadow: true,
})
export class ProgramExplainer {
  @State()
  ignored = true;

  /**
   * @uiName Header Text
   */
  @Prop() header: string;

  /**
   * @uiName Header Text Color
   * @uiWidget color
   */
  @Prop() textColor: string;

  /**
   * @uiName Header Background Color
   * @uiWidget color
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
