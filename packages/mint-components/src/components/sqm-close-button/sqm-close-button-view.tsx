import { Host, h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { HostBlock, P } from "../../global/mixins";

export interface CloseButtonViewProps {
  onClick?: () => void;
  backgroundColor?: string;
}

const style = {
  HostBlock: HostBlock,
  icon: {
    fontSize: "24px",
    cursor: "pointer",
    position: "absolute",
    right: "var(--sl-spacing-medium)",
    top: "0",
    zIndex: "100",
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function CloseButtonView(props: CloseButtonViewProps) {
  const { onClick } = props;

  return (
    <div>
      <style type="text/css">{styleString}</style>
      <span class={sheet.classes.icon} onClick={onClick}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M56 5.64L50.36 0L28 22.36L5.64 0L0 5.64L22.36 28L0 50.36L5.64 56L28 33.64L50.36 56L56 50.36L33.64 28L56 5.64Z"
            fill={props.backgroundColor || "black"}
          />
        </svg>
      </span>
    </div>
  );
}
