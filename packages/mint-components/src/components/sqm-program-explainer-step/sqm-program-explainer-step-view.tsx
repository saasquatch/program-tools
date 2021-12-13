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
      width: "100%",
      height: "100%",
      placeItems: "center",
      placeContent: "center",
      color: props.color,
      background: props.background,
    },
    Logo: {
      margin: "var(--sl-spacing-x-large)",
    },
    Text: {
      margin: "var(--sl-spacing-x-large)",
    },
    Title: {
      textTransform: "uppercase",
      fontSize: "var(--sl-font-size-large)",
      fontWeight: "var(--sl-font-weight-semibold)",
    },
    Description: {
      fontSize: "var(--sl-font-size-medium)",
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div
      style={{
        resize: "both",
        overflow: "hidden",
        height: "600px",
        width: "500px",
      }}
    >
      <div class={sheet.classes.Container}>
        <style type="text/css">{styleString}</style>
        <div class={sheet.classes.Logo}>
          <div
            style={{ width: "64px", height: "64px", background: "white" }}
          ></div>
        </div>
        <div class={sheet.classes.Title}>{props.title}</div>
        <div class={sheet.classes.Description}>{props.description}</div>
      </div>
    </div>
  );
}
