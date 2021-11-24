import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

export type ReferralIframeViewProps = {
  states: {
    content: {
      iframeSrc: string;
      iframeHeight: string;
      iframeWidth: string;
    };
  };
  data: {
    shareCode: string;
  };
};

export function ReferralIframeView(props: ReferralIframeViewProps) {
  const { states, data } = props;
  const { content } = states;
  const style = {
    Container: {
      position: "relative",
      width: content.iframeWidth,
      height: content.iframeHeight,
    },
    IFrame: {
      position: "absolute",
      width: "100%",
      height: "100%",
      border: "0",
      top: "0",
      left: "0",
      right: "0",
    },
  };
  // JSS config
  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">{styleString}</style>
      <iframe
        class={sheet.classes.IFrame}
        src={`${content.iframeSrc}?rsCode=${data.shareCode}`}
      ></iframe>
    </div>
  );
}
