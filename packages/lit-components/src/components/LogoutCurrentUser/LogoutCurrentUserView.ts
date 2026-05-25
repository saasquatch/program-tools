import { html } from 'lit';
import { LogoutCurrentUserProps } from './LogoutCurrentUser';
import { useLogoutCurrentUser } from './useLogoutCurrentUser';

export function LogoutCurrentUserView(
  props: LogoutCurrentUserProps & ReturnType<typeof useLogoutCurrentUser>
) {
  return html`
    <style>
      :host {
        display: inline-block;
      }
    </style>
    <sl-button
      variant="${props.buttonType === 'text' ? 'text' : props.buttonType}"
      size="${props.size}"
      @click=${props.onClick}
    >
      <sl-icon slot="prefix" name="box-arrow-right"></sl-icon>
      ${props.buttonText}
    </sl-button>
  `;
}
