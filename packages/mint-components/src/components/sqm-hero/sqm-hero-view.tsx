import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { isMobile, isValidColor } from "../../utilities";

export interface HeroProps {
  states: {
    columns: 1 | 2;
    background?: string;
    secondaryBackground?: string;
    paddingSize: "none" | "small" | "medium" | "large";
    wrapDirection: "wrap" | "wrap-reverse";
  };
  content: {
    primaryColumn?: VNode | VNode[];
    secondaryColumn?: VNode;
  };
}

const paddingList = [
  "var(--sl-spacing-xxx-small)",
  "var(--sl-spacing-xx-small)",
  "var(--sl-spacing-x-small)",
  "var(--sl-spacing-small)",
  "var(--sl-spacing-medium)",
  "var(--sl-spacing-large)",
  "var(--sl-spacing-x-large)",
  "var(--sl-spacing-xx-large)",
  "var(--sl-spacing-xxx-large)",
  "var(--sl-spacing-xxxx-large)",
];

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

export function HeroView(props: HeroProps) {
  const { states, content } = props;

  const getVertivalPadding = (size: string, half?: boolean) => {
    const sizes = {
      small: 7,
      medium: 8,
      large: 9,
    };

    var index: number = sizes[size];

    if (isMobile(767)) {
      index = index - 2;
    } else if (isMobile(1023)) {
      index = index - 1;
    }
    return half ? paddingList[index - 2] : paddingList[index];
  };

  const getHorizontalPadding = (size: string) => {
    if (size == "small") {
      return "1%";
    } else if (size == "medium") {
      return "3%";
    } else {
      return "5%";
    }
  };

  // Dependent on props, not feasiable to move out
  const style = {
    TwoColumnContainer: {
      display: "flex",
      "@media screen and (max-width: 1023px)": {
        flexDirection:
          states.wrapDirection == "wrap-reverse" ? "column-reverse" : "column",
        justfiyContent: "center",
      },
    },
    ColumnPadding: {
      paddingTop:
        states.paddingSize == "none"
          ? "0px"
          : getVertivalPadding(states.paddingSize),
      paddingBottom:
        states.paddingSize == "none"
          ? "0px"
          : getVertivalPadding(states.paddingSize),
      paddingLeft:
        states.paddingSize == "none"
          ? "0px"
          : getHorizontalPadding(states.paddingSize),
      paddingRight:
        states.paddingSize == "none"
          ? "0px"
          : getHorizontalPadding(states.paddingSize),
    },
    ColumnWrapper: {
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
      display: "block",
    },
    SingleColumnContainer: {
      background: `no-repeat center/cover ${parseBackground(
        states.background
      )}`,
      flex: "1 1 0",
    },
    Container: {
      width: "100%",
      maxWidth: "var(--sqm-max-width)",
      margin: "0 auto",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minHeight: "100%",
    },
  };

  const sheet = createStyleSheet(style);
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
          <div
            class={`${sheet.classes.ColumnWrapper} ${sheet.classes.ColumnPadding}`}
          >
            {content.primaryColumn}
          </div>
          <div
            class={`${sheet.classes.ColumnWrapper} ${sheet.classes.ColumnPadding}`}
          >
            {content.secondaryColumn}
          </div>
        </div>
      ) : (
        <div
          class={`${sheet.classes.SingleColumnContainer} ${sheet.classes.ColumnPadding}`}
        >
          {content.primaryColumn}
        </div>
      )}
    </div>
  );
}
