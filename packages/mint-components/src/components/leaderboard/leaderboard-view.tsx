import { VNode } from '@stencil/core';
import { h } from '@stencil/core';
import { css } from 'emotion';
import { gap, seperateContent } from '../../global/mixins';
import { Column } from '../styles/Spacing';

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
  usersheading: string;
  statsheading: string;
  empty: VNode;
  loadingstate: VNode;
  loading: boolean;
  hasleaders: boolean;
  referrers: { name: string; score: string }[];
}

export function LeaderboardView(props: LeaderboardViewProps) {
  if (props.loading) {
    return props.loadingstate;
  }
  return (
    <div>
      {!props.hasleaders && props.empty}
      {props.hasleaders && (
        <div class={ColumnWrapper}>
          <div class={Row}>
            <b>{props.usersheading}</b>
            <b>{props.statsheading}</b>
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
      )}
    </div>
  );
}
