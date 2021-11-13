import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, State } from "@stencil/core";


/**
 * @uiName Task Card
 */
@Component({
  tag: "sqm-task-card",
  shadow: true,
})
export class TaskCard {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}


  render() {
    return <div />;
  }
}
