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
 * @validParents ["sqm-card-feed"]
 */
@Component({
  tag: "sqm-task-card",
  shadow: true,
})
export class TaskCard {
  @State()
  ignored = true;

  /**
   * @uiName Reward amount
   * @uiGroup Reward
   */
  @Prop()
  rewardAmount: string = "0";

  /**
   * @uiName Reward unit
   * @uiGroup Reward
   */
  @Prop()
  rewardUnit: string = "Points";

  /**
   * @uiName Title
   * @uiGroup Task
   */
  @Prop()
  cardTitle: string = "Title Text";

  /**
   * @uiName Description
   * @uiGroup Task
   */
  @Prop()
  description: string = "";

  /**
   * @uiName Goal repeatable
   * @uiGroup Goal
   * @default
   */
  @Prop()
  repeatable: boolean = false;

  /**
   * The number of times a task can be completed when repeatable.  Use zero for no limit (the default).
   *
   * @uiName Repeat amount
   * @uiGroup Reward
   */
  @Prop()
  finite: number = 0;

  /**
   * @uiName Show progress bar
   * @uiGroup Goal
   * @default
   */
  @Prop()
  showProgressBar: boolean = false;

  /**
   * Sets the goal for users progress to know when a task has been completed. If repeatable is checked, repeatable goals is an increment of this.
   *
   * @uiName Goal completion number
   * @uiGroup Goal
   */
  @Prop()
  goal: number = 1;

  /**
   * @uiName Progress bar steps
   * @uiGroup Goal
   * @default
   */
  @Prop()
  steps: boolean = false;

  /**
   * The unit displayed to the right of steps and progress numbers on the progress bar. Ex: $ for dollars
   *
   * @uiName Progress bar unit
   * @uiGroup Goal
   */
  @Prop()
  progressBarUnit: string = "";

  /**
   * Displayed when a user views a task card after the reward duration interval.
   *
   * @uiName Expiry date message
   * @uiGroup Task
   */
  @Prop() expiryMessage: string = "Ends {endDate}";

  /**
   * Task cards are disabled to users outside of the duration. They are not disabled if no duration is configured.
   *
   * @uiName Reward duration
   * @uiWidget dateRange
   * @uiWidgetOptions {"allowPastDates":true, "months": 1}
   * @uiGroup Reward
   */
  @Prop() rewardDuration: string;

  /**
   * Shown to users before the start of the task duration.
   *
   * @uiName Start date message
   * @uiGroup Task
   */
  @Prop() startsOnMessage: string = "Starts {startDate}";

  /**
   * Task cards are hidden from users outside of the duration. They are always displayed if no duration is configured.
   *
   * @uiName Display duration
   * @uiWidget dateRange
   * @uiWidgetOptions {"allowPastDates":true, "months": 1}
   * @uiGroup Task
   */
  @Prop() displayDuration: string;

  /**
   * Shown to users after the end of the task duration.
   *
   * @uiName Ended date message
   * @uiGroup Task
   */
  @Prop() endedMessage: string = "Ended {endDate}";

  /**
   * Displays the amount of times that a user has completed a repeatable task.
   *
   * @uiName Completed count text
   * @uiGroup Task
   * @uiWidget textArea
   */
  @Prop() completedText: string =
    "Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}";

  /**
   * @uiName Button text
   * @uiGroup Button
   */
  @Prop()
  buttonText: string = "Complete Action";

  /**
   * @uiName Button link
   * @uiGroup Button
   */
  @Prop()
  buttonLink: string;

  /**
   * Button link opens in new tab
   * @uiName Open in new tab
   * @uiGroup Button
   * @default
   */
  @Prop()
  openNewTab: boolean = false;

  /**
   * Select what type of stat to display for the goal. Manual paths are also supported.
   *
   * @uiName Goal progress source
   * @required
   * @minLength 1
   * @uiWidget statTypeSelectWidget
   * @uiWidgetOptions {"version": 1.1}
   * @uiGroup Goal
   */
  @Prop()
  statType: string;

  /**
   * Optionally send an event to SaaSquatch when a user clicks the button. Enter your event key into this field.
   *
   * @uiName Task card button event key
   * @uiGroup Button
   */
  @Prop() eventKey?: string;

  /**
   * The ID of the program that is used to scope the task card. When no ID is specified, it defaults to the program context in which the component is rendered.
   *
   * @uiName Program ID override
   * @uiWidget programSelector
   * @uiGroup Goal
   */
  @Prop() programId?: string;

  /**
   * @uiName Hide CTA button
   * @uiGroup Button
   */
  @Prop() hideButton?: boolean = false;

  /**
   * @uiName Card Background color
   * @uiWidget color
   * @uiGroup Style
   */
  @Prop()
  backgroundColor?: string;

  /**
   * @uiName Text color
   * @uiWidget color
   * @uiGroup Style
   */
  @Prop()
  textColor?: string;

  /**
   * @uiName Border color
   * @uiWidget color
   * @uiGroup Style
   */
  @Prop()
  borderColor?: string;

  /**
   * @uiName Border radius
   * @uiType number
   * @uiGroup Style
   */
  @Prop()
  borderRadius?: number;

  /**
   * @uiName Button Style
   * @uiType string
   * @uiEnum ["primary", "secondary"]
   * @uiEnumNames ["Primary", "Secondary"]
   * @uiGroup Style
   */
  @Prop()
  buttonType?: "primary" | "secondary" = "primary";

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
      content: { ...props },
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
