import { html } from 'lit';
import { PayoutButtonScrollProps } from './PayoutButtonScroll';
import { usePayoutButton } from './usePayoutButtonScroll';

export function PayoutButtonScrollView(
  props: PayoutButtonScrollProps & ReturnType<typeof usePayoutButton>
) {
  return html`
    <style>
      :host { display: inline-block; }
    </style>
    <sl-button variant="primary" ?disabled="${props.disabled}" @click="${props.onClick}">
      <sl-icon slot="prefix" name="cash-stack"></sl-icon>
      ${props.buttonText}
    </sl-button>
  `;
}
