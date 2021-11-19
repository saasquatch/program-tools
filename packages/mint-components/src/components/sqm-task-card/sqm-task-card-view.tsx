import { h, Host, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { HostBlock } from "../../global/mixins";

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

  const style = {
    HostBlock: HostBlock,
    TaskCard: {
      position: "relative",
      minWidth: "246px",
      maxWidth: "346px",
      background: "var(--sl-color-white)",
      border: "1px solid var(--sl-color-gray-300)",
      borderRadius: "var(--sl-border-radius-medium)",
      fontSize: "var(--sl-font-size-small)",
      lineHeight: "var(--sl-line-height-dense)",
      margin: "var(--sl-spacing-medium)",
      "& > div": {
        margin: "var(--sl-spacing-medium)",
      },
    },
    Header: {
      display: "flex",
      "& .complete": {
        alignSelf: "center",
        lineHeight: "0",
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
      "& .icon": {
        fontSize: "var(--sl-font-size-xx-small)",
        marginRight: "var(--sl-spacing-xx-small)",
      },
      "& .completed": {
        marginTop: "auto",
        fontSize: "var(--sl-font-size-x-small)",
        color: "var(--sl-color-gray-600)",
      },
      "& .action": {
        marginLeft: "auto",
      },
      "& sl-button.action::part(base) ": {
        color: "var(--sl-color-white)",
        background: "var(--sl-color-gray-500)",
        border: "1px solid var(--sl-color-gray-500)",
        borderRadius: "var(--sl-border-radius-medium)",
      },
    },
  };
  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.TaskCard}>
      <style type="text/css">{styleString}</style>
      <div class={sheet.classes.Header}>
        {(complete || (progress && goal <= progress && !repeatable)) && (
          <span class="complete">
            <sl-icon name="check-circle"></sl-icon>
          </span>
        )}
        <span class="value">{points}</span>
        <span class="text">SAASQUATCH POINTS</span>
      </div>
      <div class={sheet.classes.Title}>{title}</div>
      <ProgressBar {...props} />
      <Details description={description} />
      <div class={sheet.classes.Footer}>
        {(repeatable || typeof repeatable == "number") && (
          <span class="completed">
            {expire && (
              <span>
                Ends Nov 30, 2021 <br />
              </span>
            )}
            <span class="icon">
              <sl-icon name="arrow-left-right"></sl-icon>
            </span>
            {"Completed "}
            {typeof repeatable == "number"
              ? repeatable
              : Math.floor(progress / goal)}
            {" times"}
          </span>
        )}
        <sl-button
          class="action"
          size="small"
          onClick={props.onClick}
          disabled={complete || (progress && goal <= progress && !repeatable)}
        >
          {complete || (progress && goal <= progress && !repeatable)
            ? "Complete"
            : buttonText}
        </sl-button>
      </div>
    </div>
  );
}

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
          color: "var(--sl-color-primary-300)",
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
  goal?: number;
  progress?: number;
  steps?: number;
  unit?: string;
  repeatable?: boolean | number;
};

