import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { Spacing } from "../../global/mixins";

export interface PortalSectionProps {
  labelMargin: Spacing;
  padding: Spacing;
  label: VNode;
  content: VNode;
}

export function PortalSectionView(props: PortalSectionProps) {
  const style = {
    LabelContainer: {
      "margin-bottom":
        props.labelMargin === "none"
          ? props.labelMargin
          : `var(--sl-spacing-${props.labelMargin})`,
    },
    SectionContainer: {
      padding:
        props.padding === "none"
          ? "0"
          : `var(--sl-spacing-${props.padding})`,
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.SectionContainer}>
      <style type="text/css">{styleString}</style>
      <div class={sheet.classes.LabelContainer}>{props.label}</div>
      {props.content}
    </div>
  );
}
