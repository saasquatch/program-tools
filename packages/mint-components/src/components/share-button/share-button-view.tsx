import { h } from "@stencil/core";

export interface ShareButtonViewProps {
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  pill?: boolean;
  type?: "primary" | "success" | "info" | "warning" | "danger" | "default" | "text";
  size?: "small" | "medium" | "large";

  icon?: string;
  iconslot?: "prefix" | "suffix";
  iconlabel?: string;

  href?: string;
  name?: string;
  value?: string;
  target?: "_blank" | "_parent" | "_self" | "_top";

  customstyle?: string;
}

function ShareButtonView(props: ShareButtonViewProps) {
  return (
    <sl-button
      loading={props.loading}
      disabled={props.disabled}
      pill={props.pill}
      size={props.size}
      type={props.type}
      href={props.href}
      name={props.name}
      target={props.target}
      value={props.value}
      style={props.customstyle}
    >
      {props.icon && <sl-icon slot={props.iconslot} name={props.icon}></sl-icon>}
      {props.label}
    </sl-button>
  );
}

export default ShareButtonView