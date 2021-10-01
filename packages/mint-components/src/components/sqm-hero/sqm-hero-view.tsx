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

  console.log(states.backgroundImage);

  const column = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
  };

  const style = {
    TwoColumnContainer: { display: "flex", "& > div": { width: "50%" } },
    ColumnWrapper: {
      ...column,
    },
    SingleColumnContainer: {
      ...column,
      backgroundImage: `${
        states.backgroundImage ? `url(${states.backgroundImage})` : ""
      }`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
    Container: {
      width: "100%",
      minHeight: "100%",
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  const vanillaStyle = `
  :host{    
    height: 100%;
  }
  sqm-hero{    
    height: 100%;
  }
  img{
      max-width: 100%;
      height: auto;
  }
`;

  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      {states.columns == 1 ? (
        <div class={sheet.classes.SingleColumnContainer}>{children}</div>
      ) : (
        <div class={sheet.classes.TwoColumnContainer}>
          <div class={sheet.classes.ColumnWrapper}>{content.leftColumn}</div>
          <div class={sheet.classes.ColumnWrapper}>{content.rightColumn}</div>
        </div>
      )}
    </div>
  );
}