export function ProgressBar(props: ProgressBarProps): VNode {
  const { goal, progress, steps, unit = "", repeatable } = props;

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
      margin: 0,
      "& .progress-bar": {
        height: "20px",
        marginRight: "16px",
        display: "grid",
        gridTemplateColumns: columns,
        lineHeight: "45px",
        userSelect: "none",
      },
      "& .filled:after": {
        content: '""',
        display: "flex",
        width: "100%",
        height: "4px",
        borderRadius: "4px",
        backgroundColor: "black",
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
        backgroundColor: "black",
        borderRadius: "50%",
        position: "relative",
        left: "47%",
        top: "-85%",
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
      "& .remain:after": {
        content: '""',
        display: "flex",
        width: "100%",
        height: "4px",
        borderRadius: "4px",
        backgroundColor: "#E0E0E0",
      },
      "& .end.start:after": {
        left: "51%",
      },
      "& .end.start:before": {
        left: "48%",
      },
      "& .end": {
        display: "block",
        textAlign: "center",
        marginLeft: "-100px",
        marginRight: "-100px",
      },
      // for SVG backdrop white
      "&  .end:before": {
        content: '"■"',
        width: "0",
        height: "0",
        fontSize: "50px",
        textAlign: "center",
        display: "flex",
        backgroundColor: "black",
        borderRadius: "50%",
        position: "relative",
        color: "white",
        left: "42.5%",
        top: "-45%",
      },
      "& .end:after": {
        content: '"🎁"',
        fontSize: "16px",
        filter: goal <= progress ? "" : "grayscale(100%)",
        width: "0",
        height: "0",
        display: "flex",
        backgroundColor: "black",
        borderRadius: "50%",
        position: "relative",
        left: "45%",
        top: "-117%",
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
      <div class="progress-bar">{items}</div>
    </div>
  );

  function addLinear() {
    columns = progress / goal + "fr 0fr " + (1 - progress / goal) + "fr 0fr";
    items.push(<div class={"filled"}></div>);
    items.push(<div class={"progress"}>{unit + progress}</div>);
    items.push(<div class={"remain"}></div>);
    items.push(<div class={"end"}>&nbsp;</div>);
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
      items.push(<div class={"progress"}>{unit + goal}</div>);
      items.push(<div class="end">{goal}</div>);
    }

    // reward fail
    else {
      items.push(<div class={"remain"}></div>);
      items.push(<div class="end">{goal}</div>);
    }
  }

  function addLinearRepeatable() {
    let repetitions = Math.floor(progress / goal);
    let position = progress % goal;
    let remainder = (position / goal) * 0.5;
    // 0 repetition
    if (repetitions == 0) {
      columns = remainder + "fr 0fr " + (0.5 - remainder) + "fr 0fr 0.5fr";
      items.push(<div class={"filled"}></div>);
      items.push(<div class={"progress"}>{unit + progress}</div>);
      items.push(<div class={"remain"}></div>);
      items.push(<div class={"end"}>&nbsp;</div>);
      items.push(<div class={"remain"}></div>);
    }

    // single repetition
    else if (repetitions % 2 == 1) {
      columns = "0.5fr 0fr " + remainder + "fr 0fr " + (0.5 - remainder) + "fr";
      items.push(<div class={"filled"}></div>);
      items.push(<div class={"end"}>&nbsp;</div>);
      items.push(<div class={"filled"}></div>);
      items.push(<div class={"progress"}>{unit + progress}</div>);
      items.push(<div class={"remain"}></div>);
    }

    // multiple repetitions
    else {
      columns =
        "0fr 0.5fr 0fr " + remainder + "fr 0fr " + (0.5 - remainder) + "fr";
      items.push(<div class={"end start"}>&nbsp;</div>);
      items.push(<div class={"filled"}></div>);
      items.push(<div class={"end"}>&nbsp;</div>);
      items.push(<div class={"filled"}></div>);
      items.push(<div class={"progress"}>{unit + progress}</div>);
      items.push(<div class={"remain"}></div>);
    }
  }

  function addStepsRepeatable() {
    let repetitions = Math.floor(progress / goal);
    if (repetitions < 2) {
      let step_math = steps / goal;
      for (let i = 1; i < goal * 2; i += steps) {
        columns += step_math + "fr 0fr ";
        if (i > progress) {
          if (i == goal) {
            items.push(<div class={"remain"}></div>);
            items.push(<div class="end">{goal}</div>);
          } else {
            items.push(<div class={"remain"}></div>);
            items.push(<div class={"empty"}>{unit + i}</div>);
          }
        } else if (i == goal) {
          items.push(<div class={"filled"}></div>);
          items.push(<div class="end">{goal}</div>);
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
      columns += "0fr ";
      items.push(<div class={"end start"}>&nbsp;</div>);
      for (let i = 1; i < goal * 2; i += steps) {
        columns += step_math + "fr 0fr ";
        if (i <= goal) {
          if (i == goal) {
            items.push(<div class={"filled"}></div>);
            items.push(
              <div class={"end"}>{unit + (i + goal * repetitions)}</div>
            );
          } else {
            items.push(<div class={"filled"}></div>);
            items.push(
              <div class={"progress"}>{unit + (i + goal * repetitions)}</div>
            );
          }
        } else if (i > position) {
          if (i == goal) {
            items.push(<div class={"remain"}></div>);
            items.push(<div class="end">{goal * repetitions}</div>);
          } else {
            items.push(<div class={"remain"}></div>);
            items.push(
              <div class={"empty"}>{unit + (i + goal * repetitions)}</div>
            );
          }
        } else if (i == goal) {
          items.push(<div class={"filled"}></div>);
          items.push(<div class="end">{goal}</div>);
        } else {
          items.push(<div class={"filled"}></div>);
          items.push(
            <div class={"progress"}>{unit + (i + goal * repetitions)}</div>
          );
        }
      }
    }
  }
}

export type DetailsProps = {
  description: string;
};

// const checkmark_circle = (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="18"
//     height="18"
//     fill="none"
//     viewBox="0 0 18 18"
//   >
//     <path
//       fill="#555"
//       fill-rule="evenodd"
//       d="M1.636 9a7.364 7.364 0 1114.728 0A7.364 7.364 0 011.636 9zM9 0a9 9 0 100 18A9 9 0 009 0zm5.192 6.266a.982.982 0 00-1.548-1.208l-4.787 6.137-2.58-2.58a.982.982 0 00-1.39 1.388l3.367 3.366a.982.982 0 001.468-.09l5.47-7.013z"
//       clip-rule="evenodd"
//     ></path>
//   </svg>
// );

// const gift_outline = (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="16"
//     height="16"
//     fill="none"
//     viewBox="0 0 16 16"
//   >
//     <path fill="#fff" d="M0 0H16V16H0z"></path>
//     <path
//       fill="#858585"
//       fill-rule="evenodd"
//       d="M9.16 6.193v1.614h5.217V6.193H9.16zM7.555 7.807H2.25V6.193h5.305v1.614zm0 1.45v5.293h-4.07V9.258h4.07zM9.16 14.55V9.258h3.982v5.292H9.16zm5.124-11.84c0 .886-1.142 1.97-1.79 2.033H15.1c.4 0 .725.324.725.725v3.064c0 .4-.324.726-.725.726h-.509v6.017c0 .4-.324.725-.725.725H2.76a.725.725 0 01-.725-.725V9.258h-.51A.725.725 0 01.8 8.532V5.468c0-.4.324-.725.725-.725H5.16C3.826 4.444 2.65 3.645 2.65 2.52c0-1.096.462-1.964 1.3-2.339C4.755-.176 5.68.02 6.413.545c.899.643 1.403 1.851 1.86 2.947l.12.286.117-.272c.453-1.057.97-2.263 1.84-2.91.768-.573 1.745-.79 2.59-.397.873.405 1.345 1.336 1.345 2.51zM4.543 1.505c.214-.095.595-.09 1.025.218.766.548 1.477 1.478 1.987 2.784-1.506-.286-2.395-.73-2.395-.73S4.1 3.195 4.1 2.52c0-.694.265-.936.442-1.015zm7.785.008c-.236-.11-.647-.102-1.113.245-.87.648-1.265 1.304-1.856 2.921 1.105-.024 1.62-.167 2.445-.548.618-.361 1.134-.867 1.134-1.465 0-.804-.404-1.057-.61-1.153z"
//       clip-rule="evenodd"
//     ></path>
//   </svg>
// );

// const gift = (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="16"
//     height="16"
//     fill="none"
//     viewBox="0 0 16 16"
//   >
//     <path fill="#fff" d="M0 0H16V16H0z"></path>
//     <path
//       fill="#F2C94C"
//       d="M15 5H9v11h4.5a1 1 0 001-1V9h.5a1 1 0 001-1V6a1 1 0 00-1-1zM1.5 9v6a1 1 0 001 1H7V5H1a1 1 0 00-1 1v2a1 1 0 001 1h.5z"
//     ></path>
//     <mask id="path-2-inside-1_35_1290" fill="#fff">
//       <path d="M1.5 10V9h13v1h-13z"></path>
//     </mask>
//     <path
//       fill="#BE9720"
//       d="M1.5 9V8h-1v1h1zm0 1h-1v1h1v-1zm13 0v1h1v-1h-1zm0-1h1V8h-1v1zM.5 9v1h2V9h-2zm1 2h13V9h-13v2zm14-1V9h-2v1h2zm-1-2h-13v2h13V8z"
//       mask="url(#path-2-inside-1_35_1290)"
//     ></path>
//     <path
//       fill="#EB5757"
//       fill-rule="evenodd"
//       d="M14 2.71c0 .886-1.33 2.227-2 2.29H9v11H7.002V5H4.588C3.212 4.702 2 3.645 2 2.52 2 1.426 2.476.558 3.342.183 4.169-.176 5.125.02 5.88.545c.927.643 1.447 1.851 1.919 2.947l.123.286.12-.272C8.51 2.45 9.045 1.243 9.94.596c.793-.573 1.801-.79 2.672-.397.9.405 1.388 1.336 1.388 2.51zM10.612 1.5c.48-.347 1.056-.41 1.548 0 .428.357.45.525.506.93l.01.07c0 .599-.516 1.5-1.032 1.5-.366 0-.653-.003-.922-.006-.49-.005-.92-.01-1.657.006.14-.272.252-.533.36-.782.285-.667.534-1.246 1.187-1.718zm-5.673 0c-.233-.161-.766-.09-.987.006-.183.08-.456.32-.456 1.015 0 .674 1.092 1.257 1.092 1.257S5.454 4 7.002 4c-.527-1.305-1.273-1.951-2.063-2.5z"
//       clip-rule="evenodd"
//     ></path>
//   </svg>
// );
