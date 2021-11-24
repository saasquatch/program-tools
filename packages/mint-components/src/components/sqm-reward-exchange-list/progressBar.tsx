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
  console.log({ active });
  return (
    <div
      style={{
        flex: "1 1 0",
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
          width: "12px",
          height: "12px",
          margin: completed ? "-2px auto 0px" : "-6px auto 0px",
        }}
      ></div>
    </div>
  );
}

function ProgressOne({ active, completed, incomplete }) {
  return (
    <div
      style={{
        content: "''",
        flex: "1 1 0",
        height: "4px",
        borderRadius: "4px",
        background: incomplete ? "#E5E5E5" : "#9E9E9E",
        position: "relative",
        bottom: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        columnGap: "50px",
      }}
    >
      <Dot active={active} completed={completed} incomplete={incomplete} />
    </div>
  );
}

function ProgressTwo({ active, completed, incomplete }) {
  return (
    <div
      style={{
        content: "''",
        flex: "1 1 0",
        height: "4px",
        borderRadius: "4px",
        background: incomplete ? "#E5E5E5" : "#9E9E9E",
        position: "relative",
        bottom: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        columnGap: "50px",
      }}
    >
      <Dot active={active} completed={completed} incomplete={incomplete} />
    </div>
  );
}

function ProgressThree({ active, completed, incomplete }) {
  return (
    <div
      style={{
        content: "''",
        flex: "1 1 0",
        height: "4px",
        borderRadius: "4px",
        background: incomplete ? "#E5E5E5" : "#9E9E9E",
        position: "relative",
        bottom: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        columnGap: "50px",
      }}
    >
      <Dot active={active} completed={completed} incomplete={incomplete} />
    </div>
  );
}

export function ProgressBar({ stage }: { stage: number }) {
  console.log({ stage });

  return (
    <div style={{ display: "flex", columnGap: "-2px" }}>
      <ProgressOne
        active={stage === 0}
        completed={stage > 0}
        incomplete={stage < 0}
      />
      <ProgressTwo
        active={stage === 1}
        completed={stage > 1}
        incomplete={stage < 1}
      />
      <ProgressThree
        active={stage === 2}
        completed={stage > 2}
        incomplete={stage < 2}
      />
    </div>
  );
}
