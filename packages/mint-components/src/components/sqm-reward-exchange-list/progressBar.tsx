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
        }}
      ></div>
    </div>
  );
}

// function ProgressOne({ active, completed, incomplete }) {
//   return (
//     <div
//       style={{
//         content: "''",
//         flex: "1 1 0",
//         height: "4px",
//         borderRadius: "4px",
//         background: incomplete ? "#E5E5E5" : "#9E9E9E",
//         position: "relative",
//         bottom: "0",
//         left: "0",
//         display: "flex",
//         justifyContent: "center",
//         columnGap: "50px",
//         marginRight: "-2px",
//       }}
//     >
//       <Dot active={active} completed={completed} incomplete={incomplete} />
//     </div>
//   );
// }

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
      }}
    ></div>,
  ];
}

// function ProgressThree({ active, completed, incomplete }) {
//   return (
//     <div
//       style={{
//         content: "''",
//         flex: "1 1 0",
//         height: "4px",
//         borderRadius: "4px",
//         background: incomplete ? "#E5E5E5" : "#9E9E9E",
//         position: "relative",
//         bottom: "0",
//         left: "0",
//         display: "flex",
//         justifyContent: "center",
//         columnGap: "50px",
//       }}
//     >
//       <Dot active={active} completed={completed} incomplete={incomplete} />
//     </div>
//   );
// }

export function ProgressBar({ stage }: { stage: number }) {
  console.log({ stage });

  return (
    <div style={{ display: "flex", columnGap: "-2px" }}>
      <Progress
        active={stage === 0}
        completed={stage > 0}
        incomplete={stage < 0}
      />
      <Progress
        active={stage === 1}
        completed={stage > 1}
        incomplete={stage < 1}
      />
      <Progress
        active={stage === 2}
        completed={stage > 2}
        incomplete={stage < 2}
      />
    </div>
  );
}
