import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface ProgramExplainerStepViewProps {
  header: string;
  description: string;
  textColor?: string;
  backgroundColor?: string;
  borderRadius?: string;
  iconBackgroundColor?: string;
  iconColor?: string;
  imageUrl?: string;
  icon?: string;
}

export function ProgramExplainerStepView(props: ProgramExplainerStepViewProps) {
  const style = {
    Container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      padding: "var(--sl-spacing-x-large)",
      lineHeight: "var(--sl-line-height-dense)",
      borderRadius: props.borderRadius || "var(--sl-border-radius-large)",
      color: props.textColor || "var(--sqm-text)",
      background: props.backgroundColor || "var(--sl-color-primary-50)",
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
    Header: {
      color: props.textColor || "var(--sqm-text)",
      fontSize: "var(--sl-font-size-large)",
      fontWeight: "var(--sl-font-weight-bold)",
      marginTop: "var(--sl-spacing-x-large)",
      "@media (max-width: 499px)": {
        margin: "0",
      },
    },
    Description: {
      color: props.textColor || "var(--sqm-text)",
      fontSize: "var(--sl-font-size-medium)",
      marginTop: "var(--sl-spacing-small)",
      "@media (max-width: 499px)": {
        marginTop: "var(--sl-spacing-x-small)",
      },
    },
    Media: {
      width: "64px",
      height: "64px",
      borderRadius: "100%",
      objectFit: "cover",
      userSelect: "none",
      background: props.iconBackgroundColor || "var(--sl-color-white)",
      color: props.iconColor || "var(--sl-color-primary-500)",
      fontSize: "26px",
      textAlign: "center",
      lineHeight: "72px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
    <div class={sheet.classes.Container} part="sqm-base">
      <style type="text/css">{styleString}</style>
      <div>
        {props.imageUrl ? (
          <img
            class={sheet.classes.Media}
            src={props.imageUrl}
            part="sqm-media"
          />
        ) : (
          <div class={sheet.classes.Media} part="sqm-media">
            <sl-icon name={props.icon} />
          </div>
        )}
      </div>
      <div class={sheet.classes.Text}>
        <div class={sheet.classes.Header} part="sqm-header">
          {props.header}
        </div>
        <div class={sheet.classes.Description} part="sqm-description">
          {props.description}
        </div>
      </div>
    </div>
  );
}
