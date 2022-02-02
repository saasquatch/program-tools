import { h, Host, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

type TabViewProps = {
  state: { open: boolean };
  callbacks: { setOpen: any };
  tabName: string;
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

export const TabView = (
  { state: { open }, callbacks: { setOpen }, tabName }: TabViewProps,
  children
) => {
  console.log("OPEN IS ", open);
  return (
    <Host>
      <style type="text/css">{styleString}</style>
      <div>
        <sl-button
          className={open ? sheet.classes.OpenStyle : ""}
          role="tab"
          onClick={setOpen}
        >
          {tabName}
        </sl-button>
        {open && children}
      </div>
    </Host>
  );
};
