import { h, Host } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

type TabViewProps = {
  open: boolean;
};

const style = {
  OpenStyle: {
    "sl-button::part(base)": {
      background: "orange",
    },
  },
};
const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export const TabView = ({ open }: TabViewProps, children) => {
  console.log("OPEN IS ", open);
  return (
    <Host>
      <style type="text/css">{styleString}</style>
      <div style={{ display: open ? "block" : "none" }}>{children}</div>
    </Host>
  );
};
