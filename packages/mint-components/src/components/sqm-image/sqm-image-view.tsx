import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface ImageViewProps {
  imageUrl: string;
  left?: string;
  right?: string;
  align?: "left" | "center" | "right";
  backgroundColor?: string;
  maxHeight?: string; // helps with constraining minimum size
  maxWidth?: string; // helps with constraining maximum size
}

export function ImageView(props: ImageViewProps) {
  const style = {
    Container: {
      display: "flex",
      width: "100%",
      justifyContent: props.align || "center",
      background: props.backgroundColor || "",
    },
    Image: {
      maxWidth: props.maxWidth || "100%",
      maxHiehgt: props.maxHeight || "100%",
      objectFit: "cover",
      marginLeft: props.left || "0",
      marginRight: props.right || "0",
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  console.log(props);

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