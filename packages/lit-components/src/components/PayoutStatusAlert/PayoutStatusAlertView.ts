import { html } from 'lit';
import { PayoutStatusAlertProps } from './PayoutStatusAlert';
import { usePayoutStatus } from './usePayoutStatus';

export function PayoutStatusAlertView(props: PayoutStatusAlertProps & ReturnType<typeof usePayoutStatus>) {
  const iconName =
    props.variant === 'success'
      ? 'check-circle'
      : props.variant === 'danger'
        ? 'exclamation-circle'
        : 'clock';

  return html`
    <style>
      :host {
        display: block;
      }
    </style>
    ${props.loading
      ? html``
      : props.text
        ? html`
            <sl-alert variant="${props.variant}" open>
              <sl-icon slot="icon" name="${iconName}"></sl-icon>
              ${props.text}
            </sl-alert>
          `
        : html``}
  `;
}
