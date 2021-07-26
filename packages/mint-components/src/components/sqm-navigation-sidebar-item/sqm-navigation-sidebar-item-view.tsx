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
    onMiddleClick: () => void;
  };
}

export function NavigationSidebarItemView(
  props: NavigationSidebarItemViewProps
) {
  const { states, data, callbacks } = props;

  const style = {
    ItemContainer: {
      display: "flex",
      "background-color": `${states.active ? "#eaeaea" : "#ffffff"}`,
      "border-radius": "8px",
      padding: "8px",
      "align-items": "center",
      ...gap({ direction: "row" as const, size: "var(--sl-font-size-small)" }),
      "&:hover": {
        cursor: "pointer",
        background: states.active ? "#dddddd" : "#f7f7f7",
      },
    },
    Label: {
      margin: "0",
    },
    Icon: {
      "flex-shrink": "0",
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div
      onClick={callbacks.onClick}
      onAuxClick={callbacks.onMiddleClick}
      class={sheet.classes.ItemContainer}
    >
      <style type="text/css">{styleString}</style>
      <sl-icon class={sheet.classes.Icon} name={data.icon}></sl-icon>
      <p class={sheet.classes.Label}>{data.label}</p>
    </div>
  );
}
