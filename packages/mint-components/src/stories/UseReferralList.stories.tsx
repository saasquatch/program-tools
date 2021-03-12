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
  const payload = setupGraphQL();
  const res = useReferralList(payload);
  return (
    <div>
      <div>
        Displaying data for user:{' '}
        <code>
          <strong>{payload.id}</strong>
        </code>
      </div>
      <div>
        <p>Page: {res.states.offset + 1}</p>
      </div>
      <div>
        <button onClick={() => res.callbacks.paginate(res.states.offset - 1)}> {'<'} </button>
        <button onClick={() => res.callbacks.paginate(res.states.offset + 1)}> {'>'} </button>
      </div>
      <div>
        <code>{res.states.loading ? 'LOADING...' : JSON.stringify(res.data.referrals)}</code>
      </div>
    </div>
  );
};

export const RegularView = () => {
  const id = 'worried-camera@uexwltgh.mailosaur.net';
  const accountId = id;

  //@ts-ignore
  window.SquatchAndroid = true;
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: 'test_as36zjtpfy7oo',
    appDomain: 'https://staging.referralsaasquatch.com',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6IndvcnJpZWQtY2FtZXJhQHVleHdsdGdoLm1haWxvc2F1ci5uZXQiLCJpZCI6IndvcnJpZWQtY2FtZXJhQHVleHdsdGdoLm1haWxvc2F1ci5uZXQifX0.-WGV4_bzGCFp-OTIO-h-yp0MlgtkdufT_GgI4T691OY',
    userId: id,
    accountId,
  };
  return <ReferralListView {...useReferralList({ id, accountId })} />;
};
