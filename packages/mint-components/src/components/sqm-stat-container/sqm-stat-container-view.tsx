import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface StatContainerProps {
  space: string;
}

export function StatContainerView(props: StatContainerProps, children: VNode) {
  const divideSpace = () => {
    const spaceValue = getComputedStyle(
      document.documentElement
    ).getPropertyValue(`--sl-spacing-${props.space}`);
    return `${Math.floor(parseInt(spaceValue) / 2)}rem`;
  };

  const style = {
    StatContainer: {
      width: "100%",
      display: "grid",
      "grid-template-columns": "repeat(auto-fill, minmax(130px, auto))",
      gap: divideSpace(),
      // First set of styles applies when shadow DOM is disabled, second set applies when shadow DOM is enabled
      "& > *": {
        "border-right": "1px solid #EAEAEA",
        "padding-right": divideSpace(),
      },
      "& > :last-child": {
        "border-right": "1px solid #ffffff",
      },
      "& > ::slotted(*)": {
        "border-right": "1px solid #EAEAEA",
        "padding-right": divideSpace(),
        height: "100%",
      },
      "& > ::slotted(*:last-child)": {
        "border-right": "none",
      },
      // TODO: Try Make this happen without media queries
      // "@media screen and (max-width: 499px)": {
      //   gridTemplateColumns: "1fr",

      //   "& > *": {
      //     borderRight: "none",
      //     paddingRight: "none",
      //   },

      //   "& > :last-child": {
      //     borderRight: "none",
      //     paddingRight: "none",
      //   },
      //   "& > ::slotted(*)": {
      //     borderRight: "none",
      //     paddingRight: "none",
      //   },
      // },
    },
    StatFrame: {
      display: "flex",
    },
    BorderFix: {
      "border-right": "1px solid #ffffff",
      width: "0px",
      "margin-left": "-1px",
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.StatFrame}>
      <div class={sheet.classes.StatContainer}>
        <style type="text/css">{styleString}</style>
        {children}
      </div>
      <div class={sheet.classes.BorderFix}></div>
    </div>
  );
}
