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
   * @uiName Reward Points
   */
  @Prop()
  points: number = 0;

  /**
   * @uiName Title Text
   */
  @Prop()
  cardTitle: string = "Title Text";

  /**
   * @uiName Description Text
   */
  @Prop()
  description: string = "Description Text";

  /**
   * @uiName Set Repeatable
   */
  @Prop()
  repeatable: boolean = false;

  /**
   * @uiName Show Progress Bar
   */
  @Prop()
  showProgressBar: boolean = false;

  /**
   * @uiName Progress Bar Goal
   */
  @Prop()
  goal: number = 1;

  /**
   * @uiName Progress Bar Steps
   */
  @Prop()
  steps: number;

  /**
   * @uiName Progress Bar Unit
   */
  @Prop()
  unit?: string;

  /**
   * @uiName Show Expiry
   */
  @Prop()
  expire: boolean = false;

  /**
   * @uiName Expire Date
   */
  @Prop()
  dateExpire?: string;

  /**
   * @uiName Button Text
   */
  @Prop()
  buttonText: string;

  /**
   * @uiName Button Link
   */
  @Prop()
  buttonLink: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    //const progress = useTaskCard(); progress={progress}
    return <TaskCardView {...getProps(this)}></TaskCardView>;
  }
}
