import { h } from '@stencil/core';
// import { useState } from 'haunted';
import { BigStatView } from '../components/big-stat/big-stat-view';
import { useBigStat } from '../components/big-stat/useBigStat';

export default {
  title: 'Hooks / useBigStat',
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

// function useRerender() {
//   const [, set] = useState(false);
//   return () => set(b => !b);
// }

const View = (type: string) => {
  setupGraphQL();
  const { props, label } = useBigStat({
    programId: 'a-referral-program',
    type,
    render: () => {},
    disconnectedCallback: () => {},
  });
  return <BigStatView {...props}>{label}</BigStatView>;
};

export const ReferralsCount = () => View('/referralsCount');
export const ReferralsMonth = () => View('/referralsMonth');
export const ReferralsWeek = () => View('/referralsWeek');
export const RewardsCount = () => View('/rewardsCount');
export const RewardsMonth = () => View('/rewardsMonth');
export const RewardsWeek = () => View('/rewardsWeek');
export const RewardsAssigned = () => View('/rewardsAssigned/CREDIT/COFFEE');
export const RewardsRedeemed = () => View('/rewardsRedeemed/CREDIT/COFFEE');
export const RewardsAvailable = () => View('/rewardsAvailable/CREDIT/COFFEE');
export const RewardBalance = () => View('/rewardBalance/CREDIT/COFFEE/prettyValue');

// export const RegularView = () => {
//   setupGraphQL();
//   const variables = {
//     programId: 'a-referral-program',
//     render: () => {},
//   };
//   const res = ['/referralsCount', '/rewardsCount'].map(type =>
//     useBigStat({
//       ...variables,
//       type: type,
//     }),
//   );
//   return (
//     <div style={{ display: 'flex' }}>
//       {res.map(r => (
//         <div style={{ margin: '5px' }}>
//           <BigStatView {...r.props}>{r.label}</BigStatView>
//         </div>
//       ))}
//     </div>
//   );
// };
