import { h } from './index-832bd454.js';
import { l as luxon } from './luxon-1decee23.js';
import { i as intl } from './global-b1f18590.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { l as luxonLocale } from './utils-48175026.js';

const style$2 = {
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
      cursor: "pointer",
    },
    "& input:checked ~ .summary": {
      transition: "all var(--sl-transition-medium) ease",
      maxHeight: "300px",
      marginBottom: "var(--sl-spacing-x-large)",
    },
    "& input:checked ~ .summary[progress-bar]": {
      marginBottom: "var(--sl-spacing-xx-large)",
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
const sheet$2 = createStyleSheet(style$2);
const styleString$2 = sheet$2.toString();
function Details(props) {
  const rid = Math.random().toString(36).slice(2);
  return (h("div", null,
    h("style", { type: "text/css" }, styleString$2),
    h("span", { class: sheet$2.classes.Description },
      h("input", { type: "checkbox", id: "details-" + rid }),
      h("label", { class: "details", htmlFor: "details-" + rid },
        h("sl-icon", { name: "chevron-down" })),
      h("span", { class: "summary", "progress-bar": props.progressBar }, props.content.description))));
}

const Gift = () => {
  return (h("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    h("path", { d: "M15 5H12.4508H9V16H13.5C14.0523 16 14.5 15.5523 14.5 15V9H15C15.5523 9 16 8.55228 16 8V6C16 5.44772 15.5523 5 15 5Z", fill: "#F2C94C" }),
    h("path", { d: "M1.5 9V15C1.5 15.5523 1.94772 16 2.5 16H7V5H4.64242H1C0.447715 5 0 5.44772 0 6V8C0 8.55228 0.447715 9 1 9H1.5Z", fill: "#F2C94C" }),
    h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M1.5 9V10H14.5V9H1.5Z", fill: "#BE9720" }),
    h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M14 2.70949C14 3.59565 12.6694 4.93746 12 5H9V16H7.00179V5H4.58792C3.21247 4.70182 2 3.64537 2 2.52072C2 1.42474 2.47603 0.556701 3.34184 0.182041C4.16921 -0.175986 5.12452 0.0203328 5.87976 0.544666C6.80676 1.18825 7.32679 2.3963 7.79856 3.49226C7.83996 3.58845 7.88099 3.68378 7.9219 3.77778C7.96173 3.68865 8.00186 3.59793 8.0425 3.50608C8.50995 2.44948 9.04359 1.24325 9.9404 0.59563C10.7332 0.0231438 11.741 -0.193157 12.6121 0.198945C13.5129 0.604397 14 1.53453 14 2.70949ZM10.6123 1.5C11.0928 1.15305 11.668 1.09012 12.1597 1.5C12.5879 1.85694 12.6108 2.02497 12.6658 2.42926L12.6755 2.5C12.6755 3.09851 12.1597 4 11.6439 4C11.2785 4 10.9914 3.99691 10.7224 3.99402C10.2319 3.98875 9.80131 3.98412 9.06496 4C9.20533 3.72786 9.31743 3.46669 9.42434 3.21761C9.71026 2.55143 9.95907 1.97176 10.6123 1.5ZM4.93861 1.5C4.70607 1.33855 4.17281 1.4106 3.95166 1.5063C3.76894 1.58537 3.49602 1.82658 3.49602 2.52072C3.49602 3.19524 4.58792 3.77778 4.58792 3.77778C4.58792 3.77778 5.45441 4 7.00179 4C6.47506 2.69451 5.7289 2.04867 4.93861 1.5Z", fill: "#EB5757" })));
};

const style$1 = {
  ProgressBar: {
    "& .progress-bar": {
      height: "0",
      marginTop: "var(--sl-spacing-large)",
      marginBottom: "var(--sl-spacing-xxx-large)",
      marginRight: "var(--sl-spacing-x-small)",
      fontSize: "var(--sl-font-size-x-small)",
      display: "grid",
      lineHeight: "45px",
      userSelect: "none",
    },
    "&[data-steps]": {
      marginTop: "calc(-1*var(--sl-spacing-x-small))",
    },
    "&[data-steps]  .progress-bar": {
      marginTop: "var(--sl-spacing-medium)",
    },
    "&[data-expired]  .progress-bar": {
      filter: "grayscale(1)",
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
      backgroundColor: "var(--sl-color-primary-300)",
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
      backgroundColor: "var(--sl-color-primary-300)",
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
      top: "-18px",
    },
  },
};
const sheet$1 = createStyleSheet(style$1, { classNamePrefix: "sqm-prog-bar" });
const styleString$1 = sheet$1.toString();
function ProgressBarView(props) {
  var _a;
  const { progress = 0, goal = 1, steps = false, progressBarUnit = "", repeatable = false, expired = false, finite = 0, } = props;
  let aggregate = buildProgressBar(repeatable, steps, props);
  const { columns, items } = aggregate;
  //@ts-ignore
  console.log("PROGRESS BAR PROPS " + ((_a = props === null || props === void 0 ? void 0 : props.content) === null || _a === void 0 ? void 0 : _a.cardTitle));
  console.log({ props });
  return (h("div", { class: sheet$1.classes.ProgressBar, "data-expired": expired, "data-steps": steps, "data-done": goal <= progress },
    h("style", { type: "text/css" }, styleString$1),
    h("div", { class: (!Boolean(finite) && progress >= 2 * goal) ||
        (Boolean(finite) && progress > 2 * goal)
        ? "progress-bar repeatable-steps"
        : "progress-bar", style: {
        gridTemplateColumns: columns,
        marginLeft: progress === 0 && !steps ? "var(--sl-spacing-x-small)" : "",
      } }, items)));
}
function buildProgressBar(repeatable, steps, props) {
  if (repeatable) {
    if (steps) {
      return addStepsRepeatable(props);
    }
    else {
      return addLinearRepeatable(props);
    }
  }
  // non repeatable
  else {
    if (steps) {
      return addSteps(props);
    }
    else {
      return addLinear(props);
    }
  }
}
function addSteps({ progress, goal }) {
  const items = [];
  const columns = [];
  let ratio = 1 / goal;
  for (let i = 1; i < goal; i++) {
    columns.push(ratio + "fr");
    columns.push("0fr");
    if (i > progress) {
      items.push(h("div", { class: "remain" }));
      items.push(h("div", { class: "empty" }, i));
    }
    else {
      items.push(h("div", { class: "filled" }));
      items.push(h("div", { class: "progress" }, i));
    }
  }
  columns.push(ratio + "fr");
  columns.push("0fr");
  // reward success
  if (goal <= progress) {
    columns.push("0fr");
    items.push(h("div", { class: "filled" }));
    items.push(h("div", { class: "progress bg" }, goal));
    items.push(h("div", { class: "gift" }, h(Gift, null)));
  }
  // reward fail
  else {
    columns.push("0fr");
    items.push(h("div", { class: "remain" }));
    items.push(h("div", { class: "empty bg" }, goal));
    items.push(h("div", { class: "gift bw" }, h(Gift, null)));
  }
  return {
    items,
    columns: columns.join(" "),
  };
}
function addLinearRepeatable({ progress, goal, progressBarUnit, finite, }) {
  let repetitions = Math.floor(progress / goal);
  let ratio = ((progress % goal) / goal) * 0.5;
  const items = [];
  let columns = "";
  // 0 repetition
  if (repetitions == 0) {
    columns = ratio + "fr 0fr " + (0.5 - ratio) + "fr 0fr 0fr 0.5fr 0fr 0fr";
    items.push(h("div", { class: "filled" }));
    items.push(h("div", { class: progress == goal ? "progress top bg" : "progress top" }, progressBarUnit + progress));
    items.push(h("div", { class: "remain" }));
    items.push(h("div", { class: "progress bg" }, progressBarUnit + goal));
    items.push(h("div", { class: progress == goal ? "gift" : "gift bw" },
      h(Gift, null)));
    items.push(h("div", { class: "remain" }));
    items.push(h("div", { class: "progress bg" }, progressBarUnit + goal * 2));
    items.push(h("div", { class: "gift bw" }, h(Gift, null)));
  }
  // single repetition
  else if (repetitions == 1) {
    columns =
      "0.5fr 0fr 0fr " + ratio + "fr 0fr " + (0.5 - ratio) + "fr 0fr 0fr";
    items.push(h("div", { class: "filled" }));
    items.push(h("div", { class: "progress bg" }, progressBarUnit + goal));
    items.push(h("div", { class: "gift" }, h(Gift, null)));
    items.push(h("div", { class: "filled" }));
    items.push(h("div", { class: progress == goal ? "progress top bg" : "progress top" }, progress == goal ? "" : progressBarUnit + progress));
    items.push(h("div", { class: "remain" }));
    items.push(h("div", { class: "progress bg" }, progressBarUnit + goal * 2));
    items.push(h("div", { class: "gift bw" }, h(Gift, null)));
  }
  // finite repetition hit
  else if (finite && repetitions >= finite) {
    if (repetitions > 2) {
      items.push(h("div", { class: "progress bg" }, progressBarUnit + goal * (finite - 2)));
      items.push(h("div", { class: "gift start" }, h(Gift, null)));
      columns = "0fr 0fr 0.5fr 0fr 0fr 0.5fr 0fr 0fr";
    }
    else {
      columns = "0.5fr 0fr 0fr 0.5fr 0fr 0fr";
    }
    items.push(h("div", { class: "filled" }));
    items.push(h("div", { class: "progress bg" }, progressBarUnit + goal * (finite - 1)));
    items.push(h("div", { class: "gift" }, h(Gift, null)));
    items.push(h("div", { class: "filled" }));
    items.push(h("div", { class: "progress bg" }, progressBarUnit + goal * finite));
    items.push(h("div", { class: "gift" }, h(Gift, null)));
  }
  // multiple repetitions
  else {
    columns =
      "0fr 0fr 0.5fr 0fr 0fr " +
        ratio +
        "fr 0fr " +
        (0.5 - ratio) +
        "fr 0fr 0fr";
    items.push(h("div", { class: "progress bg" }, progressBarUnit + goal * (repetitions - 1)));
    items.push(h("div", { class: "gift start" }, h(Gift, null)));
    items.push(h("div", { class: "filled" }));
    items.push(h("div", { class: "progress bg" }, progressBarUnit + goal * repetitions));
    items.push(h("div", { class: "gift" }, h(Gift, null)));
    items.push(h("div", { class: "filled" }));
    items.push(h("div", { class: progress == goal * repetitions ? "progress top bg" : "progress top" }, progress == goal * repetitions ? "" : progressBarUnit + progress));
    items.push(h("div", { class: "remain" }));
    items.push(h("div", { class: "progress bg" }, progressBarUnit + goal * (repetitions + 1)));
    items.push(h("div", { class: "gift bw" }, h(Gift, null)));
  }
  return { items, columns };
}
function addStepsRepeatable({ progress, goal, finite, }) {
  const items = [];
  const columns = [];
  let repetitions = Math.floor(progress / goal);
  // no or single repetition
  if (repetitions < 2) {
    let ratio = 1 / goal;
    for (let i = 1; i < goal * 2 + 1; i++) {
      columns.push(ratio + "fr");
      columns.push("0fr");
      if (i > progress) {
        if (i == goal) {
          columns.push("0fr");
          items.push(h("div", { class: "remain" }));
          items.push(h("div", { class: "empty bg" }, goal));
          items.push(h("div", { class: "gift bw" }, h(Gift, null)));
        }
        else if (i == goal * 2) {
          columns.push("0fr");
          columns.push("0fr");
          items.push(h("div", { class: "remain" }));
          items.push(h("div", { class: "empty bg" }, goal * 2));
          items.push(h("div", { class: "gift bw" }, h(Gift, null)));
        }
        else {
          items.push(h("div", { class: "remain" }));
          items.push(h("div", { class: "empty" }, i));
        }
      }
      else if (i == goal) {
        columns.push("0fr");
        items.push(h("div", { class: "filled" }));
        items.push(h("div", { class: "progress bg" }, i));
        items.push(h("div", { class: "gift" }, h(Gift, null)));
      }
      else {
        items.push(h("div", { class: "filled" }));
        items.push(h("div", { class: "progress" }, i));
      }
    }
  }
  // finite repetition hit
  else if (finite && repetitions >= finite) {
    let ratio = 1 / goal;
    if (repetitions > 2) {
      columns.push("0fr");
      columns.push("0fr");
      items.push(h("div", { class: "progress bg" }, goal * (finite - 2)));
      items.push(h("div", { class: "gift start" }, h(Gift, null)));
    }
    for (let i = 1; i < goal * 2 + 1; i++) {
      columns.push(ratio + "fr");
      columns.push("0fr");
      if (i > progress) {
        if (i == goal) {
          columns.push("0fr");
          items.push(h("div", { class: "remain" }));
          items.push(h("div", { class: "progress bg" }, goal * (finite - 1)));
          items.push(h("div", { class: "gift bw" }, h(Gift, null)));
        }
      }
      else if (i == goal) {
        columns.push("0fr");
        items.push(h("div", { class: "filled" }));
        items.push(h("div", { class: "progress bg" }, goal * (finite - 1)));
        items.push(h("div", { class: "gift" }, h(Gift, null)));
      }
      else if (i == goal * 2) {
        columns.push("0fr");
        columns.push("0fr");
        items.push(h("div", { class: "filled" }));
        items.push(h("div", { class: "progress bg" }, goal * finite));
        items.push(h("div", { class: "gift" }, h(Gift, null)));
      }
      else {
        items.push(h("div", { class: "filled" }));
        items.push(h("div", { class: "progress" }, i + goal * (finite - 2)));
      }
    }
  }
  // case repetition many
  else {
    let position = (progress % goal) + goal;
    let ratio = 1 / goal;
    columns.push("0fr");
    columns.push("0fr");
    items.push(h("div", { class: "progress bg" }, goal * (repetitions - 1)));
    items.push(h("div", { class: "gift start" }, h(Gift, null)));
    for (let i = 1; i < goal * 2 + 1; i++) {
      columns.push(ratio + "fr");
      columns.push("0fr");
      if (i <= goal) {
        if (i == goal) {
          columns.push("0fr");
          items.push(h("div", { class: "filled" }));
          items.push(h("div", { class: "progress bg" }, i + goal * (repetitions - 1)));
          items.push(h("div", { class: "gift" }, h(Gift, null)));
        }
        else {
          items.push(h("div", { class: "filled" }));
          items.push(h("div", { class: "progress" }, i + goal * (repetitions - 1)));
        }
      }
      else if (i > position) {
        if (i == goal * 2) {
          columns.push("0fr");
          columns.push("0fr");
          items.push(h("div", { class: "remain" }));
          items.push(h("div", { class: "empty bg" }, i + goal * (repetitions - 1)));
          items.push(h("div", { class: "gift bw" }, h(Gift, null)));
        }
        else {
          items.push(h("div", { class: "remain" }));
          items.push(h("div", { class: "empty" }, i + goal * (repetitions - 1)));
        }
      }
      else {
        items.push(h("div", { class: "filled" }));
        items.push(h("div", { class: "progress" }, i + goal * (repetitions - 1)));
      }
    }
  }
  return { items, columns: columns.join(" ") };
}
function addLinear({ progress, goal, progressBarUnit, }) {
  const items = [];
  let columns = "";
  const ratio = progress / goal;
  columns =
    clamp(ratio, 0, 1) + "fr 0fr " + clamp(1 - ratio, 0, 1) + "fr 0fr 0fr";
  items.push(h("div", { class: "filled" }));
  items.push(h("div", { class: clamp(progress, 0, goal) == goal ? "progress top bg" : "progress top" }, clamp(progress, 0, goal) == goal
    ? ""
    : progressBarUnit + clamp(progress, 0, goal)));
  items.push(h("div", { class: "remain" }));
  items.push(h("div", { class: "progress bg" }, progressBarUnit + goal));
  items.push(h("div", { class: clamp(progress, 0, goal) == goal ? "gift" : "gift bw" },
    h(Gift, null)));
  return { items, columns };
}
function clamp(x, min, max) {
  return Math.min(Math.max(x, min), max);
}

const checkmark_circle = () => {
  return (h("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M1.81818 10C1.81818 5.48131 5.48131 1.81818 10 1.81818C14.5187 1.81818 18.1818 5.48131 18.1818 10C18.1818 14.5187 14.5187 18.1818 10 18.1818C5.48131 18.1818 1.81818 14.5187 1.81818 10ZM10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM15.7692 6.96189C16.1398 6.48683 16.0551 5.80132 15.58 5.43077C15.1049 5.06022 14.4194 5.14495 14.0489 5.62001L8.72994 12.4391L5.86229 9.5715C5.43627 9.14548 4.74554 9.14548 4.31952 9.5715C3.89349 9.99752 3.89349 10.6882 4.31952 11.1143L8.05976 14.8545C8.28083 15.0756 8.58613 15.1912 8.89818 15.172C9.21023 15.1528 9.49905 15.0006 9.69133 14.7541L15.7692 6.96189Z", fill: "currentColor" })));
};
const checkmark_filled = () => {
  return (h("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    h("circle", { cx: "10", cy: "10", r: "10", fill: "currentColor" }),
    h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M14.65 6.19231C15.0459 6.5011 15.1165 7.07236 14.8077 7.46825L9.74277 13.9617C9.58254 14.1672 9.34186 14.294 9.08182 14.31C8.82178 14.326 8.56736 14.2297 8.38314 14.0454L5.26627 10.9286C4.91124 10.5735 4.91124 9.99794 5.26627 9.64292C5.62129 9.2879 6.19689 9.2879 6.55191 9.64292L8.94162 12.0326L13.3741 6.35001C13.6828 5.95412 14.2541 5.88352 14.65 6.19231Z", fill: "white" })));
};
const arrow_left_right = () => {
  return (h("svg", { width: 11, height: 12, fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.265 2.789a.346.346 0 000-.489L8.066.101a.346.346 0 10-.489.489l1.61 1.609H2.073a.691.691 0 00-.69.691v1.728a.346.346 0 00.69 0V2.89h7.114L7.577 4.5a.346.346 0 10.49.488l2.198-2.2zM.101 9.21a.346.346 0 000 .489l2.2 2.199a.346.346 0 00.488-.489l-1.61-1.609h7.114c.382 0 .691-.31.691-.691V7.382a.346.346 0 00-.691 0V9.11H1.18L2.789 7.5a.346.346 0 10-.489-.488l-2.199 2.2z", fill: "currentColor" })));
};

const style = {
  TaskCard: {
    display: "inline-block",
    width: "100%",
    "& .main": {
      position: "relative",
      boxSizing: "border-box",
      background: "var(--sl-color-neutral-0)",
      border: "1px solid var(--sl-color-neutral-200)",
      borderRadius: "var(--sl-border-radius-medium)",
      boxShadow: "1px 2px 4px rgba(211, 211, 211, 0.2)",
      fontSize: "var(--sl-font-size-small)",
      lineHeight: "var(--sl-line-height-dense)",
      color: "var(--sl-color-neutral-600)",
    },
    "& .main.complete": {
      background: "var(--sl-color-primary-50)",
      borderColor: "var(--sl-color-primary-500)",
    },
    "& .main.expired": {
      color: "var(--sl-color-neutral-600)",
      background: "var(--sl-color-neutral-50)",
    },
    "& .title": {
      fontSize: "var(--sl-font-size-medium)",
      // fontWeight: "var(--sl-font-weight-semibold)",
      color: "var(--sl-color-neutral-950)",
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
    color: "var(--sl-color-primary-600)",
    border: "1px solid var(--sl-color-neutral-200)",
    borderRadius: "var(--sl-border-radius-medium) var(--sl-border-radius-medium) 0 0",
    borderBottom: "none",
    background: "var(--sl-color-primary-50)",
    fontWeight: "var(--sl-font-weight-semibold)",
    lineHeight: "var(--sl-line-height-dense)",
    "& .icon": {
      position: "relative",
      top: "0.1em",
      marginRight: "var(--sl-spacing-small)",
      color: "var(--sl-color-primary-500)",
    },
  },
  Ended: {
    fontSize: "var(--sl-font-size-small)",
    padding: "var(--sl-spacing-medium)",
    color: "var(--sl-color-warning-600)",
    border: "1px solid var(--sl-color-neutral-200)",
    borderRadius: "var(--sl-border-radius-medium) var(--sl-border-radius-medium) 0 0",
    borderBottom: "none",
    background: "var(--sl-color-warning-50)",
    fontWeight: "var(--sl-font-weight-semibold)",
    lineHeight: "var(--sl-line-height-dense)",
    "& .icon": {
      position: "relative",
      top: "0.1em",
      marginRight: "var(--sl-spacing-small)",
      color: "var(--sl-color-warning-500)",
    },
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
      color: "var(--sl-color-neutral-400)",
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
    "& .datetime": {
      display: "block",
      marginTop: "var(--sl-spacing-xx-small)",
      color: "var(--sl-color-neutral-400)",
    },
  },
};
const sheet = createStyleSheet(style);
const styleString = sheet.toString();
function TaskCardView(props) {
  var _a, _b, _c;
  console.log("TASK CARD PROPS " + ((_a = props === null || props === void 0 ? void 0 : props.content) === null || _a === void 0 ? void 0 : _a.cardTitle));
  console.log({ props });
  const { callbacks, states, content } = props;
  const dateStart = content.showExpiry &&
    luxon.DateTime.fromISO(content.rewardDuration.split("/")[0]);
  const dateEnd = content.showExpiry &&
    luxon.DateTime.fromISO(content.rewardDuration.split("/")[1]);
  const dateToday = luxon.DateTime.now();
  if (content.displayDuration) {
    const start = (_b = content.displayDuration.split("/")) === null || _b === void 0 ? void 0 : _b[0];
    const end = (_c = content.displayDuration.split("/")) === null || _c === void 0 ? void 0 : _c[1];
    const displayDateStart = start ? luxon.DateTime.fromISO(start) : dateToday;
    const displayDateEnd = end ? luxon.DateTime.fromISO(end) : dateToday;
    console.log({ displayDateStart, dateToday, displayDateEnd });
    if (dateToday < displayDateStart || dateToday > displayDateEnd)
      return h("span", null);
  }
  const checkmark_circle$1 = checkmark_circle();
  const checkmark_filled$1 = checkmark_filled();
  const arrow_left_right$1 = arrow_left_right();
  const showComplete = states.progress >= content.goal;
  const repetitions = content.showProgressBar
    ? Math.floor(states.progress / content.goal)
    : states.progress;
  const taskComplete = (showComplete && content.repeatable === false) ||
    (content.finite && states.progress >= content.finite * content.goal);
  const taskEnded = content.showExpiry && dateEnd <= dateToday;
  const taskNotStarted = content.showExpiry && dateToday <= dateStart;
  const taskUnavailable = taskEnded || taskNotStarted;
  const vanillaStyle = `
	:host{
		display: block;
		margin-bottom: var(--sl-spacing-large);
	}
  `;
  return (h("div", { class: sheet.classes.TaskCard },
    h("style", { type: "text/css" },
      styleString,
      vanillaStyle),
    !states.loading && taskNotStarted && (h("div", { class: sheet.classes.NotStarted },
      h("span", { class: "icon" },
        h("sl-icon", { name: "info-circle-fill" })),
      intl.formatMessage({
        id: "startsOnMessage",
        defaultMessage: content.startsOnMessage,
      }, {
        startDate: dateStart
          .setLocale(luxonLocale(states.locale))
          .toLocaleString(luxon.DateTime.DATETIME_MED),
      }))),
    !states.loading && taskEnded && (h("div", { class: sheet.classes.Ended },
      h("span", { class: "icon" },
        h("sl-icon", { name: "exclamation-triangle-fill" })),
      intl.formatMessage({
        id: "endedMessage",
        defaultMessage: content.endedMessage,
      }, {
        endDate: dateEnd
          .setLocale(luxonLocale(states.locale))
          .toLocaleString(luxon.DateTime.DATETIME_MED),
      }))),
    h("div", { style: {
        borderRadius: taskUnavailable &&
          "0 0 var(--sl-border-radius-medium) var(--sl-border-radius-medium)",
      }, class: taskUnavailable
        ? "main expired"
        : taskComplete
          ? "main complete"
          : "main" },
      h("div", { class: taskComplete || taskUnavailable ? "container subdued" : "container" },
        h("div", { class: sheet.classes.Header }, states.loading ? (h("sl-skeleton", { style: { width: "22%", margin: "0" } })) : (h("div", null,
          showComplete && (h("span", { class: taskUnavailable ? "icon neutral" : "icon" }, taskComplete ? checkmark_filled$1 : checkmark_circle$1)),
          h("span", { class: "value" }, content.rewardAmount),
          h("span", { class: "text" }, content.rewardUnit)))),
        states.loading ? (h("sl-skeleton", { style: { width: "42%", margin: "var(--sl-spacing-medium) 0" } })) : (h("div", { class: "title", style: {
            marginBottom: !content.description
              ? content.steps
                ? "var(--sl-spacing-x-large)"
                : content.showProgressBar
                  ? "var(--sl-spacing-xx-large)"
                  : ""
              : "",
          } }, content.cardTitle)),
        states.loading ? (h("sl-skeleton", { style: { margin: "var(--sl-spacing-medium) 0" } })) : (content.description && h(Details, Object.assign({}, props))),
        content.showProgressBar && states.loading ? (h("sl-skeleton", { style: { margin: "var(--sl-spacing-medium) 0" } })) : (content.showProgressBar && (h(ProgressBarView, Object.assign({}, props.content, props.states, { complete: taskComplete, expired: taskUnavailable })))),
        h("div", { class: sheet.classes.Footer }, states.loading ? (h("sl-skeleton", { style: { width: "25%", marginLeft: "auto" } })) : (h("div", { style: { display: "contents" } },
          h("span", { class: "text" },
            content.repeatable && (h("div", null,
              h("span", { class: repetitions > 0
                  ? taskUnavailable
                    ? "icon neutral"
                    : "icon success"
                  : "icon" }, arrow_left_right$1),
              h("span", { class: repetitions > 0
                  ? taskUnavailable
                    ? "neutral"
                    : "success"
                  : "" }, intl.formatMessage({
                id: "completedMessage",
                defaultMessage: content.completedText,
              }, {
                finite: content.finite,
                count: content.finite
                  ? Math.min(repetitions, content.finite)
                  : repetitions,
              })))),
            content.showExpiry && !taskUnavailable && (h("span", { class: "datetime" }, intl.formatMessage({
              id: "expiryMessage",
              defaultMessage: content.expiryMessage,
            }, {
              endDate: dateEnd
                .setLocale(luxonLocale(states.locale))
                .toLocaleString(luxon.DateTime.DATETIME_MED),
            })))),
          h("sl-button", { class: taskUnavailable
              ? "action neutral"
              : taskComplete
                ? "action disabled"
                : "action", type: "primary", size: "small", onClick: callbacks.onClick, loading: states.loadingEvent, disabled: taskComplete || taskUnavailable }, content.buttonText))))))));
}

export { ProgressBarView as P, TaskCardView as T };
