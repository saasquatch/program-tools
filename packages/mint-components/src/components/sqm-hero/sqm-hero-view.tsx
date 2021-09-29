import { h, Host, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

export interface HeroProps {
  states: {
    columns: 1 | 2;
    backgroundImage?: string;
  };
  content: {
    leftColumn?: VNode;
    rightColumn?: VNode;
  };
}

export function HeroView(props: HeroProps, children: VNode) {
  const { states, content } = props;

  const column = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  };

  const style = {
    TwoColumnContainer: { display: "flex", "& > div": { width: "50%" } },
    ColumnWrapper: {
      ...column,
    },
    SingleColumnContainer: {
      ...column,
      backgroundImage: `${
        states.backgroundImage ? states.backgroundImage : ""
      }`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
    Container: {
      width: "100%",
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">{styleString}</style>
      {states.columns == 1 ? (
        <div class={sheet.classes.SingleColumnContainer}>{children}</div>
      ) : (
        <div class={sheet.classes.TwoColumnContainer}>
          <div class={sheet.classes.ColumnWrapper}>{content.leftColumn}</div>
          <div class={sheet.classes.ColumnWrapper}>{content.leftColumn}</div>
        </div>
      )}
    </div>
  );
}
