import { ReferralListViewProps } from './referral-list-view';

type ReferralListProps = {
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

export function useReferralList(props: ReferralListProps): ReferralListViewProps {
  return {
    states: {
      loading: false,
      offset: 0,
      styles: {
        ...props,
      },
    },
    data: {
      referrals: [],
      referraltype: 'converted',
      referralsCount: 0,
      rewardTranslations: {},
    },
    callbacks: {
      intl: () => {
        console.log('intl');
      },
      paginate: () => {
        console.log('paginate');
      },
    },
  };
}
