import { FunctionalComponent, h, VNode } from '@stencil/core';

export interface ShareButtonViewProps {
  loading?: boolean;
  disabled?: boolean;
  pill?: boolean;
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'default' | 'text';
  size?: 'small' | 'medium' | 'large';

  icon?: string;
  iconslot?: 'prefix' | 'suffix';

  href?: string;
  target?: '_blank' | '_parent' | '_self' | '_top';
  onClick?: () => void;
}

export function ShareButtonView(props: ShareButtonViewProps, children: VNode) {
  return (
    <sl-button
      loading={props.loading}
      disabled={props.disabled}
      pill={props.pill}
      size={props.size}
      type={props.type}
      href={props.href}
      target={props.target}
      onClick={props.onClick}
    >
      {props.icon && <sl-icon slot={props.iconslot} name={props.icon}></sl-icon>}
      {children}
    </sl-button>
  );
}
