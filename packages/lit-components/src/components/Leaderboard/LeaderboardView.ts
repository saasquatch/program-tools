import { html } from 'lit';
import { LeaderboardProps, LeaderboardRow } from './Leaderboard';
import { LeaderboardHookResult } from './useLeaderboard';

function formatName(row: LeaderboardRow) {
  const firstName = row.firstName?.trim() || '';
  const lastInitial = row.lastInitial?.trim() || '';

  if (firstName && lastInitial) return `${firstName} ${lastInitial}.`;
  if (firstName) return firstName;
  if (lastInitial) return `${lastInitial}.`;
  return 'Anonymous';
}

function formatValue(row: LeaderboardRow) {
  return row.statValue ?? row.value ?? '';
}

export function LeaderboardView(props: LeaderboardProps & LeaderboardHookResult) {
  return html`
    <style>
      :host {
        display: block;
      }

      .leaderboard {
        width: 100%;
        border-collapse: collapse;
      }

      .leaderboard-header {
        font-weight: var(--sl-font-weight-semibold);
        padding: var(--sl-spacing-small);
        border-bottom: 2px solid var(--sl-color-neutral-200);
        text-align: left;
      }

      .leaderboard-row {
        border-bottom: 1px solid var(--sl-color-neutral-100);
      }

      .leaderboard-row:hover {
        background: var(--sl-color-neutral-50);
      }

      .leaderboard-cell {
        padding: var(--sl-spacing-small) var(--sl-spacing-medium);
      }

      .rank-cell {
        width: 50px;
        text-align: center;
        font-weight: var(--sl-font-weight-semibold);
      }

      .name-cell {
        width: 100%;
      }

      .value-cell {
        text-align: right;
        font-weight: var(--sl-font-weight-semibold);
      }

      .empty-state {
        text-align: center;
        padding: var(--sl-spacing-x-large);
        color: var(--sl-color-neutral-500);
      }
    </style>
    <div part="sqm-base">
      ${props.header ? html`<h3 style="margin: 0 0 var(--sl-spacing-medium)">${props.header}</h3>` : null}
      ${props.loading
        ? html`<sl-spinner></sl-spinner>`
        : props.empty
          ? html`<div class="empty-state">${props.emptyStateText}<slot name="empty"></slot></div>`
          : html`<table class="leaderboard">
              <thead>
                <tr>
                  ${props.showRank ? html`<th class="leaderboard-header rank-cell">#</th>` : null}
                  ${props.showUser ? html`<th class="leaderboard-header name-cell">Name</th>` : null}
                  ${props.showStats ? html`<th class="leaderboard-header value-cell">Score</th>` : null}
                </tr>
              </thead>
              <tbody>
                ${props.rows.map(
                  (row, index) => html`<tr class="leaderboard-row">
                    ${props.showRank
                      ? html`<td class="leaderboard-cell rank-cell">${row.rank || index + 1}</td>`
                      : null}
                    ${props.showUser
                      ? html`<td class="leaderboard-cell name-cell">${formatName(row)}</td>`
                      : null}
                    ${props.showStats
                      ? html`<td class="leaderboard-cell value-cell">${formatValue(row)}</td>`
                      : null}
                  </tr>`
                )}
              </tbody>
            </table>`}
    </div>
  `;
}
