import { h, Host, VNode } from "@stencil/core";

export interface RefreshButtonViewProps {
  loading?: boolean;
  disabled?: boolean;
  pill?: boolean;
  type?:
    | "primary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "default"
    | "text";
  size?: "small" | "medium" | "large";

  icon?: string;
  hideicon?: boolean;
  hidetext?: boolean;
  iconslot?: "prefix" | "suffix";
  onClick?: () => void;
  hide?: boolean;
}

export function RefreshButtonView(
  props: RefreshButtonViewProps,
  children: VNode
) {
  return props.hide ? (
    <Host style={{ display: "none" }}></Host>
  ) : (
    <Host>
      <style type="text/css">{`:host{display:inline-block}`}</style>
      <sl-button
        loading={props.loading}
        disabled={props.disabled}
        pill={props.pill}
        size={props.size}
        type={props.type}
        onClick={props.onClick}
        exportparts={`base: ${props.type}-refresh-base`}
      >
        {!props.hideicon && (
          <sl-icon
            slot={props.iconslot}
            name={props.icon}
            exportparts="icon"
          ></sl-icon>
        )}
        {!props.hidetext && children}
      </sl-button>
    </Host>
  );
}
