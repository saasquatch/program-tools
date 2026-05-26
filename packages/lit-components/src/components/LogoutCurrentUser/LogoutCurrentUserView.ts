import { html } from 'lit';
import { UI } from '../../ui';
import type { ButtonVariant } from '../../ui';
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
    ${UI.Button({
      variant: (props.buttonType === 'text' ? 'text' : props.buttonType) as ButtonVariant,
      size: props.size,
      onClick: props.onClick,
      prefix: UI.Icon({ name: 'box-arrow-right' }),
      children: props.buttonText,
    })}
  `;
}
