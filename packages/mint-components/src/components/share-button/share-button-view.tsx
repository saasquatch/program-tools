import { h, VNode } from '@stencil/core';

export interface ShareButtonViewProps {
  medium: 'facebook' | 'twitter' | 'email' | 'TODO';

  loading?: boolean;
  disabled?: boolean;
  pill?: boolean;
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'default' | 'text';
  size?: 'small' | 'medium' | 'large';

  hideicon?: boolean;
  iconslot?: 'prefix' | 'suffix';

  onClick?: () => void;
}

export function ShareButtonView(props: ShareButtonViewProps, children: VNode) {
  return (
    <sl-button loading={props.loading} disabled={props.disabled} pill={props.pill} size={props.size} type={props.type} onClick={props.onClick}>
      {!props.hideicon && <sl-icon slot={props.iconslot} name={props.medium}></sl-icon>}
      {children}
    </sl-button>
  );
}
