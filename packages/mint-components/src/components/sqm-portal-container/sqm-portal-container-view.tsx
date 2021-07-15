import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { gap } from "../../global/mixins";

interface PortalContainerViewProps {
  direction: "row" | "column";
  padding: string;
  gap: string;
}

export function PortalContainerView(
  props: PortalContainerViewProps,
  children: VNode
) {
  const style = {
    Container: {
      display: "flex",
      "flex-direction": props.direction,
      padding: props.padding,
      ...gap({ direction: props.direction, size: props.gap }),
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">{styleString}</style>
      {children}
    </div>
  );
}
