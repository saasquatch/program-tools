import { html } from 'lit';
import { UI } from '../../ui';
import { LeaderboardRankProps } from './LeaderboardRank';
import { LeaderboardRankHookResult } from './useLeaderboardRank';

export function LeaderboardRankView(props: LeaderboardRankProps & LeaderboardRankHookResult) {
  return html`
    <style>
      :host {
        display: block;
      }

      .rank-container {
        display: flex;
        align-items: center;
        gap: var(--sl-spacing-small);
        padding: var(--sl-spacing-medium);
        background: var(--sl-color-primary-50);
        border-radius: var(--sl-border-radius-medium);
      }

      .rank-badge {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--sl-color-primary-600);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: var(--sl-font-weight-bold);
      }

      .rank-text {
        font-size: var(--sl-font-size-medium);
      }
    </style>
    <div class="rank-container" part="sqm-base">
      ${props.loading
        ? html`${UI.Spinner({})}`
        : props.rank
          ? html`
              <div class="rank-badge">${props.rank}</div>
              <span class="rank-text">${props.rankText}</span>
            `
          : html`<span class="rank-text">${props.rankText}</span>`}
    </div>
  `;
}
