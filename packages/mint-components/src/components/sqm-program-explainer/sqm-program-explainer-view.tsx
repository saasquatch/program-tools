import { h, VNode } from "@stencil/core";

import jss from "jss";
import preset from "jss-preset-default";

export interface ProgramExplainerViewProps {
  header: string;
  headerColor: string;
  headerBackground: string;
  cardTitle: string;
  cardDescription: string;
  cardColor: string;
  cardBackground: string;
}
export function ProgramExplainerView(
  props: ProgramExplainerViewProps,
  children: VNode
) {
  const style = {
    Container: {
      display: "flex",
      flexDirection: "row",
      "@media (max-width: 499px)": {
        flexDirection: "column",
      },
    },
    Header: {
      padding: "var(--sl-spacing-large)",
      color: props.headerColor,
      background: props.headerBackground,
    },
    Card: {
      padding: "var(--sl-spacing-large)",
      color: props.cardColor,
      background: props.cardBackground,
    },
    Title: {
      fontSize: "var(--sl-font-size-x-large)",
      fontWeight: "var(--sl-font-weight-bold)",
      lineHeight: "var(--sl-line-height-dense)",
    },
    Description: {
      fontSize: "var(--sl-font-size-medium)",
      marginTop: "var(--sl-spacing-x-small)",
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  const vanillaStyle = `
  ::slotted(*){
    display: flex;
    width: 100%;
  }
  @media (max-width: 499px) {
    ::slotted(*){
      display: block;
    }
  }`;
  
  return (
    <div>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <div class={sheet.classes.Header}>
        <div class={sheet.classes.Title}>{props.header}</div>
      </div>
      <div class={sheet.classes.Container}>{children}</div>
      <div class={sheet.classes.Card}>
        <div class={sheet.classes.Title}>{props.cardTitle}</div>
        <div class={sheet.classes.Description}>{props.cardDescription}</div>
      </div>
    </div>
  );
}
