import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { gap } from "../../global/mixins";

export interface NavigationSidebarItemViewProps {
  states: {
    active: boolean;
  };
  data: {
    label: string;
    icon: string;
  };
  callbacks: {
    onClick: (e: MouseEvent) => void;
  };
}

export function NavigationSidebarItemView(props: NavigationSidebarItemViewProps) {
  const { states, data, callbacks } = props;

  const style = {
    ItemContainer: {
      display: "flex",
      "background-color": `${states.active ? "#eeeeee" : "#ffffff"}`,
      "border-radius": "8px",
      padding: "8px",
      "align-items": "center",
      ...gap({ direction: "row" as const, size: "14px" }),
    },
    Label: {
      margin: "0",
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div onClick={callbacks.onClick} class={sheet.classes.ItemContainer}>
      <style type="text/css">{styleString}</style>
      <sl-icon name={data.icon}></sl-icon>
      <p class={sheet.classes.Label}>{data.label}</p>
    </div>
  );
}
