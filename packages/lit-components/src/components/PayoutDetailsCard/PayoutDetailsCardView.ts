import { html } from 'lit';
import { PayoutDetailsCardProps } from './PayoutDetailsCard';
import { usePayoutDetailsCard } from './usePayoutDetailsCard';

export function PayoutDetailsCardView(props: PayoutDetailsCardProps & ReturnType<typeof usePayoutDetailsCard>) {
  return html`
    <style>
      :host {
        display: block;
      }

      .payout-card {
        padding: var(--sl-spacing-large);
        border: 1px solid var(--sl-color-neutral-200);
        border-radius: var(--sl-border-radius-large);
      }

      .payout-header {
        font-size: var(--sl-font-size-large);
        font-weight: var(--sl-font-weight-semibold);
        margin-bottom: var(--sl-spacing-medium);
      }

      .payout-details {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--sl-spacing-medium);
      }

      .payout-item-label {
        font-size: var(--sl-font-size-small);
        color: var(--sl-color-neutral-500);
      }

      .payout-item-value {
        font-size: var(--sl-font-size-medium);
        font-weight: var(--sl-font-weight-semibold);
      }
    </style>
    <div class="payout-card" part="sqm-base">
      <h3 class="payout-header">${props.headerText}</h3>
      ${props.loading
        ? html`<sl-spinner></sl-spinner>`
        : html`
            <div class="payout-details">
              <div>
                <div class="payout-item-label">${props.balanceLabel}</div>
                <div class="payout-item-value">${props.availableBalance}</div>
              </div>
              <div>
                <div class="payout-item-label">${props.nextPayoutLabel}</div>
                <div class="payout-item-value">${props.nextPayoutDate}</div>
              </div>
            </div>
          `}
    </div>
  `;
}
