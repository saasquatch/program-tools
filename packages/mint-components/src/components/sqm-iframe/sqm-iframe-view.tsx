import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface IframeViewProps {
  iframeSrc: string;
  iframeTitle: string;
  iframeHeight: string;
  iframeWidth: string;
}

export function IframeView(props: IframeViewProps) {
  const { iframeTitle, iframeHeight, iframeWidth, iframeSrc } = props;

  const style = {
    Container: {
      position: "relative",
      width: iframeWidth,
      height: iframeHeight,
    },
    IFrame: {
      overflow: "scroll",
      position: "absolute",
      width: "100%",
      height: "100%",
      border: "0",
      top: "0",
      left: "0",
      right: "0",
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.Container}>
      <style type="text/css"> {styleString}</style>
      <iframe
        class={sheet.classes.IFrame}
        src={iframeSrc}
        title={iframeTitle}
      />
    </div>
  );
}
