import { h } from "@stencil/core";
import { CheckMark } from "./SVGs";

function Dot({
  active,
  completed,
  incomplete,
}: {
  active?: boolean;
  completed: boolean;
  incomplete?: boolean;
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
          backgroundColor: completed ? "#9E9E9E" : "#FFF",
          border: active
            ? "3px solid #9E9E9E"
            : incomplete
            ? "3px solid #E5E5E5"
            : "3px solid #9E9E9E",
          borderRadius: "50%",
          width: "10px",
          height: "10px",
          margin: "-6px auto 0px",
          zIndex: "1",
          boxSizing: "content-box",
        }}
      >
        {completed && (
          <div style={{ top: "-6px", position: "relative" }}>
            <CheckMark />
          </div>
        )}
      </div>
    </div>
  );
}

function ProgressLine({ incomplete = false, active = false }) {
  return (
    <div
      style={{
        content: "''",
        flex: "0.5 0.5 0",
        height: "4px",
        borderRadius: "4px",
        background: incomplete || active ? "#E5E5E5" : "#9E9E9E",
        position: "relative",
        bottom: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        columnGap: "50px",
        marginRight: "-2px",
        boxSizing: "content-box",
      }}
    ></div>
  );
}

function Progress({ active, completed, incomplete }) {
  return [
    <ProgressLine incomplete={incomplete} />,
    <Dot active={active} completed={completed} incomplete={incomplete} />,
    <ProgressLine incomplete={incomplete} active={active} />,
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
        />
      ))}
    </div>
  );
}
