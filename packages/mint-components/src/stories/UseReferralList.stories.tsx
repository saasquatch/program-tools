import { h } from '@stencil/core';
import ReferralListView from '../components/referral-list/referral-list-view';
import { useReferralList } from '../components/referral-list/useReferralList';

export default {
  title: 'useReferralList',
};

function setupGraphQL() {
  const id = 'worried-camera@uexwltgh.mailosaur.net';
  const accountId = id;

  //@ts-ignore
  window.SquatchAndroid = true;
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: 'test_as36zjtpfy7oo',
    appDomain: 'https://staging.referralsaasquatch.com',
    token:
      // you have to change this if you change the id or accountId
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6IndvcnJpZWQtY2FtZXJhQHVleHdsdGdoLm1haWxvc2F1ci5uZXQiLCJpZCI6IndvcnJpZWQtY2FtZXJhQHVleHdsdGdoLm1haWxvc2F1ci5uZXQifX0.-WGV4_bzGCFp-OTIO-h-yp0MlgtkdufT_GgI4T691OY',
    userId: id,
    accountId,
  };
  return { id, accountId };
}

export const BareBonesView = () => {
  setupGraphQL();
  const res = useReferralList({} as any);
  console.log(res.data.referrals)
  return (
    <div>
      <div>
        Displaying data for user:{' '}
        <code>
          <strong>{(window as any).widgetIdent.userId}</strong>
        </code>
      </div>
      <div>
        <p>Page: {res.states.page + 1}</p>
      </div>
      <div>
        <button onClick={() => res.callbacks.paginate(res.states.page - 1)}> {'<'} </button>
        <button onClick={() => res.callbacks.paginate(res.states.page + 1)}> {'>'} </button>
      </div>
      <div>
        <code>{res.states.loading ? 'LOADING...' : JSON.stringify(res.data.referrals)}</code>
      </div>
    </div>
  );
};

const defaultStyle = {
  showreferrer: 'true',
  usefirstreward: 'false',
  referralnamecolor: 'darkslategray',
  referraltextcolor: 'lightgray',
  rewardcolor: '#4BB543',
  pendingcolor: 'lightgray',
  pendingvalue: 'Reward Pending',
  referrervalue: 'Referred',
  referrercontent: 'Referred you {date}',
  convertedcontent: 'Signed up, referred {date}',
  pendingcontent: 'Trial user, referred {date}',
  valuecontent: 'and {extrarewards} more {extrarewards, plural, one {reward} other {rewards}}',
  expiredcolor: 'lightgray',
  expiredvalue: 'Expired Reward',
  expiredcontent: 'Signed up, referred {date}',
  cancelledcolor: '#C81D05',
  cancelledvalue: 'Cancelled Reward',
  cancelledcontent: 'Signed up, referred {date}',
  paginatemore: 'View More',
  paginateless: 'Previous',
  noreferralsyet: 'No Referrals Yet...',
  unknownuser: 'Your Friend',
  pickrewardtext: "PICK_REWARD_TEXT",
  showStatus: true,
  downloadedtext: "DOWNLOAD_TEXT",
  downloadedunqualifiedtext: "DOWNLOAD_UNQUALIFIED_TEXT",
  purchasedeligibletext: "PURCHASED_ELIGIBLE_TEXT",
  purchasednoteligibletext: "PURCHASED_NOT_ELIGIBLE_TEXT",
  newreferraltext: "NEW_REFERRAL_TEXT",
  rewardpendingtext: "REWARDS_PENDING_TEXT",
  rewardsavailabletext: "REWARDS_AVAILABLE_TEXT",
  rewardredeemedtext: "REWARD REDEEMED TEXT",
  titleText: "TITLE_TEXT",
};

export const RegularView = () => {
  setupGraphQL()
  return <ReferralListView {...useReferralList(defaultStyle)} />;
};
