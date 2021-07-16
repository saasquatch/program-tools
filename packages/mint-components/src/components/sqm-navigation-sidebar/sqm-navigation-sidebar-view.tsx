import { h, VNode } from "@stencil/core";

import jss from "jss";
import preset from "jss-preset-default";
import { gap } from "../../global/mixins";


export interface NavigationSidebarViewProps {
}

const style = {
  ItemsContainer: { ...gap({ direction: "column" as const, size: "4px" }) },
};

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function NavigationSidebarView(
  // @ts-ignore - Stencil requires props (even if empty)
  props: NavigationSidebarViewProps,
  children: VNode
) {
  return (
    <div part="base">
      <style type="text/css">{styleString}</style>
      <div class={sheet.classes.ItemsContainer}>{children}</div>
    </div>
  );
}
