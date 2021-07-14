import { h, VNode } from "@stencil/core";

import jss from "jss";
import preset from "jss-preset-default";
import { gap } from "../../global/mixins";

interface ProgramListEntry {
  key: string;
  label: string;
}

export interface NavigationSidebarViewProps {
  data: { programs: Array<ProgramListEntry> };
}

const style = {
  ProgramDropdown: {},
  ItemsContainer: { ...gap({ direction: "column" as const, size: "4px" }) },
};

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function NavigationSidebarView(
  props: NavigationSidebarViewProps,
  children: VNode
) {
  return (
    <div>
      <style type="text/css">{styleString}</style>
      <sl-select class={sheet.classes.ProgramDropdown}>
        <div class={sheet.classes.ItemsContainer}>
          {props.data.programs.map((program) => {
            return (
              <sl-menu-item value={program.key}>{program.label}</sl-menu-item>
            );
          })}
        </div>
      </sl-select>
      <div>{children}</div>
    </div>
  );
}
