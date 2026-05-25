import { html } from 'lit';
import { RewardExchangeItem, RewardExchangeListProps } from './RewardExchangeList';
import { useRewardExchangeList } from './useRewardExchangeList';

export function RewardExchangeListView(
  props: RewardExchangeListProps & ReturnType<typeof useRewardExchangeList>
) {
  return html`
    <style>
      :host {
        display: block;
      }

      .exchange-list {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-medium);
      }

      .exchange-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--sl-spacing-medium);
        gap: var(--sl-spacing-medium);
      }

      .balance {
        font-weight: var(--sl-font-weight-semibold);
        color: var(--sl-color-primary-600);
      }

      .exchange-item {
        display: flex;
        align-items: center;
        gap: var(--sl-spacing-medium);
        padding: var(--sl-spacing-medium);
        border: 1px solid var(--sl-color-neutral-200);
        border-radius: var(--sl-border-radius-medium);
      }

      .exchange-item:hover {
        border-color: var(--sl-color-primary-300);
      }

      .exchange-image {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: var(--sl-border-radius-medium);
      }

      .exchange-info {
        flex: 1;
      }

      .exchange-name {
        font-weight: var(--sl-font-weight-semibold);
      }

      .exchange-description {
        font-size: var(--sl-font-size-small);
        color: var(--sl-color-neutral-600);
      }

      .exchange-cost {
        font-weight: var(--sl-font-weight-semibold);
      }

      .empty-state {
        text-align: center;
        padding: var(--sl-spacing-x-large);
        color: var(--sl-color-neutral-500);
      }
    </style>
    <div part="sqm-base">
      <div class="exchange-header">
        <h3 style="margin: 0;">${props.headerText}</h3>
        <span class="balance">Balance: ${props.currentBalance}</span>
      </div>
      ${props.loading
        ? html`<sl-spinner></sl-spinner>`
        : props.empty
          ? html`<div class="empty-state">${props.emptyText}</div>`
          : html`<div class="exchange-list">
              ${props.exchanges.map(
                (item: RewardExchangeItem) => html`
                  <div class="exchange-item">
                    ${item.imageUrl
                      ? html`<img
                          class="exchange-image"
                          src="${item.imageUrl}"
                          alt="${item.name}"
                        />`
                      : ''}
                    <div class="exchange-info">
                      <div class="exchange-name">${item.name}</div>
                      ${item.description
                        ? html`<div class="exchange-description">${item.description}</div>`
                        : ''}
                    </div>
                    <div class="exchange-cost">${item.costPrettyValue}</div>
                    <sl-button size="small" variant="primary" ?disabled=${!item.available}>
                      Redeem
                    </sl-button>
                  </div>
                `
              )}
            </div>`}
    </div>
  `;
}
