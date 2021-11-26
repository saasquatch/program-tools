import { h, Host, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { HostBlock } from "../../global/mixins";
import * as SVGs from "./SVGs";

export type TaskCardViewProps = {
  points?: number; // set by the widget editor
  cardTitle?: string;
  description?: string;
  showProgressBar?: boolean;
  repeatable?: boolean;
  expire?: boolean;
  dateExpire?: string;
  buttonText?: string;
  buttonLink?: string;
} & ProgressBarProps;

// @ts-expect-error -- unused
export function TaskCardView(props: TaskCardViewProps, children: VNode): VNode {
  const {
    points = 0,
    cardTitle = "Title Text",
    description = "Description Text",
    showProgressBar = false,
    progress = 0,
    goal = 1,
    repeatable = false,
    expire = false,
    dateExpire = "",
    buttonText = "Button Text",
    buttonLink = "www.example.com",
  } = props;

  const checkmark_circle = SVGs.checkmark_circle();
  const arrow_left_right = SVGs.arrow_left_right();

  const style = {
    HostBlock: HostBlock,
    TaskCard: {
      "& .main > div": {
        margin: "var(--sl-spacing-medium)",
      },
      "& .main": {
        position: "relative",
        boxSizing: "border-box",
        minWidth: "347px",
        background: "var(--sl-color-white)",
        border: "1px solid var(--sl-color-gray-300)",
        borderRadius: "var(--sl-border-radius-medium)",
        fontSize: "var(--sl-font-size-small)",
        lineHeight: "var(--sl-line-height-dense)",
      },
      "& .main.complete": {
        background: "var(--sl-color-primary-50)",
        borderColor: "var(--sl-color-primary-700)",
      },
    },
    Header: {
      display: "flex",
      "& .icon": {
        alignSelf: "center",
        lineHeight: "0",
        color: "var(--sl-color-primary-700)",
        fontSize: "var(--sl-font-size-large)",
        marginRight: "var(--sl-spacing-x-small)",
      },
      "& .value": {
        alignSelf: "center",
        color: "var(--sl-color-black)",
        fontSize: "var(--sl-font-size-x-large)",
        fontWeight: "var(--sl-font-weight-semibold)",
        lineHeight: "100%",
        marginRight: "var(--sl-spacing-xx-small)",
      },
      "& .text": {
        alignSelf: "end",
        textTransform: "uppercase",
        color: "var(--sl-color-gray-600)",
        fontSize: "var(--sl-font-size-x-small)",
        lineHeight: "var(--sl-font-size-medium)",
        marginRight: "var(--sl-spacing-xx-small)",
      },
    },
    Title: {
      color: "var(--sl-color-black)",
      fontSize: "var(--sl-font-size-small)",
    },
    Footer: {
      display: "flex",
      "& .icon": {
        fontSize: "var(--sl-font-size-xx-small)",
        marginRight: "var(--sl-spacing-xx-small)",
      },
      "& .text": {
        marginTop: "auto",
        fontSize: "var(--sl-font-size-x-small)",
        color: "var(--sl-color-gray-600)",
      },
      "& .action": {
        marginTop: "auto",
        marginLeft: "auto",
      },
      "& sl-button.action::part(base) ": {
        color: "var(--sl-color-white)",
        background: "var(--sl-color-primary-500)",
        border: "1px solid var(--sl-color-primary-500)",
        borderRadius: "var(--sl-border-radius-medium)",
      },
    },
  };
  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  // if showProgressBar is false: progress >= goal
  // if true
  const showComplete = progress >= goal;
  const repetitions = showProgressBar ? Math.floor(progress / goal) : progress;

  return (
    <div class={sheet.classes.TaskCard}>
      <div class={showComplete ? "main complete" : "main"}>
        <style type="text/css">{styleString}</style>
        <div class={sheet.classes.Header}>
          {showComplete && (
            <span class="icon">
              {checkmark_circle}
              {/* <sl-icon name="check-circle"></sl-icon> */}
            </span>
          )}
          <span class="value">{points}</span>
          <span class="text">{"saasquatch points"}</span>
        </div>
        <div class={sheet.classes.Title}>{cardTitle}</div>
        {showProgressBar && <ProgressBar {...props} />}
        <Details description={description} />
        <div class={sheet.classes.Footer}>
          <span class="text">
            {repeatable && (
              <div>
                <span class="icon">
                  {arrow_left_right}
                  {/* <sl-icon name="arrow-left-right"></sl-icon> */}
                </span>
                <span>
                  {"Completed "}
                  {repetitions}
                  {" times"}
                </span>
                <br />
                <span>
                  {"Earned "}
                  {points * repetitions}
                  {" SaaSquatch Points"}
                </span>
              </div>
            )}
            {expire && (
              <span>
                <br />
                {"Ends "} {dateExpire}
              </span>
            )}
          </span>

          <sl-button
            class="action"
            size="small"
            onClick={() => alert(buttonLink)}
            disabled={showComplete}
          >
            {showComplete ? "Complete" : buttonText}
          </sl-button>
        </div>
      </div>
    </div>
  );
}

export type DetailsProps = {
  description: string;
};

function Details(props: DetailsProps): VNode {
  const style = {
    HostBlock: HostBlock,
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
        color: "var(--sl-color-gray-700)",
        fontSize: "var(--sl-font-size-large)",
        "& :hover": {
          color: "var(--sl-color-primary-700)",
        },
        transformOrigin: "50% 37%",
        transition: "transform var(--sl-transition-medium) ease",
      },
      "& input:checked ~ .summary": {
        transition: "max-height var(--sl-transition-medium) ease",
        maxHeight: "300px",
      },
      "& .summary": {
        display: "block",
        overflow: "hidden",
        color: "var(--sl-color-gray-700)",
        fontSize: "var(--sl-font-size-x-small)",
        maxHeight: "0px",
        transition: "max-height var(--sl-transition-fast) ease-out",
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

export type ProgressBarProps = {
  showProgressBar?: boolean;
  goal?: number;
  progress?: number;
  steps?: boolean;
  unit?: string;
  repeatable?: boolean;
};

export function ProgressBar(props: ProgressBarProps): VNode {
  const { goal, progress, steps, unit = "", repeatable } = props;

  const gift1 = SVGs.gift();
  const gift2 = SVGs.gift();
  const gift3 = SVGs.gift();

  // if progress and goal are not provided, there cannot be a progress bar
  // if (!showProgressBar) return;

  const items = [];
  var columns = "";
  var repetitions = Math.floor(progress / goal);

  if (repeatable) {
    if (steps) {
      addStepsRepeatable();
    } else {
      addLinearRepeatable();
    }
  }
  // non repetable
  else {
    if (steps) {
      addSteps();
    } else {
      addLinear();
    }
  }

  const style = {
    HostBlock: HostBlock,
    ProgressBar: {
      "& .progress-bar": {
        height: "15px",
        marginTop: "var(--sl-spacing-xx-large)",
        marginBottom: "var(--sl-spacing-xx-large)",
        marginRight: "var(--sl-spacing-x-small)",
        fontSize: "var(--sl-font-size-x-small)",
        display: "grid",
        gridTemplateColumns: columns,
        lineHeight: "45px",
        userSelect: "none",
      },
      "& .progress-bar.repeatable-steps": {
        marginLeft: "var(--sl-spacing-x-small)",
      },
      "& .filled:after": {
        content: '""',
        display: "flex",
        width: "100%",
        height: "4px",
        borderRadius: "4px",
        backgroundColor: "var(--sl-color-primary-500)",
      },
      "& .progress": {
        display: "block",
        textAlign: "center",
        marginLeft: "-100px",
        marginRight: "-100px",
      },
      "& .progress::after": {
        content: '""',
        width: "12px",
        height: "12px",
        display: "flex",
        backgroundColor: "var(--sl-color-primary-500)",
        borderRadius: "50%",
        position: "relative",
        left: "47%",
        top: "-85%",
      },
      "& .progress.bg:after": {
        width: "0",
        height: "0",
        border: "none",
      },
      "& .progress.top": {
        position: "relative",
        top: "-40px",
      },
      "& .progress.top:after": {
        top: "-16%",
      },
      "& .empty": {
        display: "block",
        textAlign: "center",
        marginLeft: "-100px",
        marginRight: "-100px",
      },
      "& .empty::after": {
        content: '""',
        width: "12px",
        height: "12px",
        border: "2px solid #E0E0E0",
        margin: "-2px",
        display: "flex",
        backgroundColor: "white",
        borderRadius: "50%",
        position: "relative",
        left: "47%",
        top: "-85%",
      },
      "& .empty.bg:after": {
        width: "0",
        height: "0",
        border: "none",
      },
      "& .remain:after": {
        content: '""',
        display: "flex",
        width: "100%",
        height: "4px",
        borderRadius: "4px",
        backgroundColor: "#E0E0E0",
      },
      "& .gift.bw": {
        filter: "grayscale(100%)",
      },
      "& .gift.start": {
        transform: "scale(80%)",
        top: "-20px",
      },
      "& .gift": {
        textAlign: "center",
        marginLeft: "-100px",
        marginRight: "-100px",
        position: "relative",
        display: "list-item",
        listStyleType: "none",
        top: "-18px",
        filter: goal <= progress ? "" : "grayscale(100%)",
        zIndex: "1",
      },
    },
  };
  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.ProgressBar}>
      <style type="text/css">{styleString}</style>
      <div
        class={
          repetitions > 1 ? "progress-bar repeatable-steps" : "progress-bar"
        }
      >
        {items}
      </div>
    </div>
  );

  function clamp(x, min, max) {
    return Math.min(Math.max(x, min), max);
  }

  function addLinear() {
    const ratio = progress / goal;
    columns =
      clamp(ratio, 0, 1) + "fr 0fr " + clamp(1 - ratio, 0, 1) + "fr 0fr 0fr";
    items.push(<div class={"filled"}></div>);
    items.push(
      <div
        class={
          clamp(progress, 0, goal) == goal ? "progress top bg" : "progress top"
        }
      >
        {clamp(progress, 0, goal) == goal
          ? ""
          : unit + clamp(progress, 0, goal)}
      </div>
    );
    items.push(<div class={"remain"}></div>);
    items.push(<div class={"progress bg"}>{goal}</div>);
    items.push(<div class={"gift"}>{gift1}</div>);
  }

  function addSteps() {
    let ratio = 1 / goal;
    for (let i = 1; i < goal; i ++) {
      columns += ratio + "fr 0fr ";
      if (i > progress) {
        items.push(<div class={"remain"}></div>);
        items.push(<div class={"empty"}>{i}</div>);
      } else {
        items.push(<div class={"filled"}></div>);
        items.push(<div class={"progress"}>{i}</div>);
      }
    }
    columns += ratio + "fr 0fr ";
    // reward success
    if (goal <= progress) {
      columns += "0fr ";
      items.push(<div class={"filled"}></div>);
      items.push(<div class={"progress bg"}>{goal}</div>);
      items.push(<div class="gift">{gift1}</div>);
    }

    // reward fail
    else {
      columns += "0fr ";
      items.push(<div class={"remain"}></div>);
      items.push(<div class={"empty bg"}>{goal}</div>);
      items.push(<div class="gift">{gift1}</div>);
    }
  }

  function addLinearRepeatable() {
    let repetitions = Math.floor(progress / goal);
    let ratio = ((progress % goal) / goal) * 0.5;
    // 0 repetition
    if (repetitions == 0) {
      columns = ratio + "fr 0fr " + (0.5 - ratio) + "fr 0fr 0.5fr 0fr";
      items.push(<div class={"filled"}></div>);
      items.push(
        <div class={progress == goal ? "progress bg" : "progress"}>
          {unit + progress}
        </div>
      );
      items.push(<div class={"remain"}></div>);
      items.push(<div class="gift">{gift1}</div>);
      items.push(<div class={"remain"}></div>);
      items.push(<div class="gift bw">{gift2}</div>);
    }

    // single repetition
    else if (repetitions == 1) {
      columns = "0.5fr 0fr " + ratio + "fr 0fr " + (0.5 - ratio) + "fr 0fr";
      items.push(<div class={"filled"}></div>);
      items.push(<div class="gift">{gift1}</div>);
      items.push(<div class={"filled"}></div>);
      items.push(
        <div class={progress == goal ? "progress bg" : "progress"}>
          {unit + progress}
        </div>
      );
      items.push(<div class={"remain"}></div>);
      items.push(<div class="gift bw">{gift2}</div>);
    }

    // multiple repetitions
    else {
      columns = "0fr 0.5fr 0fr " + ratio + "fr 0fr " + (0.5 - ratio) + "fr 0fr";
      items.push(<div class="gift start">{gift1}</div>);
      items.push(<div class={"filled"}></div>);
      items.push(<div class="gift">{gift2}</div>);
      items.push(<div class={"filled"}></div>);
      items.push(
        <div
          class={progress == goal * repetitions ? "progress bg" : "progress"}
        >
          {unit + progress}
        </div>
      );
      items.push(<div class={"remain"}></div>);
      items.push(<div class="gift bw">{gift3}</div>);
    }
  }

  function addStepsRepeatable() {
    let repetitions = Math.floor(progress / goal);
    // no or single repetition
    if (repetitions < 2) {
      let ratio = 1 / goal;
      for (let i = 1; i < goal * 2 + 1; i ++) {
        columns += ratio + "fr 0fr ";
        if (i > progress) {
          if (i == goal) {
            columns += "0fr ";
            items.push(<div class={"remain"}></div>);
            items.push(<div class={"empty bg"}>{goal}</div>);
            items.push(<div class="gift bw">{gift1}</div>);
          } else if (i == goal * 2) {
            columns += "0fr 0fr";
            items.push(<div class={"remain"}></div>);
            items.push(<div class={"empty bg"}>{goal * 2}</div>);
            items.push(<div class={"gift bw"}>{gift2}</div>);
          } else {
            items.push(<div class={"remain"}></div>);
            items.push(<div class={"empty"}>{unit + i}</div>);
          }
        } else if (i == goal) {
          columns += "0fr ";
          items.push(<div class={"filled"}></div>);
          items.push(<div class={"progress bg"}>{i}</div>);
          items.push(<div class="gift">{gift3}</div>);
        } else {
          items.push(<div class={"filled"}></div>);
          items.push(<div class={"progress"}>{i}</div>);
        }
      }
    }
    // case repetition many
    else {
      let position = (progress % goal) + goal;
      let ratio = 1 / goal;
      columns += "0fr 0fr ";
      items.push(
        <div class={"progress bg"}>{goal * (repetitions - 1)}</div>
      );
      items.push(<div class={"gift start"}>{gift1}</div>);
      for (let i = 1; i < goal * 2 + 1; i ++) {
        columns += ratio + "fr 0fr ";
        if (i <= goal) {
          if (i == goal) {
            columns += "0fr ";
            items.push(<div class={"filled"}></div>);
            items.push(
              <div class={"progress bg"}>
                {(i + goal * (repetitions - 1))}
              </div>
            );
            items.push(<div class={"gift"}>{gift2}</div>);
          } else {
            items.push(<div class={"filled"}></div>);
            items.push(
              <div class={"progress"}>
                {(i + goal * (repetitions - 1))}
              </div>
            );
          }
        } else if (i > position) {
          if (i == goal * 2) {
            columns += "0fr 0fr";
            items.push(<div class={"remain"}></div>);
            items.push(
              <div class={"empty bg"}>
                {(i + goal * (repetitions - 1))}
              </div>
            );
            items.push(<div class={"gift bw"}>{gift3}</div>);
          } else {
            items.push(<div class={"remain"}></div>);
            items.push(
              <div class={"empty"}>{(i + goal * (repetitions - 1))}</div>
            );
          }
        } else {
          items.push(<div class={"filled"}></div>);
          items.push(
            <div class={"progress"}>
              {(i + goal * (repetitions - 1))}
            </div>
          );
        }
      }
    }
  }
}
