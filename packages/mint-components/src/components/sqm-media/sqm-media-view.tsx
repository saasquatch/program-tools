import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface MediaViewProps {
  imgUrl?: string;
  width?: string;
  height?: string;
  objectFit?: string;
  header?: string;
  description?: string;
  imageHeader?: string;
  imageDescription?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonNewTab?: boolean;
}

export function MediaView(props: MediaViewProps, children: VNode) {
  const overlay = Boolean(props.imageHeader || props.imageDescription);
  const showButton = Boolean(props.buttonText || props.buttonLink);
  const style = {
    Container: {
      position: "relative",
      maxWidth: props.width ? props.width : "100%",
      maxHeight: props.height ? props.height : "100%",
      "&:before": {
        content: overlay ? '""' : "",
        width: "100%",
        height: "100%",
        position: "absolute",
        background: "var(--sl-color-primary-900)",
        opacity: "0.75",
      },
    },
    Image: {
      display: "block",
      maxWidth: "inherit",
      maxHeight: "inherit",
      objectFit: props.objectFit ? props.objectFit : "cover",
    },
    Center: {
      position: "absolute",
      top: "50%",
      left: "50%",
      textAlign: "center",
      transform: "translate(-50%, -50%)",
    },
    ImageHeader: {
      color: "var(--sl-color-neutral-0)",
      fontSize: "var(--sl-font-size-xxx-large)",
      fontWeight: "var(--sl-font-weight-bold)",
      "@media (max-width: 899px)": {
        fontSize: "var(--sl-font-size-x-large)",
      },
      "@media (max-width: 499px)": {
        fontSize: "var(--sl-font-size-small)",
      },
      "@media (max-width: 399px)": {
        fontSize: "var(--sl-font-size-x-small)",
      },
    },
    ImageDescription: {
      color: "var(--sl-color-neutral-0)",
      fontSize: "var(--sl-font-size-x-large)",
      fontWeight: "var(--sl-font-weight-semibold)",
      "@media (max-width: 899px)": {
        fontSize: "var(--sl-font-size-medium)",
      },
      "@media (max-width: 499px)": {
        fontSize: "var(--sl-font-size-x-small)",
      },
      "@media (max-width: 399px)": {
        fontSize: "var(--sl-font-size-xx-small)",
      },
    },
    Header: {
      fontSize: "var(--sl-font-size-large)",
      fontWeight: "var(--sl-font-weight-semibold)",
    },
    Description: {
      fontSize: "var(--sl-font-size-medium)",
      fontWeight: "var(--sl-font-weight-normal)",
    },
    Button: {
      marginTop: "var(--sl-spacing-medium)",
      "@media (max-width: 499px)": {
        marginTop: "var(--sl-spacing-small)",
        transform: "scale(0.75)",
      },
      "@media (max-width: 399px)": {
        marginTop: "0",
      },
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  const vanillaStyle = `
  :host{
    display: block;
  }`;

  return (
    <div>
      {props.header && <div class={sheet.classes.Header}>{props.header}</div>}
      {props.description && (
        <div class={sheet.classes.Description}>{props.description}</div>
      )}
      <div class={sheet.classes.Container}>
        <style type="text/css">
          {vanillaStyle}
          {styleString}
        </style>

        {props.imgUrl && (
          <img class={sheet.classes.Image} src={props.imgUrl}></img>
        )}
        <div class={sheet.classes.Center}>
          {props.imageHeader && (
            <div class={sheet.classes.ImageHeader}>{props.imageHeader}</div>
          )}
          {props.imageDescription && (
            <div class={sheet.classes.ImageDescription}>
              {props.imageDescription}
            </div>
          )}
          {showButton && (
            <div class={sheet.classes.Button}>
              <sl-button type="primary">{props.buttonText}</sl-button>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
