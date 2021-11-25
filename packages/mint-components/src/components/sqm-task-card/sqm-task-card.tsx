import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";

import { TaskCardView } from "./sqm-task-card-view";

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

  /**
   * @uiName Number of Points Earned
   */
  @Prop()
  points: number = 0;

  /**
   * @uiName Title Text
   */
  @Prop()
  title: string;

  /**
   * @uiName Description Text
   */
  @Prop()
  description: string;

  /**
   * @uiName Show as Complete
   */
  @Prop()
  complete: boolean = false;

  /**
   * @uiName Show Repeatable or Repeat Count
   */
  @Prop()
  repeatable: boolean | number;

  /**
   * @uiName Expire Date
   */
  @Prop()
  expire?: string;

  /**
   * @uiName Button Text
   */
  @Prop()
  buttonText: string;

  /**
   * @uiName Button On Click Action
   */
  @Prop()
  onClick: () => void;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return <TaskCardView {...getProps(this)}></TaskCardView>;
  }
}
