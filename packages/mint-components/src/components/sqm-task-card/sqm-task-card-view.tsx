import { h, VNode } from "@stencil/core";
import { DateTime } from "luxon";
import { intl } from "../../global/global";
import { createStyleSheet } from "../../styling/JSS";
import { luxonLocale } from "../../utils/utils";
import { Details } from "./DetailsView";
import { ProgressBarView } from "./progress-bar/progress-bar-view";
import * as SVGs from "./SVGs";

export type TaskCardViewProps = {
  content: {
    rewardAmount: string;
    cardTitle: string;
    description: string;
    showProgressBar: boolean;
    repeatable: boolean;
    steps: boolean;
    finite: number;
    goal: number;
    completedText: string;
    expiryMessage: string;
    rewardDuration?: string;
    displayDuration?: string;
    startsOnMessage: string;
    endedMessage: string;
    rewardUnit: string;
    buttonText: string;
    buttonLink: string;
    openNewTab: boolean;
    eventKey?: string;
    hideButton?: boolean;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    borderRadius?: number;
    buttonStyle?: "primary" | "secondary";
  };
  states: {
    loading: boolean;
    loadingEvent: boolean;
    progress: number;
    locale?: string;
  };
  callbacks?: {
    sendEvent: (event: string) => void;
    onClick: () => void;
  };
};

