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

  const checkmark_circle = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 18 18"
    >
      <path
        fill="#555"
        fill-rule="evenodd"
        d="M1.636 9a7.364 7.364 0 1114.728 0A7.364 7.364 0 011.636 9zM9 0a9 9 0 100 18A9 9 0 009 0zm5.192 6.266a.982.982 0 00-1.548-1.208l-4.787 6.137-2.58-2.58a.982.982 0 00-1.39 1.388l3.367 3.366a.982.982 0 001.468-.09l5.47-7.013z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
  const arrow_left_right = (
    <svg width={11} height={12} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.265 2.789a.346.346 0 000-.489L8.066.101a.346.346 0 10-.489.489l1.61 1.609H2.073a.691.691 0 00-.69.691v1.728a.346.346 0 00.69 0V2.89h7.114L7.577 4.5a.346.346 0 10.49.488l2.198-2.2zM.101 9.21a.346.346 0 000 .489l2.2 2.199a.346.346 0 00.488-.489l-1.61-1.609h7.114c.382 0 .691-.31.691-.691V7.382a.346.346 0 00-.691 0V9.11H1.18L2.789 7.5a.346.346 0 10-.489-.488l-2.199 2.2z"
        fill="#666"
      />
    </svg>
  );

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
        {(complete ||
          (progress &&
            goal <= progress &&
            !repeatable &&
            typeof repeatable != "number")) && (
          <span class="complete">
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
        {(repeatable || typeof repeatable == "number") && (
          <span class="completed">
            {expire && (
              <span>
                Ends Nov 30, 2021 <br />
              </span>
            )}
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
          </span>
        )}
        <sl-button
          class="action"
          size="small"
          onClick={onClick}
          disabled={
            complete ||
            (progress &&
              goal <= progress &&
              !repeatable &&
              typeof repeatable != "number")
          }
        >
          {complete ||
          (progress &&
            goal <= progress &&
            !repeatable &&
            typeof repeatable != "number")
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

  const gift = `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='16' height='16' fill='white'/%3E%3Cpath d='M15 5H12.4508H9V16H13.5C14.0523 16 14.5 15.5523 14.5 15V9H15C15.5523 9 16 8.55228 16 8V6C16 5.44772 15.5523 5 15 5Z' fill='%23F2C94C'/%3E%3Cpath d='M1.5 9V15C1.5 15.5523 1.94772 16 2.5 16H7V5H4.64242H1C0.447715 5 0 5.44772 0 6V8C0 8.55228 0.447715 9 1 9H1.5Z' fill='%23F2C94C'/%3E%3Cmask id='path-2-inside-1_35_1290' fill='white'%3E%3Cpath d='M1.5 10V9H14.5V10H1.5Z'/%3E%3C/mask%3E%3Cpath d='M1.5 9V8H0.5V9H1.5ZM1.5 10H0.5V11H1.5V10ZM14.5 10V11H15.5V10H14.5ZM14.5 9H15.5V8H14.5V9ZM0.5 9V10H2.5V9H0.5ZM1.5 11H14.5V9H1.5V11ZM15.5 10V9H13.5V10H15.5ZM14.5 8H1.5V10H14.5V8Z' fill='%23BE9720' mask='url(%23path-2-inside-1_35_1290)'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14 2.70949C14 3.59565 12.6694 4.93746 12 5H9V16H7.00179V5H4.58792C3.21247 4.70182 2 3.64537 2 2.52072C2 1.42474 2.47603 0.556701 3.34184 0.182041C4.16921 -0.175986 5.12452 0.0203328 5.87976 0.544666C6.80676 1.18825 7.32678 2.3963 7.79856 3.49226C7.83996 3.58845 7.88099 3.68378 7.9219 3.77778C7.96173 3.68865 8.00186 3.59793 8.0425 3.50608C8.50995 2.44948 9.04359 1.24325 9.9404 0.59563C10.7332 0.0231438 11.741 -0.193157 12.6121 0.198945C13.5129 0.604397 14 1.53453 14 2.70949ZM10.6123 1.5C11.0928 1.15305 11.668 1.09012 12.1597 1.5C12.5879 1.85694 12.6108 2.02497 12.6658 2.42926L12.6755 2.5C12.6755 3.09851 12.1597 4 11.6439 4C11.2785 4 10.9914 3.99691 10.7224 3.99402C10.2319 3.98875 9.80131 3.98412 9.06496 4C9.20533 3.72786 9.31743 3.46669 9.42434 3.21761C9.71026 2.55143 9.95907 1.97176 10.6123 1.5ZM4.93861 1.5C4.70607 1.33855 4.17281 1.4106 3.95166 1.5063C3.76894 1.58537 3.49602 1.82658 3.49602 2.52072C3.49602 3.19524 4.58792 3.77778 4.58792 3.77778C4.58792 3.77778 5.45441 4 7.00179 4C6.47506 2.69451 5.7289 2.04867 4.93861 1.5Z' fill='%23EB5757'/%3E%3C/svg%3E%0A");`;
  const gift_outline = `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.15982 6.19283V7.80736L13.142 7.80736L13.4067 7.80736L13.8672 7.80736H14.3763V6.19284L9.15982 6.19283ZM7.55536 7.80736L3.48424 7.80736L3.21956 7.80736L2.75914 7.80736H2.25002V6.19284L7.55536 6.19283V7.80736ZM7.55536 9.25757V14.5498L3.48424 14.5498V9.25757L7.55536 9.25757ZM9.15982 14.5498V9.25757L13.142 9.25757V14.5498L9.15982 14.5498ZM14.2837 2.70949C14.2837 3.59565 13.142 4.68009 12.4931 4.74262H15.1014V4.74262C15.5018 4.74262 15.8265 5.06726 15.8265 5.46773V5.46773V8.53247V8.53247C15.8265 8.93293 15.5018 9.25758 15.1014 9.25758V9.25758H14.5923V15.2749V15.2749C14.5923 15.6754 14.2676 16 13.8672 16V16H2.75914V16C2.35867 16 2.03403 15.6754 2.03403 15.2749V15.2749V9.25758H1.52491V9.25758C1.12445 9.25758 0.799805 8.93293 0.799805 8.53247V8.53247V5.46773V5.46773C0.799805 5.06726 1.12445 4.74262 1.52491 4.74262V4.74262H5.15982C3.82648 4.44444 2.65114 3.64537 2.65114 2.52072C2.65114 1.42474 3.11259 0.556701 3.95189 0.182041C4.75393 -0.175986 5.67999 0.0203328 6.4121 0.544666C7.31072 1.18825 7.81482 2.3963 8.27215 3.49226C8.31228 3.58845 8.35206 3.68378 8.39171 3.77778C8.43032 3.68865 8.46923 3.59793 8.50862 3.50608C8.96176 2.44948 9.47906 1.24325 10.3484 0.59563C11.1169 0.0231438 12.0938 -0.193157 12.9383 0.198945C13.8115 0.604397 14.2837 1.53453 14.2837 2.70949ZM4.54304 1.5063C4.75741 1.4106 5.13819 1.41608 5.56769 1.72369C6.33379 2.27236 7.04476 3.20241 7.55536 4.50789C6.04871 4.22222 5.15982 3.77778 5.15982 3.77778C5.15982 3.77778 4.10135 3.19524 4.10135 2.52072C4.10135 1.82658 4.36592 1.58537 4.54304 1.5063ZM12.3276 1.51428C12.0921 1.40494 11.6805 1.41166 11.2148 1.75861C10.3447 2.40676 9.94975 3.06286 9.35858 4.68009C10.464 4.6555 10.9795 4.51271 11.804 4.13223C12.4217 3.77092 12.9376 3.26518 12.9376 2.66667C12.9376 1.86322 12.5343 1.61027 12.3276 1.51428Z' fill='%23858585'/%3E%3C/svg%3E%0A");`;

  const style = {
    HostBlock: HostBlock,
    ProgressBar: {
      "& .progress-bar": {
        height: "20px",
        marginTop: "var(--sl-spacing-large)",
        marginRight: "var(--sl-spacing-medium)",
        marginBottom: "var(--sl-spacing-large)",
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
        zIndex: "1",
      },
      "& .end:after": {
        //content: '"🎁"',
        // filter: goal <= progress ? "" : "grayscale(100%)",
        content: goal <= progress ? gift : gift_outline,
        fontSize: "16px",
        width: "0",
        height: "0",
        display: "block",
        backgroundColor: "black",
        borderRadius: "50%",
        position: "relative",
        left: "46%",
        top: "-113%",
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
