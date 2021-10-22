import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

export type ReferralIframeViewProps = {
  data: {
    content: {
      iframeSrc: string;
    };
    shareCode: string;
  };
};

const style = {
  Container: {
    position: "relative",
    width: "100%",
    height: "105vh",
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

export function ReferralIframeView(props: ReferralIframeViewProps) {
  const { data } = props;
  console.log(data)
  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">{styleString}</style>
      <iframe
        class={sheet.classes.IFrame}
        src={`${data.content.iframeSrc}?rsCode=${data.shareCode}`}
      ></iframe>
    </div>
  );
}
