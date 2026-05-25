import { html } from 'lit';
import { RewardsTableProps } from './RewardsTable';
import { useRewardsTable } from './useRewardsTable';

type RewardRow = ReturnType<typeof useRewardsTable>['rewards'][number];

const baseStyles = `
  :host { display: block; }
  .table-container { width: 100%; overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; padding: var(--sl-spacing-small) var(--sl-spacing-medium); font-weight: var(--sl-font-weight-semibold); font-size: var(--sl-font-size-small); color: var(--sl-color-neutral-600); border-bottom: 2px solid var(--sl-color-neutral-200); }
  td { padding: var(--sl-spacing-small) var(--sl-spacing-medium); border-bottom: 1px solid var(--sl-color-neutral-100); font-size: var(--sl-font-size-small); }
  tr:hover { background: var(--sl-color-neutral-50); }
  .pagination { display: flex; justify-content: center; align-items: center; gap: var(--sl-spacing-small); padding: var(--sl-spacing-medium) 0; }
  .empty-state { text-align: center; padding: var(--sl-spacing-x-large); color: var(--sl-color-neutral-500); }
  .status-badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: var(--sl-font-size-x-small); font-weight: var(--sl-font-weight-semibold); }
  .status-converted { background: var(--sl-color-success-100); color: var(--sl-color-success-700); }
  .status-pending { background: var(--sl-color-warning-100); color: var(--sl-color-warning-700); }
  .page-info { font-size: var(--sl-font-size-small); color: var(--sl-color-neutral-600); }
`;

function formatDate(date?: string) {
  if (!date) return '—';
  return new Date(date).toLocaleDateString();
}

function getRewardValue(reward: {
  prettyValue?: string;
  value?: string | number;
  unit?: string;
}) {
  if (reward.prettyValue) return reward.prettyValue;
  if (reward.value !== undefined && reward.value !== null) {
    return reward.unit ? `${reward.value} ${reward.unit}` : String(reward.value);
  }
  return '—';
}

function getSource(reward: {
  sourceUser?: { firstName?: string; lastName?: string };
}) {
  const firstName = reward.sourceUser?.firstName || '';
  const lastName = reward.sourceUser?.lastName || '';
  const fullName = `${firstName} ${lastName}`.trim();
  return fullName || '—';
}

function getStatusText(reward: { statuses?: string[] }) {
  const status = reward.statuses?.[0];
  if (!status) return 'Pending';
  return status
    .toLowerCase()
    .split('_')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

function getStatusClass(reward: { statuses?: string[] }) {
  const status = reward.statuses?.[0]?.toUpperCase() || '';
  return ['APPROVED', 'AVAILABLE', 'PAID', 'FULFILLED', 'COMPLETE'].includes(status)
    ? 'status-converted'
    : 'status-pending';
}

export function RewardsTableView(props: RewardsTableProps & ReturnType<typeof useRewardsTable>) {
  if (props.loading) {
    return html`
      <style>
        ${baseStyles}
      </style>
      <div class="empty-state" part="sqm-base">Loading rewards...</div>
    `;
  }

  if (props.empty) {
    return html`
      <style>
        ${baseStyles}
      </style>
      <div class="empty-state" part="sqm-base">${props.emptyStateText || 'No rewards yet'}</div>
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
                  <th>${props.dateShownColumn || 'Date Received'}</th>
                  <th>${props.rewardShownColumn || 'Reward'}</th>
                  <th>${props.sourceShownColumn || 'Source'}</th>
                  <th>${props.statusShownColumn || 'Status'}</th>
                </tr>
              </thead>
            `
          : ''}
        <tbody>
          ${props.rewards.map(
            (reward: RewardRow) => html`
              <tr>
                <td>${formatDate(reward.dateGiven)}</td>
                <td>${getRewardValue(reward)}</td>
                <td>${getSource(reward)}</td>
                <td>
                  <span class="status-badge ${getStatusClass(reward)}">${getStatusText(reward)}</span>
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>
    </div>
    ${props.totalPages > 1
      ? html`
          <div class="pagination">
            <sl-button size="small" ?disabled="${props.currentPage === 0}" @click="${props.prevPage}">
              <sl-icon slot="prefix" name="chevron-left"></sl-icon>
              Previous
            </sl-button>
            <span class="page-info">${props.currentPage + 1} / ${props.totalPages}</span>
            <sl-button
              size="small"
              ?disabled="${props.currentPage >= props.totalPages - 1}"
              @click="${props.nextPage}"
            >
              Next
              <sl-icon slot="suffix" name="chevron-right"></sl-icon>
            </sl-button>
          </div>
        `
      : ''}
  `;
}
