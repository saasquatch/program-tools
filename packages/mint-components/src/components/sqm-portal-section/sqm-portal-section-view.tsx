import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

export interface PortalSectionProps {
  labelMargin: string;
  padding: string;
}

export function PortalSectionView(
  props: PortalSectionProps,
  label: VNode,
  content: VNode
) {
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
      <div class={sheet.classes.LabelContainer}>{label}</div>
      {content}
    </div>
  );
}
