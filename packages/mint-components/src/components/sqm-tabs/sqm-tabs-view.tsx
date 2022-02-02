import { h, Host, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

type TabsViewProps = {
  open?: boolean;
  tabName?: string;
};

const style = {};
const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export const TabsView = ({ open, tabName }: TabsViewProps, children: any) => {
  console.log(open, tabName);
  return (
    <Host>
      <style type="text/css">{styleString}</style>
      {children}
    </Host>
  );
};
