import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";
import { Gift } from "./SVGs";

export type ProgressBarProps = {
  progress?: number;
  goal?: number;
  progressBarUnit?: string;
  steps?: boolean;
  repeatable?: boolean;
  complete?: boolean;
  expired?: boolean;
  finite?: number;
};

const style = {
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

const sheet = createStyleSheet(style, { classNamePrefix: "sqm-prog-bar" });
const styleString = sheet.toString();

export function ProgressBarView(props: ProgressBarProps): VNode {
  const {
    progress = 0,
    goal = 1,
    steps = false,
    progressBarUnit = "",
    repeatable = false,
    expired = false,
    finite = 0,
  } = props;

  let aggregate: Aggregate = buildProgressBar(repeatable, steps, props);
  const { columns, items } = aggregate;

  //@ts-ignore
  console.log("PROGRESS BAR PROPS "+props?.content?.cardTitle);
  console.log({ props });
  return (
    <div
      class={sheet.classes.ProgressBar}
      data-expired={expired}
      data-steps={steps}
      data-done={goal <= progress}
    >
      <style type="text/css">{styleString}</style>
      <div
        class={
          (!Boolean(finite) && progress >= 2 * goal) ||
          (Boolean(finite) && progress > 2 * goal)
            ? "progress-bar repeatable-steps"
            : "progress-bar"
        }
        style={{ gridTemplateColumns: columns }}
      >
        {items}
      </div>
    </div>
  );
}

function buildProgressBar(
  repeatable: boolean,
  steps: boolean,
  props: ProgressBarProps
) {
  if (repeatable) {
    if (steps) {
      return addStepsRepeatable(props);
    } else {
      return addLinearRepeatable(props);
    }
  }
  // non repeatable
  else {
    if (steps) {
      return addSteps(props);
    } else {
      return addLinear(props);
    }
  }
}

function addSteps({ progress, goal }: ProgressBarProps): Aggregate {
  const items = [];
  const columns = [];
  let ratio = 1 / goal;
  for (let i = 1; i < goal; i++) {
    columns.push(ratio + "fr");
    columns.push("0fr");
    if (i > progress) {
      items.push(<div class={"remain"}></div>);
      items.push(<div class={"empty"}>{i}</div>);
    } else {
      items.push(<div class={"filled"}></div>);
      items.push(<div class={"progress"}>{i}</div>);
    }
  }
  columns.push(ratio + "fr");
  columns.push("0fr");
  // reward success
  if (goal <= progress) {
    columns.push("0fr");
    items.push(<div class={"filled"}></div>);
    items.push(<div class={"progress bg"}>{goal}</div>);
    items.push(<div class="gift">{<Gift />}</div>);
  }

  // reward fail
  else {
    columns.push("0fr");
    items.push(<div class={"remain"}></div>);
    items.push(<div class={"empty bg"}>{goal}</div>);
    items.push(<div class="gift bw">{<Gift />}</div>);
  }
  return {
    items,
    columns: columns.join(" "),
  };
}

function addLinearRepeatable({
  progress,
  goal,
  progressBarUnit,
  finite,
}: ProgressBarProps): Aggregate {
  let repetitions = Math.floor(progress / goal);
  let ratio = ((progress % goal) / goal) * 0.5;
  const items = [];
  let columns: string = "";

  // 0 repetition
  if (repetitions == 0) {
    columns = ratio + "fr 0fr " + (0.5 - ratio) + "fr 0fr 0fr 0.5fr 0fr 0fr";
    items.push(<div class={"filled"}></div>);
    items.push(
      <div class={progress == goal ? "progress top bg" : "progress top"}>
        {progressBarUnit + progress}
      </div>
    );
    items.push(<div class={"remain"}></div>);
    items.push(<div class={"progress bg"}>{progressBarUnit + goal}</div>);
    items.push(
      <div class={progress == goal ? "gift" : "gift bw"}>
        <Gift />
      </div>
    );
    items.push(<div class={"remain"}></div>);
    items.push(<div class={"progress bg"}>{progressBarUnit + goal * 2}</div>);
    items.push(<div class="gift bw">{<Gift />}</div>);
  }

  // single repetition
  else if (repetitions == 1) {
    columns =
      "0.5fr 0fr 0fr " + ratio + "fr 0fr " + (0.5 - ratio) + "fr 0fr 0fr";
    items.push(<div class={"filled"}></div>);
    items.push(<div class={"progress bg"}>{progressBarUnit + goal}</div>);
    items.push(<div class="gift">{<Gift />}</div>);
    items.push(<div class={"filled"}></div>);
    items.push(
      <div class={progress == goal ? "progress top bg" : "progress top"}>
        {progress == goal ? "" : progressBarUnit + progress}
      </div>
    );
    items.push(<div class={"remain"}></div>);
    items.push(<div class={"progress bg"}>{progressBarUnit + goal * 2}</div>);
    items.push(<div class="gift bw">{<Gift />}</div>);
  }

  // finite repetition hit
  else if (finite && repetitions >= finite) {
    if (repetitions > 2) {
      items.push(
        <div class={"progress bg"}>{progressBarUnit + goal * (finite - 2)}</div>
      );
      items.push(<div class="gift start">{<Gift />}</div>);
      columns = "0fr 0fr 0.5fr 0fr 0fr 0.5fr 0fr 0fr";
    } else {
      columns = "0.5fr 0fr 0fr 0.5fr 0fr 0fr";
    }
    items.push(<div class={"filled"}></div>);
    items.push(
      <div class={"progress bg"}>{progressBarUnit + goal * (finite - 1)}</div>
    );
    items.push(<div class="gift">{<Gift />}</div>);
    items.push(<div class={"filled"}></div>);
    items.push(
      <div class={"progress bg"}>{progressBarUnit + goal * finite}</div>
    );
    items.push(<div class="gift">{<Gift />}</div>);
  }

  // multiple repetitions
  else {
    columns =
      "0fr 0fr 0.5fr 0fr 0fr " +
      ratio +
      "fr 0fr " +
      (0.5 - ratio) +
      "fr 0fr 0fr";
    items.push(
      <div class={"progress bg"}>
        {progressBarUnit + goal * (repetitions - 1)}
      </div>
    );
    items.push(<div class="gift start">{<Gift />}</div>);
    items.push(<div class={"filled"}></div>);
    items.push(
      <div class={"progress bg"}>{progressBarUnit + goal * repetitions}</div>
    );
    items.push(<div class="gift">{<Gift />}</div>);
    items.push(<div class={"filled"}></div>);
    items.push(
      <div
        class={
          progress == goal * repetitions ? "progress top bg" : "progress top"
        }
      >
        {progress == goal * repetitions ? "" : progressBarUnit + progress}
      </div>
    );
    items.push(<div class={"remain"}></div>);
    items.push(
      <div class={"progress bg"}>
        {progressBarUnit + goal * (repetitions + 1)}
      </div>
    );
    items.push(<div class="gift bw">{<Gift />}</div>);
  }
  return { items, columns };
}

function addStepsRepeatable({
  progress,
  goal,
  finite,
}: ProgressBarProps): Aggregate {
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
          items.push(<div class={"remain"}></div>);
          items.push(<div class={"empty bg"}>{goal}</div>);
          items.push(<div class="gift bw">{<Gift />}</div>);
        } else if (i == goal * 2) {
          columns.push("0fr");
          columns.push("0fr");
          items.push(<div class={"remain"}></div>);
          items.push(<div class={"empty bg"}>{goal * 2}</div>);
          items.push(<div class={"gift bw"}>{<Gift />}</div>);
        } else {
          items.push(<div class={"remain"}></div>);
          items.push(<div class={"empty"}>{i}</div>);
        }
      } else if (i == goal) {
        columns.push("0fr");
        items.push(<div class={"filled"}></div>);
        items.push(<div class={"progress bg"}>{i}</div>);
        items.push(<div class="gift">{<Gift />}</div>);
      } else {
        items.push(<div class={"filled"}></div>);
        items.push(<div class={"progress"}>{i}</div>);
      }
    }
  }

  // finite repetition hit
  else if (finite && repetitions >= finite) {
    let ratio = 1 / goal;
    if (repetitions > 2) {
      columns.push("0fr");
      columns.push("0fr");
      items.push(<div class={"progress bg"}>{goal * (finite - 2)}</div>);
      items.push(<div class={"gift start"}>{<Gift />}</div>);
    }
    for (let i = 1; i < goal * 2 + 1; i++) {
      columns.push(ratio + "fr");
      columns.push("0fr");
      if (i > progress) {
        if (i == goal) {
          columns.push("0fr");
          items.push(<div class={"remain"}></div>);
          items.push(<div class={"progress bg"}>{goal * (finite - 1)}</div>);
          items.push(<div class="gift bw">{<Gift />}</div>);
        }
      } else if (i == goal) {
        columns.push("0fr");
        items.push(<div class={"filled"}></div>);
        items.push(<div class={"progress bg"}>{goal * (finite - 1)}</div>);
        items.push(<div class="gift">{<Gift />}</div>);
      } else if (i == goal * 2) {
        columns.push("0fr");
        columns.push("0fr");
        items.push(<div class={"filled"}></div>);
        items.push(<div class={"progress bg"}>{goal * finite}</div>);
        items.push(<div class={"gift"}>{<Gift />}</div>);
      } else {
        items.push(<div class={"filled"}></div>);
        items.push(<div class={"progress"}>{i + goal * (finite - 2)}</div>);
      }
    }
  }

  // case repetition many
  else {
    let position = (progress % goal) + goal;
    let ratio = 1 / goal;
    columns.push("0fr");
    columns.push("0fr");
    items.push(<div class={"progress bg"}>{goal * (repetitions - 1)}</div>);
    items.push(<div class={"gift start"}>{<Gift />}</div>);
    for (let i = 1; i < goal * 2 + 1; i++) {
      columns.push(ratio + "fr");
      columns.push("0fr");
      if (i <= goal) {
        if (i == goal) {
          columns.push("0fr");
          items.push(<div class={"filled"}></div>);
          items.push(
            <div class={"progress bg"}>{i + goal * (repetitions - 1)}</div>
          );
          items.push(<div class={"gift"}>{<Gift />}</div>);
        } else {
          items.push(<div class={"filled"}></div>);
          items.push(
            <div class={"progress"}>{i + goal * (repetitions - 1)}</div>
          );
        }
      } else if (i > position) {
        if (i == goal * 2) {
          columns.push("0fr");
          columns.push("0fr");
          items.push(<div class={"remain"}></div>);
          items.push(
            <div class={"empty bg"}>{i + goal * (repetitions - 1)}</div>
          );
          items.push(<div class={"gift bw"}>{<Gift />}</div>);
        } else {
          items.push(<div class={"remain"}></div>);
          items.push(<div class={"empty"}>{i + goal * (repetitions - 1)}</div>);
        }
      } else {
        items.push(<div class={"filled"}></div>);
        items.push(
          <div class={"progress"}>{i + goal * (repetitions - 1)}</div>
        );
      }
    }
  }
  return { items, columns: columns.join(" ") };
}

function addLinear({
  progress,
  goal,
  progressBarUnit,
}: ProgressBarProps): Aggregate {
  const items = [];
  let columns = "";
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
        : progressBarUnit + clamp(progress, 0, goal)}
    </div>
  );
  items.push(<div class={"remain"}></div>);
  items.push(<div class={"progress bg"}>{progressBarUnit + goal}</div>);
  items.push(
    <div class={clamp(progress, 0, goal) == goal ? "gift" : "gift bw"}>
      <Gift />
    </div>
  );
  return { items, columns };
}

type Aggregate = {
  items: VNode[];
  columns: string;
};

function clamp(x: number, min: number, max: number) {
  return Math.min(Math.max(x, min), max);
}
