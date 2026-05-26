import { html } from 'lit';
import { UI } from '../../ui';
import type { AlertVariant } from '../../ui/types';
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
            ${UI.Alert({
              variant: props.variant as AlertVariant,
              open: true,
              icon: UI.Icon({ name: iconName }),
              children: props.text,
            })}`
        : html``}
  `;
}
