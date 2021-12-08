import { h } from "@stencil/core";
import { CheckMark } from "./SVGs";

function Dot({
  active,
  completed,
  incomplete,
  stage,
}: {
  active?: boolean;
  completed: boolean;
  incomplete?: boolean;
  stage?: number;
}) {
  return (
    <div
      style={{
        flex: "0 0 0",
        content: "''",
        height: "4px",
        borderRadius: "4px",
        background: incomplete ? "#E5E5E5" : "#9E9E9E",
        position: "relative",
        bottom: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        columnGap: "50px",
        marginRight: "-2px",
        boxSizing: "content-box",
      }}
    >
      <div
        style={{
          backgroundColor: completed
            ? "var(--sl-color-success-500)"
            : incomplete
            ? "var(--sl-color-neutral-200)"
            : "var(--sl-color-neutral-0)",
          border: active
            ? "1px solid var(--sl-color-success-500)"
            : incomplete
            ? "1px solid var(--sl-color-neutral-200)"
            : "1px solid var(--sl-color-success-500)",
          borderRadius: "50%",
          width: "23px",
          height: "23px",
          margin: "-11px",
          zIndex: "1",
          boxSizing: "content-box",
        }}
      >
        {completed ? (
          <div style={{ top: "-10.5%", left: "23.5%", position: "relative" }}>
            <CheckMark />
          </div>
        ) : (
          <div
            style={{
              color: active
                ? "var(--sl-color-success-500)"
                : "var(--sl-color-neutral-50)",
              top: "-9%",
              left: "28%",
              position: "relative",
            }}
          >
            {stage + 1}
          </div>
        )}
      </div>
    </div>
  );
}

function ProgressLine({
  incomplete = false,
  active = false,
  invisible = false,
}) {
  return (
    <div
      style={{
        content: "''",
        flex: "0.5 0.5 0",
        height: "4px",
        borderRadius: "4px",
        background:
          incomplete || active ? "#E5E5E5" : "var(--sl-color-success-500)",
        position: "relative",
        bottom: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        columnGap: "50px",
        marginRight: "-2px",
        boxSizing: "content-box",
        opacity: invisible ? "0" : "1",
      }}
    ></div>
  );
}

function Progress({ active, completed, incomplete, stage }) {
  //   if (stage === 2) {
  //     return [
  //       <Dot
  //         active={active}
  //         completed={completed}
  //         incomplete={incomplete}
  //         stage={stage}
  //       />,
  //     ];
  //   }
  return [
    <ProgressLine incomplete={incomplete} invisible={stage === 0} />,
    <Dot
      active={active}
      completed={completed}
      incomplete={incomplete}
      stage={stage}
    />,
    <ProgressLine
      incomplete={incomplete}
      active={active}
      invisible={stage === 2}
    />,
  ];
}

export function ProgressBar({
  stageCount,
  currentStage,
}: {
  stageCount: number;
  currentStage: number;
}) {
  return (
    <div style={{ display: "flex", columnGap: "-2px" }}>
      {Array.from(Array(stageCount).keys()).map((stage) => (
        <Progress
          active={currentStage === stage}
          completed={currentStage > stage}
          incomplete={currentStage < stage}
          stage={stage}
        />
      ))}
    </div>
  );
}
