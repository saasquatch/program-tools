import { html } from 'lit';
import { UI } from '../../ui';
import { PayoutButtonScrollProps } from './PayoutButtonScroll';
import { usePayoutButton } from './usePayoutButtonScroll';

export function PayoutButtonScrollView(
  props: PayoutButtonScrollProps & ReturnType<typeof usePayoutButton>
) {
  return html`
    <style>
      :host { display: inline-block; }
    </style>
    ${UI.Button({
      variant: 'primary',
      disabled: props.disabled,
      onClick: props.onClick,
      prefix: UI.Icon({ name: 'cash-stack' }),
      children: props.buttonText,
    })}
  `;
}
