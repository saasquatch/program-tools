import { h, Host, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

export interface HeroProps {
  states: {
    background?: string;
    wrapDirection: "wrap" | "wrap-reverse";
  };
  content: {
    leftColumn?: VNode;
    rightColumn?: VNode;
  };
}

export function HeroView(props: HeroProps, children: VNode[]) {
  const { states, content } = props;

  const isValidColor = (teststr: string) => {
    return CSS.supports(`(color: ${teststr})`);
  };

  const parseBackground = (provided_bg: string) => {
    if (provided_bg) {
      if (isValidColor(provided_bg)) {
        return provided_bg;
      } else {
        return `url(${provided_bg})`;
      }
    } else {
      return "";
    }
  };

  const column = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
  };

  const style = {
    TwoColumnContainer: {
      display: "flex",
      flexWrap: states.wrapDirection,
      "& > div": { flex: "1", minWidth: "300px" },
    },
    ColumnWrapper: {
      ...column,
    },
    SingleColumnContainer: {
      ...column,
    },
    Container: {
      width: "100%",
      ...column,
      alignItems: "unset",
      background: `no-repeat center/cover ${parseBackground(
        states.background
      )}`,
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
      {children?.length === 1 ? (
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
