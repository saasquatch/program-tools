import { h } from '@stencil/core';
import { useState } from 'haunted';
import { ShareLinkView } from '../components/share-link/share-link-view';
import { useShareLink } from '../components/share-link/useShareLink';

export default {
  title: 'Hooks / useShareLink',
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
  const variables = {
    programId: 'a-referral-program',
  };
  const res = useShareLink({variables} as any);
  return (
    <div>
      Sharelink: <code style={{borderStyle: "solid", borderWidth: "1px", padding: "2px"}}>{res.sharelink}</code>
    </div>
  );
};

export const RegularView = () => {
  setupGraphQL()
  return <ShareLinkView {...useShareLink({variables: {
    programId: 'a-referral-program',
  }})} />;
};
