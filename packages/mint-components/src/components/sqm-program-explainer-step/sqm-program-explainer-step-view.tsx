import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { gap } from "../../global/mixins";
import { Resizer } from "../sqm-stencilbook/Resizer";

export interface ProgramExplainerStepViewProps {
  title: string;
  description: string;
  color: string;
  background: string;
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

      "@media (max-width: 1024px)": {
        flexDirection: "row",
        width: "auto",
        height: "auto",
      },
    },
    Logo: {},
    Text: {
      "@media (max-width: 1024px)": {
        marginLeft: "24px",
      },
    },
    Title: {
      fontSize: "16px",
      fontWeight: "var(--sl-font-weight-bold)",
      textTransform: "uppercase",
      lineHeight: "24px",
      marginTop: "24px",
      "@media (max-width: 1024px)": {
        margin: "0",
      },
    },
    Description: {
      fontSize: "16px",
      lineHeight: "28px",
      marginTop: "12px",
      "@media (max-width: 1024px)": {
        marginTop: "8px",
      },
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">{styleString}</style>
      <div class={sheet.classes.Logo}>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "100%",
            background: "white",
          }}
        ></div>
      </div>
      <div class={sheet.classes.Text}>
        <div class={sheet.classes.Title}>{props.title}</div>
        <div class={sheet.classes.Description}>{props.description}</div>
      </div>
    </div>
  );
}
