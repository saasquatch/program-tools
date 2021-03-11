import { h, VNode } from '@stencil/core';
import { FunctionalComponent } from '@stencil/router/dist/types/stencil.core';
import { css } from 'emotion';
import { formatMessage } from '../../utilities';
import { LoadingState } from './loading-state';
import ReferralComponentView from './referral-component-view';

const ListCard = css`
  position: relative;
  padding: var(--sl-spacing-large);
  padding-top: 0px;
  box-sizing: border-box;
  background: var(--sl-color=white);
  width: 100%;

  @media screen and (max-width: 499px) {
    max-width: initial;
  }
`;

const RowContainer = css`
  & > :last-child {
    border: 0;
  }
`;

const CardTitle = css`
  color: #08162b;
  font-family: Montserrat;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 2.88px;
  text-transform: uppercase;
  margin-bottom: 15px;
`;

const ButtonsContainer = css`
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
  & > :not(:first-child) {
    margin-left: 5px;
  }
`;

export interface ReferralListViewProps {
  states: {
    loading: boolean;
    offset: number;
    styles: {
      unknownuser: string;
      pickrewardtext: string;
      showStatus: boolean;
      downloadedtext: string;
      downloadedunqualifiedtext: string;
      purchasedeligibletext: string;
      purchasednoteligibletext: string;
      newreferraltext: string;
      rewardpendingtext: string;
      rewardsavailabletext: string;
      rewardredeemedtext: string;
      paginateless: string;
      paginatemore: string;
      noreferralsyet: string;
      titleText: string;
    };
  };
  data: {
    referrals: Array<
      Referral & {
        referredFor: {
          firstName: string;
          lastName: string;
        };
      }
    >;
    referraltype: 'converted' | 'pending' | 'referrer';
    referralsCount: number;
    rewardTranslations: unknown;
  };
  callbacks: {
    intl: any;
    paginate: any;
  };
}
const ReferralListView: FunctionalComponent<ReferralListViewProps> = (props: ReferralListViewProps) => {
  const { states, data, callbacks } = props;
  const { styles } = states;
  const { paginate } = callbacks;

  let referredByRow: VNode;

  function hasAvailableRewards(referral: Referral) {
    const rewards = referral.rewards.filter((e: any) => e.statuses.includes('AVAILABLE'));
    return rewards.length > 0;
  }

  const allRewardsRedeemed = (referral: Referral) => {
    return referral.rewards.every((e: any) => e.statuses.includes('REDEEMED'));
  };

  const getName = (referral: Referral) => {
    if (referral.referredUser) {
      return referral.referredUser.firstName || styles.unknownuser;
    }
    return styles.unknownuser;
  };

  function getReferralStatus(referral: Referral) {
    const referredUser = referral.referredUser;
    if (referredUser.customFields.Saasquatch_Referral_Status__c) {
      const status = referredUser.customFields.Saasquatch_Referral_Status__c;
      switch (status) {
        case 'Downloaded - qualified':
          return styles.downloadedtext;
        case 'Downloaded - unqualified':
          return styles.downloadedunqualifiedtext;
        case 'Purchased - eligible for reward':
          return styles.purchasedeligibletext;
        case 'Purchased - not eligible for reward':
          return styles.purchasednoteligibletext;
        default:
          return styles.newreferraltext;
      }
    }
    return styles.newreferraltext;
  }

  function getRewardStatus(referral: Referral) {
    const rewards = referral.rewards;
    if (rewards.length === 0) {
      return styles.rewardpendingtext;
    }
    if (hasAvailableRewards(referral)) {
      const countAvailable = rewards.filter(obj => obj.statuses.some(e => e === 'AVAILABLE')).length;
      return countAvailable > 1
        ? formatMessage(styles.rewardsavailabletext, callbacks.intl.locale, {
            count: countAvailable,
          })
        : styles.rewardsavailabletext;
    }
    const countRedeemed = rewards.filter(obj => obj.statuses.some(e => e === 'REDEEMED')).length;
    return countRedeemed > 1
      ? formatMessage(styles.rewardsavailabletext, callbacks.intl.locale, {
          count: countRedeemed,
        })
      : styles.rewardredeemedtext;
  }

  if (states.loading) {
    return (
      <div style={{ minHeight: '537px' }} class={`${ListCard}`}>
        <div class={CardTitle}>{styles.titleText}</div>
        <LoadingState minHeight={370} />
      </div>
    );
  }

  return (
    <div class={`${ListCard}`}>
      {data.referralsCount > 0 ? (
        <div>
          <div class={RowContainer}>
            {data?.referrals?.map(ref => {
              const referraltype = ref.rewards.length > 0 ? 'converted' : 'pending';
              return (
                <ReferralComponentView
                  data={{
                    referral: ref,
                    referraltype: referraltype,
                    ...data,
                  }}
                  callbacks={{
                    ...callbacks,
                    hasAvailableRewards,
                    allRewardsRedeemed,
                    getName,
                    getRewardStatus,
                    getReferralStatus,
                  }}
                  states={{
                    styles: {
                      unknownuser: props.states.styles.unknownuser,
                      pickrewardtext: props.states.styles.pickrewardtext,
                      showStatus: props.states.styles.showStatus,
                    },
                  }}
                  intl={callbacks.intl}
                />
              );
            })}
            {referredByRow}
          </div>
          <div class={`${ButtonsContainer}`}>
            <sl-button size="small" disabled={states.offset === 0} loading={states.loading} onClick={event => paginate(states.offset - 3, event)}>
              {styles.paginateless}
            </sl-button>
            <sl-button size="small" loading={states.loading} disabled={states.offset >= data.referralsCount - 3} onClick={event => paginate(states.offset + 3, event)}>
              {styles.paginatemore}
            </sl-button>
          </div>
        </div>
      ) : (
        <span style={{ fontSize: 'var(--sl-font-size-medium)' }}>{styles.noreferralsyet}</span>
      )}
    </div>
  );
};

export default ReferralListView;
