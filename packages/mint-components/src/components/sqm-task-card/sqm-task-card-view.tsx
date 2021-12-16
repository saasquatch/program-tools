import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { HostBlock } from "../../global/mixins";
import * as SVGs from "./SVGs";
import {
  ProgressBarProps,
  ProgressBarView,
} from "./progress-bar/progress-bar-view";
import { DateTime } from "luxon";

export type TaskCardViewProps = {
  rewardAmount: string;
  cardTitle: string;
  description: string;
  showProgressBar: boolean;
  repeatable: boolean;
  finite: number;
  showExpiry: boolean;
  rewardDuration: string;
  rewardUnit: string;
  buttonText: string;
  buttonLink: string;
  openNewTab: boolean;
  loading: boolean;
} & ProgressBarProps;

export function TaskCardView(props: TaskCardViewProps): VNode {

  const checkmark_circle = SVGs.checkmark_circle();
  const checkmark_filled = SVGs.checkmark_filled();
  const arrow_left_right = SVGs.arrow_left_right();

  const style = {
    // HostBlock: {
    //   ":host": {
    //     display: "inline-block",
    //   },
    // },
    TaskCard: {
      display: "inline-block",
      width: "100%",
      "& .main": {
        position: "relative",
        boxSizing: "border-box",
        // minWidth: "347px",
        background: "var(--sl-color-neutral-0)",
        border: "1px solid var(--sl-color-neutral-200)",
        borderRadius: "var(--sl-border-radius-medium)",
        fontSize: "var(--sl-font-size-small)",
        lineHeight: "var(--sl-line-height-dense)",
        color: "var(--sl-color-neutral-600)",
      },
      "& .main.complete": {
        background: "var(--sl-color-primary-50)",
        borderColor: "var(--sl-color-primary-500)",
      },
      "& .main.expired": {
        color: "var(--sl-color-neutral-400)",
        background: "var(--sl-color-neutral-50)",
      },
      "& .title": {
        fontSize: "var(--sl-font-size-medium)",
        fontWeight: "var(--sl-font-weight-semibold)",
        color: "var(--sl-color-neutral-950)",
      },
      "& .container": {
        margin: "var(--sl-spacing-medium)",
      },
      "& .container.subdued": {
        opacity: "0.66",
      },
      "& .container > div": {
        margin: "var(--sl-spacing-medium) 0",
      },
    },
    Expired: {
      margin: "var(--sl-spacing-medium)",
      marginBottom: "calc(var(--sl-spacing-x-small)*-1)",
      color: "var(--sl-color-warning-600)",
      fontWeight: "var(--sl-font-weight-semibold)",
    },
    Header: {
      display: "flex",
      "& .icon": {
        position: "relative",
        top: "5%",
        alignSelf: "center",
        lineHeight: "0",
        color: "var(--sl-color-primary-400)",
        fontSize: "var(--sl-font-size-large)",
        marginRight: "var(--sl-spacing-x-small)",
      },
      "& .value": {
        alignSelf: "center",
        fontSize: "var(--sl-font-size-x-large)",
        fontWeight: "var(--sl-font-weight-semibold)",
        color: "var(--sl-color-neutral-950)",
        lineHeight: "100%",
        marginRight: "var(--sl-spacing-xx-small)",
      },
      "& .text": {
        alignSelf: "end",
        textTransform: "uppercase",
        fontSize: "var(--sl-font-size-x-small)",
        color: "var(--sl-color-neutral-950)",
        lineHeight: "var(--sl-font-size-medium)",
        marginRight: "var(--sl-spacing-xx-small)",
      },
      "& .end": {
        color: "var(--sl-color-warning-500)",
        fontWeight: "var(--sl-font-weight-semibold)",
        marginBottom: "var(--sl-spacing-xx-small)",
      },
      "& .neutral": {
        color: "var(--sl-color-neutral-400)",
      },
    },
    Footer: {
      display: "flex",
      "& .icon": {
        fontSize: "var(--sl-font-size-xx-small)",
        marginRight: "var(--sl-spacing-xx-small)",
        verticalAlign: "middle",
      },
      "& .text": {
        marginTop: "auto",
        verticalAlign: "text-bottom",
        fontSize: "var(--sl-font-size-x-small)",
      },
      "& .success": {
        color: "var(--sl-color-primary-500)",
        fontWeight: "var(--sl-font-weight-semibold)",
      },
      "& .action": {
        marginTop: "auto",
        marginLeft: "auto",
        "&::part(base)": {
          color: "var(--sl-color-neutral-0)",
          borderRadius: "var(--sl-border-radius-medium)",
        },
        "&.disabled::part(base)": {
          border: "1px solid var(--sl-color-primary-400)",
          background: "var(--sl-color-primary-400)",
        },
        "&.neutral::part(base)": {
          border: "1px solid var(--sl-color-neutral-400)",
          background: "var(--sl-color-neutral-400)",
        },
      },
      "& .neutral": {
        color: "var(--sl-color-neutral-400)",
      },
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  const showComplete = props.progress >= props.goal;
  const repetitions = props.showProgressBar
    ? Math.floor(props.progress / props.goal)
    : props.progress;

  const dateStart =
    props.showExpiry && DateTime.fromISO(props.rewardDuration.split("/")[0]);
  const dateEnd =
    props.showExpiry && DateTime.fromISO(props.rewardDuration.split("/")[1]);
  const dateToday = DateTime.now();

  const taskComplete =
    (showComplete && props.repeatable === false) ||
    (props.finite && props.progress >= props.finite * props.goal);
  const taskEnded = props.showExpiry && dateEnd <= dateToday;
  const taskNotStarted = props.showExpiry && dateToday <= dateStart;
  const taskUnavailable = taskEnded || taskNotStarted;

  return (
    <div class={sheet.classes.TaskCard}>
      <div
        class={
          taskUnavailable
            ? "main expired"
            : taskComplete
            ? "main complete"
            : "main"
        }
      >
        <style type="text/css">{styleString}</style>
        {taskUnavailable && (
          <div class={sheet.classes.Expired}>
            {taskEnded
              ? "Ended " + dateEnd.toLocaleString(DateTime.DATE_MED)
              : "Starts " + dateStart.toLocaleString(DateTime.DATE_MED)}
          </div>
        )}
        <div
          class={
            taskComplete || taskUnavailable ? "container subdued" : "container"
          }
        >
          <div class={sheet.classes.Header}>
            {props.loading ? (
              <sl-skeleton style={{ width: "22%", margin: "0" }} />
            ) : (
              <div>
                {showComplete && (
                  <span class={taskUnavailable ? "icon neutral" : "icon"}>
                    {taskComplete ? checkmark_filled : checkmark_circle}
                  </span>
                )}
                <span class={"value"}>{props.rewardAmount}</span>
                <span class="text">{props.rewardUnit}</span>
              </div>
            )}
          </div>

          {props.loading ? (
            <sl-skeleton
              style={{ width: "42%", margin: "var(--sl-spacing-medium) 0" }}
            />
          ) : (
            <div class={"title"}>{props.cardTitle}</div>
          )}
          {props.loading ? (
            <sl-skeleton style={{ margin: "var(--sl-spacing-medium) 0" }} />
          ) : (
            <Details {...props} />
          )}
          {props.showProgressBar && props.loading ? (
            <sl-skeleton style={{ margin: "var(--sl-spacing-medium) 0" }} />
          ) : (
            props.showProgressBar && (
              <ProgressBarView
                {...props}
                complete={taskComplete}
                expired={taskUnavailable}
              />
            )
          )}
          <div class={sheet.classes.Footer}>
            {props.loading ? (
              <sl-skeleton style={{ width: "25%", marginLeft: "auto" }} />
            ) : (
              <div style={{ display: "contents" }}>
                <span class="text">
                  {props.repeatable && (
                    <div>
                      <span
                        class={
                          repetitions > 0
                            ? taskUnavailable
                              ? "icon neutral"
                              : "icon success"
                            : "icon"
                        }
                      >
                        {arrow_left_right}
                      </span>
                      <span
                        class={
                          repetitions > 0
                            ? taskUnavailable
                              ? "neutral"
                              : "success"
                            : ""
                        }
                      >
                        {"Completed " +
                          (props.finite
                            ? Math.min(repetitions, props.finite)
                            : repetitions) +
                          (props.finite ? "/" + props.finite : "") +
                          " times"}
                      </span>
                    </div>
                  )}
                  {props.showExpiry && !taskUnavailable && (
                    <span>
                      {"Ends " + dateEnd.toLocaleString(DateTime.DATE_FULL)}
                    </span>
                  )}
                </span>

                <sl-button
                  class={
                    taskUnavailable
                      ? "action neutral"
                      : taskComplete
                      ? "action disabled"
                      : "action"
                  }
                  type="primary"
                  size="small"
                  onClick={() =>
                    props.openNewTab
                      ? window.open(props.buttonLink)
                      : window.open(props.buttonLink, "_parent")
                  }
                  disabled={taskComplete || taskUnavailable}
                >
                  {props.buttonText}
                </sl-button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Details(props): VNode {
  const style = {
    Description: {
      "& input[type=checkbox]": {
        display: "none",
      },
      "& input:checked ~ .details": {
        transform: "rotate(-180deg)",
      },
      "& .details": {
        position: "absolute",
        top: "var(--sl-spacing-medium)",
        right: "var(--sl-spacing-medium)",
        color: "var(--sl-color-neutral-700)",
        fontSize: "var(--sl-font-size-large)",
        "& :hover": {
          color: "var(--sl-color-primary-700)",
        },
        transformOrigin: "50% 37%",
        transition: "transform var(--sl-transition-medium) ease",
      },
      "& input:checked ~ .summary": {
        transition: "all var(--sl-transition-medium) ease",
        maxHeight: "300px",
        marginBottom: props.steps
          ? "var(--sl-spacing-x-large)"
          : props.showProgressBar
          ? "var(--sl-spacing-xx-large)"
          : "var(--sl-spacing-x-large)",
      },
      "& .summary": {
        display: "block",
        overflow: "hidden",
        fontSize: "var(--sl-font-size-small)",
        maxHeight: "0px",
        transition: "all var(--sl-transition-fast) ease-out",
        marginBottom: "var(--sl-spacing-medium)",
      },
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  const rid = Math.random().toString(36).slice(2);

  return (
    <div>
      <style type="text/css">{styleString}</style>
      <span class={sheet.classes.Description}>
        <input type="checkbox" id={"details-" + rid} />
        <label class="details" htmlFor={"details-" + rid}>
          <sl-icon name="chevron-down"></sl-icon>
        </label>
        <span class="summary">{props.description}</span>
      </span>
    </div>
  );
}
