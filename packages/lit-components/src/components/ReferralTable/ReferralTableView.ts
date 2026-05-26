import { html } from 'lit';
import { UI } from '../../ui';
import { ReferralTableProps } from './ReferralTable';
import { useReferralTable } from './useReferralTable';

type ReferralRow = ReturnType<typeof useReferralTable>['referrals'][number];

const baseStyles = `
  :host { display: block; }
  .table-container { width: 100%; overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; padding: var(--sl-spacing-small) var(--sl-spacing-medium); font-weight: var(--sl-font-weight-semibold); font-size: var(--sl-font-size-small); color: var(--sl-color-neutral-600); border-bottom: 2px solid var(--sl-color-neutral-200); }
  td { padding: var(--sl-spacing-small) var(--sl-spacing-medium); border-bottom: 1px solid var(--sl-color-neutral-100); font-size: var(--sl-font-size-small); }
  tr:hover { background: var(--sl-color-neutral-50); }
  .pagination { display: flex; justify-content: center; align-items: center; gap: var(--sl-spacing-small); padding: var(--sl-spacing-medium) 0; }
  .empty-state { text-align: center; padding: var(--sl-spacing-x-large); color: var(--sl-color-neutral-500); }
  .empty-state-image { max-width: 180px; margin-bottom: var(--sl-spacing-medium); }
  .status-badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: var(--sl-font-size-x-small); font-weight: var(--sl-font-weight-semibold); }
  .status-converted { background: var(--sl-color-success-100); color: var(--sl-color-success-700); }
  .status-pending { background: var(--sl-color-warning-100); color: var(--sl-color-warning-700); }
  .page-info { font-size: var(--sl-font-size-small); color: var(--sl-color-neutral-600); }
`;

function formatDate(date?: string) {
  if (!date) return '—';
  return new Date(date).toLocaleDateString();
}

function getName(referral: {
  referredUser?: { firstName?: string; lastName?: string };
}) {
  const firstName = referral.referredUser?.firstName || '';
  const lastName = referral.referredUser?.lastName || '';
  const fullName = `${firstName} ${lastName}`.trim();
  return fullName || '—';
}

function getRewards(referral: {
  rewards?: Array<{ prettyValue?: string }>;
}) {
  const rewardValues = (referral.rewards || []).map((reward) => reward.prettyValue).filter(Boolean);
  return rewardValues.length > 0 ? rewardValues.join(', ') : '—';
}

function getStatus(referral: {
  dateConverted?: string;
}) {
  return referral.dateConverted ? 'Converted' : 'Pending';
}

function getHiddenColumns(hiddenColumns?: string) {
  return new Set(
    (hiddenColumns || '')
      .split(',')
      .map((column) => column.trim().toLowerCase())
      .filter(Boolean)
  );
}

export function ReferralTableView(props: ReferralTableProps & ReturnType<typeof useReferralTable>) {
  const hiddenColumns = getHiddenColumns(props.hiddenColumns);
  const columns = [
    { key: 'date', label: props.dateShownColumn || 'Date Referred' },
    { key: 'name', label: props.nameShownColumn || 'Name' },
    { key: 'rewards', label: props.rewardsShownColumn || 'Rewards' },
    { key: 'status', label: props.statusShownColumn || 'Status' },
  ].filter((column) => !hiddenColumns.has(column.key));

  if (props.loading) {
    return html`
      <style>
        ${baseStyles}
      </style>
      <div class="empty-state" part="sqm-base">Loading referrals...</div>
    `;
  }

  if (props.empty) {
    return html`
      <style>
        ${baseStyles}
      </style>
      <div class="empty-state" part="sqm-base">
        ${props.emptyStateImage
          ? html`<img class="empty-state-image" src="${props.emptyStateImage}" alt="" />`
          : ''}
        <div>${props.emptyStateText || 'No referrals yet'}</div>
      </div>
    `;
  }

  return html`
    <style>
      ${baseStyles}
    </style>
    <div class="table-container" part="sqm-base">
      <table>
        ${props.showLabels
          ? html`
              <thead>
                <tr>
                  ${columns.map((column) => html`<th>${column.label}</th>`) }
                </tr>
              </thead>
            `
          : ''}
        <tbody>
          ${props.referrals.map(
            (referral: ReferralRow) => html`
              <tr>
                ${!hiddenColumns.has('date')
                  ? html`<td>${formatDate(referral.dateReferralStarted)}</td>`
                  : ''}
                ${!hiddenColumns.has('name') ? html`<td>${getName(referral)}</td>` : ''}
                ${!hiddenColumns.has('rewards') ? html`<td>${getRewards(referral)}</td>` : ''}
                ${!hiddenColumns.has('status')
                  ? html`
                      <td>
                        <span
                          class="status-badge ${referral.dateConverted
                            ? 'status-converted'
                            : 'status-pending'}"
                        >
                          ${getStatus(referral)}
                        </span>
                      </td>
                    `
                  : ''}
              </tr>
            `
          )}
        </tbody>
      </table>
    </div>
    ${props.totalPages > 1
      ? html`
          <div class="pagination">
            ${UI.Button({
              size: 'small',
              disabled: props.currentPage === 0,
              onClick: props.prevPage,
              prefix: UI.Icon({ name: 'chevron-left' }),
              children: 'Previous',
            })}
            <span class="page-info">${props.currentPage + 1} / ${props.totalPages}</span>
            ${UI.Button({
              size: 'small',
              disabled: props.currentPage >= props.totalPages - 1,
              onClick: props.nextPage,
              suffix: UI.Icon({ name: 'chevron-right' }),
              children: 'Next',
            })}
          </div>
        `
      : ''}
  `;
}
