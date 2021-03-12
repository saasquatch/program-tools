import { h } from '@stencil/core';
import { css } from 'emotion';
import { gap, seperateContent } from '../../global/mixins';
import { Column } from '../styles/Spacing';
import { H4, P } from '../styles/Typography';

const ColumnWrapper = css`
  ${Column}
  ${gap('top', '0')}
`;

const Row = css`
  ${seperateContent()}
  padding: var(--sl-spacing-x-small) var(--sl-spacing-small);

  &:not(:last-child) {
    border-bottom: 1px solid var(--sl-color-panel);
  }
`;

export interface LeaderboardViewProps {
  placementtext: string;
  referrers: { name: string; score: string }[];
}

export function LeaderboardView(props: LeaderboardViewProps) {
  return (
    <div class={ColumnWrapper}>
      <h3 class={H4} style={{ textAlign: 'center' }}>
        Leaderboard for our F-150 Ford Raptor Giveaway 🚚
      </h3>
      <div class={Row}>
        <p class={P}>{props.placementtext}</p>
        <p class={`${P} subtitle`}>Updated hourly</p>
      </div>
      <div class={Row}>
        <b>TOP REFERRERS</b>
        <b>NEW TITANS</b>
      </div>
      {props.referrers.map(referrer => {
        return (
          <div class={Row}>
            <span>{referrer.name}</span>
            <span>{referrer.score}</span>
          </div>
        );
      })}
    </div>
  );
}
