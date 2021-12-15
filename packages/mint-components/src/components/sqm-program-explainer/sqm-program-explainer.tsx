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
   * @uiName Header Text
   */
  @Prop() header: string;

  /**
   * @uiName Header Text Color
   * @uiWidget color
   */
  @Prop() headerColor: string;

  /**
   * @uiName Header Background Color
   * @uiWidget color
   */
  @Prop() headerBackground: string;

  /**
   * @uiName Card Title
   */
  @Prop() cardTitle: string;

  /**
   * @uiName Card Description
   */
  @Prop() cardDescription: string;

  /**
   * @uiName Card Text Color
   * @uiWidget color
   */
  @Prop() cardColor: string;

  /**
   * @uiName Card Background Color
   * @uiWidget color
   */
  @Prop() cardBackground: string;

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
