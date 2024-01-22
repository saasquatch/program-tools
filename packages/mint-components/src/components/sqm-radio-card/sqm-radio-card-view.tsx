import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface RadioCardViewProps {
  icon: any;
  title: string;
  description: string;
  selected: boolean;
}

const style = {
  Container: {
    borderRadius: "var(--sl-border-radius-large)",
    color: "var(--sl-color-neutral-900)",
    background: "var(--sl-color-neutral-0)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--sl-spacing-small)",
    padding: "16px",
    cursor: "pointer",
  },
  TitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "var(--sl-spacing-small)",
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

const vanillaStyle = `
    :host{
      display: block;   
    }
    * {
        p {
            margin: 0;
        }
    }
    sl-checkbox::part(base) {

        position: absolute;
        top: 16px;
        right: 16px;
    }
    sl-checkbox::part(control) {
        border-radius: 50%;
    }
  `;

export const RadioCardView = ({
  title,
  icon,
  description,
  selected,
}: RadioCardViewProps) => {
  const border = selected
    ? "1px solid var(--sl-color-primary-500)"
    : "1px solid #CACFD3";

  return (
    <div
      part="sqm-base"
      class={sheet.classes.Container}
      style={{
        border,
      }}
    >
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <sl-checkbox checked={selected}></sl-checkbox>
      <div part="sqm-title-container" class={sheet.classes.TitleContainer}>
        <sl-icon name={icon}></sl-icon>
        <p>{title}</p>
      </div>
      <p>{description}</p>
    </div>
  );
};
