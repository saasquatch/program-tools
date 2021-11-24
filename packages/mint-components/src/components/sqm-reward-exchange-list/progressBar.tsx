import { h } from "@stencil/core";

function Dot({ active }: { active?: boolean }) {
  console.log({ active });
  return (
    <div
      style={{
        flex: "1 1 0",
      }}
    >
      <div
        style={{
          backgroundColor: "#9E9E9E",
          borderRadius: "50%",
          width: "12px",
          height: "12px",
          margin: "0 auto",
          marginTop: "-3px",
        }}
      ></div>
    </div>
  );
}

export function ProgressBar({ stage }) {
  console.log({ stage });
  return (
    <div
      style={{
        content: "''",
        width: "100%",
        height: "4px",
        borderRadius: "4px",
        background: "#9E9E9E",
        position: "relative",
        bottom: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        columnGap: "50px",
      }}
    >
      <Dot />
      <Dot />
      <Dot />
    </div>
  );
}
