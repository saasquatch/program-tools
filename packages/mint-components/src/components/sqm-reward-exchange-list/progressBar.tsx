import { h } from "@stencil/core";

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
            ? "2px solid #9E9E9E"
            : incomplete
            ? "2px solid #E5E5E5"
            : "none",
          borderRadius: "50%",
          width: completed ? "12px" : "8px",
          height: completed ? "12px" : "8px",
          margin: "-4px auto 0px",
          zIndex: "1",
          boxSizing: "content-box",
        }}
      ></div>
    </div>
  );
}

function Progress({ active, completed, incomplete }) {
  return [
    <div
      style={{
        content: "''",
        flex: "0.5 0.5 0",
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
    ></div>,
    <Dot active={active} completed={completed} incomplete={incomplete} />,
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
    ></div>,
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
