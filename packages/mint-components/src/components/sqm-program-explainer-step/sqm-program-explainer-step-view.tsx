import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface ProgramExplainerStepViewProps {
  header: string;
  description: string;
  textColor?: string;
  backgroundColor?: string;
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
      color: props.textColor || "var(--sl-color-neutral-900)",
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
      fontSize: "var(--sl-font-size-large)",
      fontWeight: "var(--sl-font-weight-bold)",
      marginTop: "var(--sl-spacing-x-large)",
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
    Media: {
      width: "64px",
      height: "64px",
      borderRadius: "100%",
      objectFit: "cover",
      userSelect: "none",
      background: "#FFF",
      color: "var(--sl-color-primary-300)",
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
    <div
      class={sheet.classes.Container}
      part="sqm-program-explainer-step-container"
    >
      <style type="text/css">{styleString}</style>
      <div>
        {props.imageUrl ? (
          <img
            class={sheet.classes.Media}
            src={props.imageUrl}
            part="sqm-program-explainer-step-media"
          />
        ) : (
          <div
            class={sheet.classes.Media}
            part="sqm-program-explainer-step-media"
          >
            <sl-icon name={props.icon} />
          </div>
        )}
      </div>
      <div class={sheet.classes.Text}>
        <div
          class={sheet.classes.Header}
          part="sqm-program-explainer-step-header"
        >
          {props.header}
        </div>
        <div
          class={sheet.classes.Description}
          part="sqm-program-explainer-step-description"
        >
          {props.description}
        </div>
      </div>
    </div>
  );
}
