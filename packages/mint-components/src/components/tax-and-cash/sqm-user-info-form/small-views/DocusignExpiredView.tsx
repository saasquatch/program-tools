import { h } from "@stencil/core";
import { createStyleSheet } from "../../../../styling/JSS";

const style = {
  Container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    gap: "10px",
    maxWidth: "500px",
    margin: "auto",
    textAlign: "center",
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export const DocusignExpiredView = () => {
  const { classes } = sheet;
  return (
    <div>
      <style type="text/css">{styleString}</style>
      {/* ZH: Need to figure out how to propify this text */}
      <div class={classes.Container}>
        <sl-icon
          style={{
            width: "50px",
            height: "50px",
            color: "var(--sl-color-neutral-500)",
          }}
          name="clock"
        ></sl-icon>
        <p style={{ margin: "0" }}>
          For your security and privacy, we automatically end your session after
          20 minutes of inactivity. Please refresh and re-enter your tax
          information to continue.
        </p>
      </div>
    </div>
  );
};
