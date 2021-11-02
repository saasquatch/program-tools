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
    minHeight: "100%",
  };

  const sidePadding = "5%";
  const sidePadding2x = "10%";

  const getVertivalPadding = () => {
    if (window.matchMedia("@media screen and (max-width: 767px)").matches) {
      return 20;
    } else if (
      window.matchMedia("@media screen and (max-width: 1023px)").matches
    ) {
      return 60;
    } else {
      return 80;
    }
  };

  const style = {
    TwoColumnContainer: {
      display: "flex",
      "@media screen and (max-width: 1023px)": {
        flexDirection:
          states.wrapDirection == "wrap-reverse" ? "column-reverse" : "column",
        justfiyContent: "center",
      },
    },
    ColumnWrapper: {
      paddingTop: `${getVertivalPadding()}px`,
      paddingBottom: `${getVertivalPadding()}px`,
      paddingLeft: sidePadding,
      paddingRight: sidePadding,
      "@media screen and (min-width: 1023px)": { flex: "1 1 0" },
      "@media screen and (max-width: 1023px)": {
        "&:first-of-type": {
          paddingBottom: `${getVertivalPadding() / 2}px`,
        },
        "&:last-of-type": {
          paddingTop: `${getVertivalPadding() / 2}px`,
        },
      },
      ...column,
    },
    SingleColumnContainer: {
      ...column,
    },
    Container: {
      width: "100%",
      maxWidth: "1280px",
      margin: "0 auto",
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

  // NOTE: Spacing on the columns is controlled on the slots itself. For example using inline styling
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
