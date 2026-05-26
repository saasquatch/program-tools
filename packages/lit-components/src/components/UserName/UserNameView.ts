import { html } from 'lit';
import { UserNameProps } from './UserName';
import { useUserName } from './useUserName';

export function UserNameView(props: UserNameProps & ReturnType<typeof useUserName>) {
  return html`
    <style>
      :host {
        display: inline;
      }
    </style>
    <span part="sqm-base">${props.loading ? '...' : props.displayName}</span>
  `;
}
