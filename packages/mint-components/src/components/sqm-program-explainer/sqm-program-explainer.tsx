import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, State } from "@stencil/core";
import {
  ProgramExplainerView
} from "./sqm-program-explainer-view";

/**
 * A holder for navigation menu items
 * 
 * @uiName Navigation Sidebar
 */
@Component({
  tag: "sqm-program-explainer",
  shadow: true,
})
export class ProgramExplainer {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return (
      <ProgramExplainerView>
        <slot />
      </ProgramExplainerView>
    );
  }
}