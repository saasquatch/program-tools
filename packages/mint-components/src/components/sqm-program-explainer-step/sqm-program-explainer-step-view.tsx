import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

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
      height: "444px",
      color: props.color,
      background: props.background,
      padding: "24px",

      "@media (max-width: 768px)": {
        flexDirection: "row",
        width: "auto",
        height: "auto",
      },
    },
    Logo: {},
    Text: {
      "@media (max-width: 768px)": {
        marginLeft: "24px",
      },
    },
    Title: {
      fontSize: "16px",
      fontWeight: "var(--sl-font-weight-bold)",
      textTransform: "uppercase",
      lineHeight: "24px",
      marginTop: "24px",
      "@media (max-width: 768px)": {
        margin: "0",
      },
    },
    Description: {
      fontSize: "16px",
      lineHeight: "28px",
      marginTop: "12px",
      "@media (max-width: 768px)": {
        marginTop: "8px",
      },
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  console.log(props);

  const vanillaStyle = `
  :host{
  display: flex;
    width: 100%;
  }
  @media (max-width: 768px) {
    :host{
      display: block;
    }
  }`;
  
  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <div class={sheet.classes.Logo}>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "100%",
            background: "#F4F5F7",
            color: "var(--sl-color-primary-400)",
            textAlign: "center",
            lineHeight: "72px",
          }}
        >
          <div style={{ fontSize: "26px" }}>
            <sl-icon name={props.icon}></sl-icon>
          </div>
        </div>
      </div>
      <div class={sheet.classes.Text}>
        <div class={sheet.classes.Title}>{props.cardTitle}</div>
        <div class={sheet.classes.Description}>{props.description}</div>
      </div>
    </div>
  );
}
