import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { gap } from "../../global/mixins";
import { navigation } from "@saasquatch/component-boilerplate";

export interface NavigationSidebarItemViewProps {
  states: {
    active: boolean;
  };
  data: {
    label: string;
    icon: string;
    path: string;
  };
  backgroundColor?: string;
  backgroundHoverColor?: string;
  textColor?: string;
  textHoverColor?: string;
  borderRadius?: number;
  backgroundFocusedColor?: string;
  textFocusedColor?: string;
  padding?: string;
}

export function NavigationSidebarItemView(
  props: NavigationSidebarItemViewProps
) {
  const { states, data, padding = "x-small" } = props;

  const backgroundColor =
    props.backgroundColor || "var(--sqm-portal-background)";

  const backgroundHoverColor =
    props.backgroundHoverColor || "var(--sqm-primary-button-background-hover)";

  const backgroundFocusedColor =
    props.backgroundFocusedColor || "var(--sqm-primary-button-background)";

  const textFocusedColor =
    props.textFocusedColor || "var(--sqm-primary-button-color)";

  const style = {
    ItemContainer: {
      display: "flex",
      "background-color": `${
        states.active ? backgroundFocusedColor : backgroundColor
      }`,
      borderRadius: props.borderRadius
        ? `${props.borderRadius}px`
        : "var(--sqm-border-radius-normal)",
      padding: `var(--sl-spacing-${padding})`,

      "text-decoration": "none",
      color: states.active
        ? textFocusedColor
        : props.textColor || "var(--sqm-text)",
      "align-items": "center",
      ...gap({ direction: "row" as const, size: "var(--sl-font-size-small)" }),
      "&:hover": {
        cursor: "pointer",
        background: states.active
          ? backgroundFocusedColor
          : backgroundHoverColor,
        color: states.active
          ? textFocusedColor
          : props.textHoverColor || "var(--sqm-primary-button-color-hover)",
      },
    },
    Label: {
      margin: "0",
    },
    Icon: {
      "flex-shrink": "0",
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <a
      part="sqm-link"
      href={data.path}
      onClick={(e) => {
        e.preventDefault();
        navigation.push(data.path);
      }}
      class={sheet.classes.ItemContainer}
    >
      <style type="text/css">{styleString}</style>
      <sl-icon class={sheet.classes.Icon} name={data.icon}></sl-icon>
      <p class={sheet.classes.Label} part="sqm-label">
        {data.label}
      </p>
    </a>
  );
}
