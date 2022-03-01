import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";
import { BigStatViewProps } from "../sqm-big-stat/sqm-big-stat-view";
import { useBigStat } from "../sqm-big-stat/useBigStat";
import { useDemoBigStat } from "../sqm-big-stat/useDemoBigStat";
import { TaskCardView, TaskCardViewProps } from "./sqm-task-card-view";
import { useTaskCard } from "./useTaskCard";

/**
 * @uiName Task Card
 * @uiOrder ["reward-amount", "reward-unit", "card-title", "description", "repeatable", "finite", "show-progress-bar", "stat-type", "progress-source", "goal", "steps", "progress-bar-unit", "show-expiry", "reward-duration", "button-text", "button-link", "open-new-tab", "ended-message", "expiry-message", "starts-on-message", "event-key", "*"]
 */
@Component({
  tag: "sqm-task-card",
  shadow: true,
})
export class TaskCard {
  @State()
  ignored = true;

  /**
   * @uiName Reward Amount
   */
  @Prop()
  rewardAmount: string = "0";

  /**
   * @uiName Reward Unit
   */
  @Prop()
  rewardUnit: string = "Points";

  /**
   * @uiName Title Text
   */
  @Prop()
  cardTitle: string = "Title Text";

  /**
   * @uiName Description Text
   */
  @Prop()
  description: string = "";

  /**
   * @uiName Goal Repeatable
   */
  @Prop()
  repeatable: boolean = false;

  /**
   * The number of times a reward can be earned.  Use zero for no limit (the default).
   *
   * @uiName Repeat Amount
   */
  @Prop()
  finite: number = 0;

  /**
   * @uiName Show Progress Bar
   */
  @Prop()
  showProgressBar: boolean = false;

  /**
   * Sets the goal for users progress to know when a task has been completed. If repeatable is checked, repeatable goals is an increment of this.
   * 
   * @uiName Goal Completion Number
   */
  @Prop()
  goal: number = 1;

  /**
   * @uiName Progress Bar Steps
   */
  @Prop()
  steps: boolean = false;

  /**
   * @uiName Progress Bar Unit
   */
  @Prop()
  progressBarUnit: string = "";

  /**
   * @uiName Expiry Date Message
   */
  @Prop() expiryMessage: string = "Ends {endDate}";

  /**
   * @uiName Reward Duration
   * @uiWidget DateRange
   * @uiOptions {"allowPastDates":true, "months": 1}
   */
  @Prop() rewardDuration: string;

  /**
   * Shown to users before the start of the task duration.
   *
   * @uiName Start Date Message
   */
  @Prop() startsOnMessage: string = "Starts {startDate}";

  /**
   * Timeframe that the task card will be shown
   *
   * @uiName Display Duration
   * @uiWidget DateRange
   * @uiOptions {"allowPastDates":true, "months": 1}
   */
  @Prop() displayDuration: string;

  /**
   * Shown to users after the end of the task duration.
   *
   * @uiName Ended Date Message
   */
  @Prop() endedMessage: string = "Ended {endDate}";

  /**
   * Displays the amount of times that a user has completed a repeatable task.
   *
   * @uiName Completed Count Text
   */
  @Prop() completedText: string =
    "Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}";

  /**
   * @uiName CTA Button Text
   */
  @Prop()
  buttonText: string = "Complete Action";

  /**
   * @uiName CTA Button Link
   */
  @Prop()
  buttonLink: string;

  /**
   * @uiName CTA Button Link Open in New Tab
   */
  @Prop()
  openNewTab: boolean = false;

  /**
   * Select what type of stat to display for the goal. Manual paths are also supported.
   *
   * @uiWidget StatTypeSelectWidget
   * @uiName Goal Progress Source
   * @uiOptions {"version": 1.1}
   */
  @Prop()
  statType: string;

  /**
  * Optionally send an event to SaaSquatch when a user clicks the CTA. This field configured what key of the event sent is.
   * @uiName Event key of task card button
   */
  @Prop() eventKey?: string;

  /**
  * The ID of the program that is used to scope the task card. Defaults to the program context when no ID is specified.
   * @uiName Program ID override
   */
  @Prop() programId?: string;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<TaskCardViewProps | BigStatViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { props } = isDemo()
      ? useDemoBigStat(this)
      : useBigStat({ ...getProps(this), programId: this.programId });
    const { value, loading } = props;

    const { states, callbacks } = isDemo()
      ? useTaskCardDemo(this)
      : useTaskCard(this);

    return (
      <TaskCardView
        callbacks={callbacks}
        states={{
          loading,
          loadingEvent: states.loadingEvent,
          progress: value,
          locale: states.locale,
        }}
        content={{ ...getProps(this) }}
      ></TaskCardView>
    );
  }
}

function useTaskCardDemo(props: TaskCard) {
  return deepmerge(
    {
      states: { loadingEvent: false, locale: "en" },
      callbacks: {
        sendEvent: (event: string) => console.log(event),
        onClick: () => console.log("clicked"),
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
