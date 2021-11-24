import { h, Host, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { HostBlock } from "../../global/mixins";
import * as SVGs from "./SVGs";

export type TaskCardViewProps = {
  points?: number;
  title: string;
  description: string;
  complete?: boolean;
  repeatable?: boolean | number;
  expire?: string;
  buttonText: string;
  onClick: () => void;
} & ProgressBarProps;

// @ts-expect-error -- unused
export function TaskCardView(props: TaskCardViewProps, children: VNode): VNode {
  const {
    points = "0",
    title,
    description,
    complete = false,
    repeatable = false,
    expire,
    buttonText,
    onClick,
    progress,
    goal,
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
        minWidth: "256px", // 347 in figma
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
      // "@media only screen and (min-width: 2000px)": {
      //   "& .main": {
      //     width: "738px",
      //   },
      // },
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
      "& span": {
        verticalAlign: "text-bottom",
      },
      "& .icon": {
        verticalAlign: "bottom",
        fontSize: "var(--sl-font-size-xx-small)",
        marginRight: "var(--sl-spacing-xx-small)",
      },
      "& .completed": {
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

  const showComplete = complete || (progress && goal <= progress);

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
          <span class="text">SAASQUATCH POINTS</span>
        </div>
        <div class={sheet.classes.Title}>{title}</div>
        <ProgressBar {...props} />
        <Details description={description} />
        <div class={sheet.classes.Footer}>
          <span class="completed">
            {(repeatable || typeof repeatable == "number") && (
              <div>
                <span class="icon">
                  {arrow_left_right}
                  {/* <sl-icon name="arrow-left-right"></sl-icon> */}
                </span>
                <span>
                  {"Completed "}
                  {typeof repeatable == "number"
                    ? repeatable
                    : Math.floor(progress / goal)}
                  {" times"}
                </span>
                <br />
                <span>
                  {"Earned "}
                  {points}
                  {" SaaSquatch Points"}
                </span>
                )
              </div>
            )}
            {expire && (
              <span>
                <br />
                {"Ends "} {expire}
              </span>
            )}
          </span>

          <sl-button
            class="action"
            size="small"
            onClick={onClick}
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
      // "@media only screen and (min-width: 2000px)": {
      //   "& .details": {
      //     display: "none",
      //   },
      //   "& .summary": {
      //     height: "auto",
      //     maxHeight: "none",
      //   },
      // },
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
  goal?: number;
  progress?: number;
  steps?: number;
  unit?: string;
  repeatable?: boolean | number;
};

export function ProgressBar(props: ProgressBarProps): VNode {
  const { goal, progress, steps, unit = "", repeatable } = props;

  const gift1 = SVGs.gift();
  const gift2 = SVGs.gift();
  const gift3 = SVGs.gift();

  // if progress and goal are not provided, there cannot be a progress bar
  if (!(progress && goal)) return;

  const items = [];
  var columns = "";

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
        height: "20px",
        marginTop: "var(--sl-spacing-large)",
        marginRight: "var(--sl-spacing-x-small)",
        marginBottom: "var(--sl-spacing-large)",
        fontSize: "var(--sl-font-size-x-small)",
        display: "grid",
        gridTemplateColumns: columns,
        lineHeight: "45px",
        userSelect: "none",
      },
      "& .progress-bar.repeatable": {
        //marginRight: "0",
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
      "& .progress.lhs": {
        position: "relative",
        left: "4px",
      },
      "& .progress.bg:after": {
        width: "0",
        height: "0",
        border: "none",
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
      "& .end.bw": {
        filter: "grayscale(100%)",
      },
      "& .end.start": {
        transform: "scale(80%)",
        top: "-21px",
        left: "5px",
      },
      "& .end": {
        textAlign: "center",
        marginLeft: "-100px",
        marginRight: "-100px",
        position: "relative",
        top: "-18px",
        filter: goal <= progress ? "" : "grayscale(100%)",
        zIndex: "1",
      },
      // for SVG backdrop white
      // "&  .end:before": {
      //   content: '"■"',
      //   width: "0",
      //   height: "0",
      //   fontSize: "50px",
      //   textAlign: "center",
      //   display: "flex",
      //   backgroundColor: "black",
      //   borderRadius: "50%",
      //   position: "relative",
      //   color: "white",
      //   left: "42.5%",
      //   top: "-45%",
      //   zIndex: "1",
      // },
      // "& .end:after": {
      //   //content: '"🎁"',
      //   //content: goal <= progress ? gift : gift_outline,
      //   content: '""',
      //   filter: goal <= progress ? "" : "grayscale(100%)",
      //   fontSize: "16px",
      //   width: "0",
      //   height: "0",
      //   display: "block",
      //   backgroundColor: "black",
      //   borderRadius: "50%",
      //   position: "relative",
      //   left: "46%",
      //   top: "-113%",
      //   zIndex: "1",
      // },
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.ProgressBar}>
      <style type="text/css">{styleString}</style>
      <div class={repeatable ? "progress-bar repeatable" : "progress-bar"}>
        {items}
      </div>
    </div>
  );

  function addLinear() {
    columns = progress / goal + "fr 0fr " + (1 - progress / goal) + "fr 0fr";
    items.push(<div class={"filled"}></div>);
    items.push(<div class={goal <= progress ? "progress bg" : "progress"}>{unit + progress}</div>);
    items.push(<div class={"remain"}></div>);
    items.push(<div class={"end"}>{gift1}</div>);
  }

  function addSteps() {
    let step_math = steps / goal;
    for (let i = 1; i < goal; i += steps) {
      columns += step_math + "fr 0fr ";
      if (i > progress) {
        items.push(<div class={"remain"}></div>);
        items.push(<div class={"empty"}>{unit + i}</div>);
      } else {
        items.push(<div class={"filled"}></div>);
        items.push(<div class={"progress"}>{unit + i}</div>);
      }
    }
    columns += step_math + "fr 0fr ";
    // reward success
    if (goal <= progress) {
      columns += "0fr ";
      items.push(<div class={"filled"}></div>);
      items.push(<div class={"progress bg"}>{unit + goal}</div>);
      items.push(<div class="end">{gift1}</div>);
    }

    // reward fail
    else {
      columns += "0fr ";
      items.push(<div class={"remain"}></div>);
      items.push(<div class={"empty bg"}>{unit + goal}</div>);
      items.push(<div class="end">{gift1}</div>);
    }
  }

  function addLinearRepeatable() {
    let repetitions = Math.floor(progress / goal);
    let position = progress % goal;
    let remainder = (position / goal) * 0.5;
    // 0 repetition
    if (repetitions == 0) {
      columns = remainder + "fr 0fr " + (0.5 - remainder) + "fr 0fr 0.5fr 0fr";
      items.push(<div class={"filled"}></div>);
      items.push(<div class={"progress"}>{unit + progress}</div>);
      items.push(<div class={"remain"}></div>);
      items.push(<div class="end">{gift1}</div>);
      items.push(<div class={"remain"}></div>);
      items.push(<div class="end bw">{gift2}</div>);
    }

    // single repetition
    else if (repetitions % 2 == 1) {
      columns =
        "0.5fr 0fr " + remainder + "fr 0fr " + (0.5 - remainder) + "fr 0fr";
      items.push(<div class={"filled"}></div>);
      items.push(<div class="end">{gift1}</div>);
      items.push(<div class={"filled"}></div>);
      items.push(<div class={"progress"}>{unit + progress}</div>);
      items.push(<div class={"remain"}></div>);
      items.push(<div class="end bw">{gift2}</div>);
    }

    // multiple repetitions
    else {
      columns =
        "0fr 0.5fr 0fr " + remainder + "fr 0fr " + (0.5 - remainder) + "fr 0fr";
      items.push(<div class="end start">{gift1}</div>);
      items.push(<div class={"filled"}></div>);
      items.push(<div class="end">{gift2}</div>);
      items.push(<div class={"filled"}></div>);
      items.push(<div class={"progress"}>{unit + progress}</div>);
      items.push(<div class={"remain"}></div>);
      items.push(<div class="end bw">{gift3}</div>);
    }
  }

  function addStepsRepeatable() {
    let repetitions = Math.floor(progress / goal);
    // no or single repetition
    if (repetitions < 2) {
      let step_math = steps / goal;
      for (let i = 1; i < goal * 2 + 1; i += steps) {
        columns += step_math + "fr 0fr ";
        if (i > progress) {
          if (i == goal) {
            columns += "0fr ";
            items.push(<div class={"remain"}></div>);
            items.push(<div class={"empty bg"}>{unit + goal}</div>);
            items.push(<div class="end bw">{gift1}</div>);
          } else if (i == goal * 2) {
            columns += "0fr 0fr";
            items.push(<div class={"remain"}></div>);
            items.push(
              <div class={"empty bg"}>
                {unit + (i + goal * (repetitions - 1))}
              </div>
            );
            items.push(<div class={"end bw"}>{gift2}</div>);
          } else {
            items.push(<div class={"remain"}></div>);
            items.push(<div class={"empty"}>{unit + i}</div>);
          }
        } else if (i == goal) {
          columns += "0fr ";
          items.push(<div class={"filled"}></div>);
          items.push(<div class={"progress bg"}>{unit + i}</div>);
          items.push(<div class="end">{gift3}</div>);
        } else {
          items.push(<div class={"filled"}></div>);
          items.push(<div class={"progress"}>{unit + i}</div>);
        }
      }
    }
    // case repetition many
    else {
      let position = (progress % goal) + goal;
      let step_math = steps / goal;
      columns += "0fr 0fr ";
      items.push(
        <div class={"progress lhs bg"}>{unit + goal * (repetitions - 1)}</div>
      );
      items.push(<div class={"end start"}>{gift1}</div>);
      for (let i = 1; i < goal * 2 + 1; i += steps) {
        columns += step_math + "fr 0fr ";
        if (i <= goal) {
          if (i == goal) {
            columns += "0fr ";
            items.push(<div class={"filled"}></div>);
            items.push(
              <div class={"progress bg"}>
                {unit + (i + goal * (repetitions - 1))}
              </div>
            );
            items.push(<div class={"end"}>{gift2}</div>);
          } else {
            items.push(<div class={"filled"}></div>);
            items.push(
              <div class={"progress"}>
                {unit + (i + goal * (repetitions - 1))}
              </div>
            );
          }
        } else if (i > position) {
          if (i == goal * 2) {
            columns += "0fr 0fr";
            items.push(<div class={"remain"}></div>);
            items.push(
              <div class={"empty bg"}>
                {unit + (i + goal * (repetitions - 1))}
              </div>
            );
            items.push(<div class={"end bw"}>{gift3}</div>);
          } else {
            items.push(<div class={"remain"}></div>);
            items.push(
              <div class={"empty"}>{unit + (i + goal * (repetitions - 1))}</div>
            );
          }
        } else {
          items.push(<div class={"filled"}></div>);
          items.push(
            <div class={"progress"}>
              {unit + (i + goal * (repetitions - 1))}
            </div>
          );
        }
      }
    }
  }
}
