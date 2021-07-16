import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

interface DividedLayoutViewProps {
  direction: "row" | "column";
}

export function DividedLayoutView(
  props: DividedLayoutViewProps,
  children: VNode
) {
  const getBorder = () => {
    if (props.direction === "row") {
      return { "border-right": "1px solid #EAEAEA" };
    } else {
      return { "border-bottom": "1px solid #EAEAEA" };
    }
  };

  const style = {
    LayoutContainer: {
      display: "flex",
      "flex-direction": props.direction,
      "background-color": "#fff",
      "& > :not(:last-child)": {
        ...getBorder(),
      },
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.LayoutContainer}>
      <style type="text/css">{styleString}</style>
      {children}
    </div>
  );
}
