import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface ImageViewProps {
  imageUrl: string;
  left?: string;
  right?: string;
  alignment?: "left" | "center" | "right";
  backgroundColor?: string;
  minHeight?: string; // helps with constraining minimum size
}

export function ImageView(props: ImageViewProps) {
  // Dependent on props, not feasiable to move out
  const style = {
    Container: {
      display: "flex",
      width: "100%",
      justifyContent: props.alignment || "center",
      background: props.backgroundColor || "",
    },
    Image: {
      minHeight: props.minHeight || "100%",
      width: "100%",
      maxWidth: "max-content",
      objectFit: "cover",
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  const vanillaStyle = `
    :host{
      display: block;   
    }
  `;

  return (
    <div>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <div class={sheet.classes.Container}>
        <img src={props.imageUrl} class={sheet.classes.Image} />
      </div>
    </div>
  );
}
