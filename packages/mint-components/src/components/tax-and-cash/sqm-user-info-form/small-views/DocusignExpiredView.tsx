import { h } from "@stencil/core";
import { createStyleSheet } from "../../../../styling/JSS";

export interface DocusignExpiredViewProps {
  text: {
    docusignExpired: string;
  };
}

const style = {
  Container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    gap: "10px",
    margin: "auto",
    textAlign: "center",
    border: "var(--sqm-border-thickness) solid var(--sqm-border-color)",
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export const DocusignExpiredView = (props: DocusignExpiredViewProps) => {
  const { classes } = sheet;
  const { text } = props;
  return (
    <div>
      <style type="text/css">{styleString}</style>
      <div class={classes.Container}>
        <sl-icon
          style={{
            width: "50px",
            height: "50px",
            color: "var(--sl-color-neutral-500)",
          }}
          name="clock"
        ></sl-icon>
        <p style={{ margin: "0" }}>{text.docusignExpired}</p>
      </div>
    </div>
  );
};
