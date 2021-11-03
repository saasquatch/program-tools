import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { isMobile } from "../../utilities";

export interface HeroProps {
  states: {
    columns: 1 | 2;
    background?: string;
    secondaryBackground?: string;
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

  const getVertivalPadding = (half?: boolean) => {
    if (isMobile(767)) {
      return half ? "var(--sl-spacing-small)" : "var(--sl-spacing-large)";
    } else if (isMobile(1023)) {
      return half ? "var(--sl-spacing-x-large)" : "var(--sl-spacing-xxx-large)";
    } else {
      return half
        ? "var(--sl-spacing-xx-large)"
        : "var(--sl-spacing-xxxx-large)";
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
      paddingTop: getVertivalPadding(),
      paddingBottom: getVertivalPadding(),
      paddingLeft: "5%",
      paddingRight: "5%",
      "&:first-of-type": {
        background: `no-repeat center/cover ${parseBackground(
          states.background
        )}`,
      },
      "&:last-of-type": {
        background: `no-repeat center/cover ${parseBackground(
          states.secondaryBackground
        )}`,
      },
      "@media screen and (min-width: 1023px)": { flex: "1 1 0" },
      "@media screen and (max-width: 1023px)": {
        "&:first-of-type": {
          paddingBottom: getVertivalPadding(true),
        },
        "&:last-of-type": {
          paddingTop: getVertivalPadding(true),
        },
      },
      ...column,
    },
    SingleColumnContainer: {
      background: `no-repeat center/cover ${parseBackground(
        states.background
      )}`,
      ...column,
    },
    Container: {
      width: "100%",
      maxWidth: "var(--sqm-max-width)",
      margin: "0 auto",
      flex: 1,
      ...column,
      alignItems: "unset",
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
