import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface ProgramExplainerStepViewProps {
  cardTitle: string;
  description: string;
  color: string;
  background: string;
  icon: string;
}

export function ProgramExplainerStepView(props: ProgramExplainerStepViewProps) {
  const style = {
    Container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      color: props.color,
      background: props.background,
      padding: "var(--sl-spacing-large)",
      //   paddingBottom: "var(--sl-spacing-xxx-large)",

      "@media (max-width: 499px)": {
        flexDirection: "row",
        width: "auto",
        paddingBottom: "var(--sl-spacing-large)",
      },
    },
    Text: {
      "@media (max-width: 499px)": {
        marginLeft: "var(--sl-spacing-large)",
      },
    },
    Title: {
      textTransform: "uppercase",
      fontSize: "var(--sl-font-size-medium)",
      fontWeight: "var(--sl-font-weight-bold)",
      lineHeight: "var(--sl-line-height-dense)",
      marginTop: "var(--sl-spacing-large)",
      "@media (max-width: 499px)": {
        margin: "0",
      },
    },
    Description: {
      fontSize: "var(--sl-font-size-medium)",
      marginTop: "var(--sl-spacing-small)",
      "@media (max-width: 499px)": {
        marginTop: "var(--sl-spacing-x-small)",
      },
    },
    Icon: {
      width: "64px",
      height: "64px",
      borderRadius: "100%",
      background: "#F4F5F7",
      color: "var(--sl-color-primary-400)",
      fontSize: "26px",
      textAlign: "center",
      lineHeight: "72px",
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  const vanillaStyle = `
  :host{
    display: flex;
    width: 100%;
  }
  @media (max-width: 499px) {
    :host{
      display: block;
    }
  }`;

  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">{styleString}</style>
      <div>
        <div class={sheet.classes.Icon}>
          <sl-icon name={props.icon}></sl-icon>
        </div>
      </div>
      <div class={sheet.classes.Text}>
        <div class={sheet.classes.Title}>{props.cardTitle}</div>
        <div class={sheet.classes.Description}>{props.description}</div>
      </div>
    </div>
  );
}
