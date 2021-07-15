import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

export interface PortalSectionProps {
  labelMargin: string;
  padding: string;
  label: VNode;
  content: VNode;
}

export function PortalSectionView(props: PortalSectionProps) {
  const style = {
    LabelContainer: {
      margin: props.labelMargin,
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div>
      <style type="text/css">{styleString}</style>
      <div class={sheet.classes.LabelContainer}>{props.label}</div>
      {props.content}
    </div>
  );
}
