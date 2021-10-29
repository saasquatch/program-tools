import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

export interface HeroProps {
  states: {
    columns: 1 | 2;
    background?: string;
    wrapDirection: "wrap" | "wrap-reverse";
  };
  content: {
    primaryColumn?: VNode | VNode[];
    secondaryColumn?: VNode;
  };
}

export function HeroView(props: HeroProps) {
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
      flex: 1,
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
    display: contents;
  }
  sqm-hero{    
    height: 100%;
    display: contents;
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
      {states.columns == 2 ? (
        <div class={sheet.classes.TwoColumnContainer}>
          <div class={sheet.classes.ColumnWrapper}>{content.primaryColumn}</div>
          <div class={sheet.classes.ColumnWrapper}>
            {content.secondaryColumn}
          </div>
        </div>
      ) : (
        <div class={sheet.classes.SingleColumnContainer}>
          {content.primaryColumn}
        </div>
      )}
    </div>
  );
}