export function TaskCardView(props: TaskCardViewProps): VNode {
  const { callbacks, states, content } = props;

  const style = {
    TaskCard: {
      display: "inline-block",
      width: "100%",
      "& .main": {
        position: "relative",
        boxSizing: "border-sizing",
        background: content.backgroundColor || "var(--sl-color-neutral-0)",
        border: `1px solid ${
          content.borderColor || "var(--sl-color-neutral-200)"
        }`,
        borderRadius: "var(--sl-border-radius-large)",
        boxShadow: "1px 2px 4px rgba(211, 211, 211, 0.2)",
        fontSize: "var(--sl-font-size-small)",
        lineHeight: "var(--sl-line-height-dense)",
        color: content.textColor || "var(--sqm-text)",
      },
      "& .main.complete": {
        background: content.backgroundColor || "var(--sl-color-primary-50)",
        borderColor: content.borderColor || "var(--sl-color-primary-500)",
      },
      "& .main.expired": {
        color: content.textColor || "var(--sqm-text)",
        background: content.backgroundColor || "var(--sl-color-neutral-50)",
      },
      "& .title": {
        fontSize: "var(--sl-font-size-medium)",
        color: content.textColor || "var(--sqm-text)",
      },
      "& .container": {
        margin: "var(--sl-spacing-medium)",
      },
      "& .container.subdued": {
        opacity: "0.45",
      },
      "& .container > div": {
        margin: "var(--sl-spacing-medium) 0",
      },
    },
    NotStarted: {
      fontSize: "var(--sl-font-size-small)",
      padding: "var(--sl-spacing-medium)",
      color: content.textColor || "var(--sl-color-primary-600)",
      border: `1px solid ${
        content.borderColor || "var(--sl-color-neutral-200)"
      }`,
      borderRadius:
        "var(--sl-border-radius-large) var(--sl-border-radius-large) 0 0",
      borderBottom: "none",
      background: content.backgroundColor || "var(--sl-color-primary-50)",
      fontWeight: "var(--sl-font-weight-semibold)",
      lineHeight: "var(--sl-line-height-dense)",
      "& .icon": {
        position: "relative",
        top: "0.1em",
        marginRight: "var(--sl-spacing-small)",
        color: content.textColor || "var(--sl-color-primary-500)",
      },
    },
    Ended: {
      fontSize: "var(--sl-font-size-small)",
      padding: "var(--sl-spacing-medium)",
      color: content.textColor || "var(--sl-color-warning-600)",
      border: `1px solid ${
        content.borderColor || "var(--sl-color-neutral-200)"
      }`,
      borderRadius:
        "var(--sl-border-radius-large) var(--sl-border-radius-large) 0 0",
      borderBottom: "none",
      background: content.backgroundColor || "var(--sl-color-warning-50)",
      fontWeight: "var(--sl-font-weight-semibold)",
      lineHeight: "var(--sl-line-height-dense)",
      "& .icon": {
        position: "relative",
        top: "0.1em",
        marginRight: "var(--sl-spacing-small)",
        color: content.textColor || "var(--sl-color-warning-500)",
      },
    },
    Header: {
      display: "flex",
      "& .icon": {
        position: "relative",
        top: "5%",
        alignSelf: "center",
        lineHeight: "0",
        color: content.textColor || "var(--sl-color-primary-400)",
        fontSize: "var(--sl-font-size-large)",
        marginRight: "var(--sl-spacing-x-small)",
      },
      "& .value": {
        alignSelf: "center",
        fontSize: "var(--sl-font-size-x-large)",
        fontWeight: "var(--sl-font-weight-semibold)",
        color: content.textColor || "var(--sqm-text)",
        lineHeight: "100%",
        marginRight: "var(--sl-spacing-xx-small)",
      },

      "& .text": {
        alignSelf: "end",
        textTransform: "uppercase",
        fontSize: "var(--sl-font-size-x-small)",
        color: content.textColor || "var(--sqm-text)",
        lineHeight: "var(--sl-font-size-medium)",
        marginRight: "var(--sl-spacing-xx-small)",
      },
      "& .end": {
        color: content.textColor || "var(--sl-color-warning-500)",
        fontWeight: "var(--sl-font-weight-semibold)",
        marginBottom: "var(--sl-spacing-xx-small)",
      },
      "& .neutral": {
        color: content.textColor || "var(--sl-color-neutral-400)",
      },
    },
    Footer: {
      "&[data-subdue] .success": {
        color: content.textColor || "var(--sl-color-primary-300)",
      },
      "&[data-subdue] .neutral": {
        color: content.textColor || "var(--sqm-text)",
      },
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
        color: content.textColor || "var(--sqm-text)",
      },
      "& .success": {
        color: content.textColor || "var(--sl-color-primary-500)",
        fontWeight: "var(--sl-font-weight-semibold)",
      },
      "& .action": {
        marginTop: "auto",
        marginLeft: "auto",
        "&::part(base)": {
          color:
            content.buttonStyle === "secondary"
              ? content.textColor || "var(--sqm-text)"
              : "white", // Example for buttonStyle
          background:
            content.buttonStyle === "primary"
              ? content.backgroundColor || "var(--sl-color-primary-500)"
              : "transparent",
          border: `1px solid ${
            content.borderColor || "var(--sl-color-primary-500)"
          }`, // Example for buttonStyle
        },
        "&.disabled::part(base)": {
          border: `1px solid ${
            content.borderColor || "var(--sl-color-primary-400)"
          }`,
          background: content.backgroundColor || "var(--sl-color-primary-400)",
        },
        "&.neutral::part(base)": {
          border: `1px solid ${content.borderColor || "var(--sqm-text)"}`,
          background: content.backgroundColor || "var(--sqm-text)",
        },
      },
      "& .neutral": {
        color: content.textColor || "var(--sqm-text)",
      },
      "& .datetime": {
        display: "block",
        marginTop: "var(--sl-spacing-xx-small)",
      },
    },
  };

  const sheet = createStyleSheet(style);
  const contenttring = sheet.toString();

  const dateStart =
    content.rewardDuration &&
    DateTime.fromISO(content.rewardDuration.split("/")[0]);
  const dateEnd =
    content.rewardDuration &&
    DateTime.fromISO(content.rewardDuration.split("/")[1]);
  const dateToday = DateTime.now();

  if (content.displayDuration) {
    const start = content.displayDuration.split("/")?.[0];
    const end = content.displayDuration.split("/")?.[1];
    const displayDateStart = start ? DateTime.fromISO(start) : dateToday;
    const displayDateEnd = end ? DateTime.fromISO(end) : dateToday;
    if (dateToday < displayDateStart || dateToday > displayDateEnd)
      return <span></span>;
  }

  const checkmark_circle = SVGs.checkmark_circle();
  const checkmark_filled = SVGs.checkmark_filled();
  const arrow_left_right = SVGs.arrow_left_right();

  const showComplete = states.progress >= content.goal;
  const repetitions = content.showProgressBar
    ? Math.floor(states.progress / content.goal)
    : states.progress;

  const taskComplete =
    (showComplete && content.repeatable === false) ||
    (content.finite && states.progress >= content.finite * content.goal);
  const taskEnded = content.rewardDuration && dateEnd <= dateToday;
  const taskNotStarted = content.rewardDuration && dateToday <= dateStart;
  const taskUnavailable = taskEnded || taskNotStarted;

  const vanillaStyle = `
	:host{
		display: block;
		margin-bottom: var(--sl-spacing-large);
	}

  `;

  return (
    <div class={sheet.classes.TaskCard} part="sqm-base">
      <style type="text/css">
        {contenttring}
        {vanillaStyle}
      </style>
      {!states.loading && taskNotStarted && (
        <div class={sheet.classes.NotStarted}>
          <span class="icon">
            <sl-icon name="info-circle-fill"></sl-icon>
          </span>

          {intl.formatMessage(
            {
              id: "startsOnMessage",
              defaultMessage: content.startsOnMessage,
            },
            {
              startDate: dateStart
                .setLocale(luxonLocale(states.locale))
                .toLocaleString(DateTime.DATETIME_MED),
            }
          )}
        </div>
      )}
      {!states.loading && taskEnded && (
        <div class={sheet.classes.Ended}>
          <span class="icon">
            <sl-icon
              exportparts="base: task-card-icon"
              name="exclamation-triangle-fill"
            ></sl-icon>
          </span>
          {intl.formatMessage(
            {
              id: "endedMessage",
              defaultMessage: content.endedMessage,
            },
            {
              endDate: dateEnd
                .setLocale(luxonLocale(states.locale))
                .toLocaleString(DateTime.DATETIME_MED),
            }
          )}
        </div>
      )}
      <div
        part="sqm-style-container"
        style={{
          borderRadius:
            taskUnavailable &&
            "0 0 var(--sl-border-radius-large) var(--sl-border-radius-large)",
        }}
        class={
          taskUnavailable
            ? "main expired"
            : taskComplete
            ? "main complete"
            : "main"
        }
      >
        <div
          class="container"
          part="sqm-card-container"
          data-subdue={taskComplete || taskUnavailable}
        >
          <div
            class={sheet.classes.Header}
            style={{ opacity: taskComplete || taskUnavailable ? "0.45" : "1" }}
          >
            {states.loading ? (
              <sl-skeleton style={{ width: "22%", margin: "0" }} />
            ) : (
              <div>
                {showComplete && (
                  <span class={taskUnavailable ? "icon neutral" : "icon"}>
                    {taskComplete ? checkmark_filled : checkmark_circle}
                  </span>
                )}
                <span part="sqm-value" class={"value"}>
                  {content.rewardAmount}
                </span>
                <span part="sqm-unit" class="text">
                  {content.rewardUnit}
                </span>
              </div>
            )}
          </div>

          {states.loading ? (
            <sl-skeleton
              style={{ width: "42%", margin: "var(--sl-spacing-medium) 0" }}
            />
          ) : (
            <div
              class={"title"}
              part="sqm-title"
              style={{
                marginBottom: !content.description
                  ? content.steps
                    ? "var(--sl-spacing-x-large)"
                    : content.showProgressBar
                    ? "var(--sl-spacing-xx-large)"
                    : ""
                  : "",
                opacity: taskComplete || taskUnavailable ? "0.45" : "1",
              }}
            >
              {content.cardTitle}
            </div>
          )}
          {states.loading ? (
            <sl-skeleton style={{ margin: "var(--sl-spacing-medium) 0" }} />
          ) : (
            content.description && (
              <Details
                {...props}
                opacity={taskComplete || taskUnavailable ? "0.45" : "1"}
              />
            )
          )}
          {content.showProgressBar && states.loading ? (
            <sl-skeleton style={{ margin: "var(--sl-spacing-medium) 0" }} />
          ) : (
            content.showProgressBar && (
              <ProgressBarView
                {...props.content}
                {...props.states}
                opacity={taskComplete || taskUnavailable ? "0.45" : "1"}
                complete={taskComplete}
                expired={taskUnavailable}
              />
            )
          )}
          <div
            class={sheet.classes.Footer}
            data-subdue={taskComplete || taskUnavailable}
          >
            {states.loading ? (
              <sl-skeleton style={{ width: "25%", marginLeft: "auto" }} />
            ) : (
              <div style={{ display: "contents" }}>
                <span class="text">
                  {content.repeatable && (
                    <div>
                      <span
                        class={
                          repetitions > 0
                            ? taskUnavailable
                              ? "icon neutral"
                              : "icon success"
                            : "icon neutral"
                        }
                        data-subdue={taskComplete || taskUnavailable}
                      >
                        {arrow_left_right}
                      </span>
                      <span
                        class={
                          repetitions > 0
                            ? taskUnavailable
                              ? "neutral"
                              : "success"
                            : "neutral"
                        }
                        data-subdue={taskComplete || taskUnavailable}
                      >
                        {intl.formatMessage(
                          {
                            id: "completedMessage",
                            defaultMessage: content.completedText,
                          },
                          {
                            finite: content.finite,
                            count: content.finite
                              ? Math.min(repetitions, content.finite)
                              : repetitions,
                          }
                        )}
                      </span>
                    </div>
                  )}
                  {dateEnd && !taskUnavailable && (
                    <span
                      class="datetime neutral"
                      data-subdue={taskComplete || taskUnavailable}
                    >
                      {intl.formatMessage(
                        {
                          id: "expiryMessage",
                          defaultMessage: content.expiryMessage,
                        },
                        {
                          endDate: dateEnd
                            .setLocale(luxonLocale(states.locale))
                            .toLocaleString(DateTime.DATETIME_MED),
                        }
                      )}
                    </span>
                  )}
                </span>
                {content.hideButton ? (
                  ""
                ) : (
                  <sl-button
                    exportparts="base: primarybutton-base"
                    id="sl-button"
                    class={
                      taskUnavailable
                        ? "action neutral"
                        : taskComplete
                        ? "action disabled"
                        : "action"
                    }
                    type="primary"
                    size="small"
                    onClick={callbacks.onClick}
                    loading={states.loadingEvent}
                    disabled={taskComplete || taskUnavailable}
                    style={{
                      opacity: taskComplete || taskUnavailable ? "0.45" : "1",
                    }}
                  >
                    {content.buttonText}
                  </sl-button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
