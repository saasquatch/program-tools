import { h } from '@stencil/core';
import { ShareButtonView } from '../components/share-button/share-button-view';
import { useShareButton } from '../components/share-button/useShareButton';

export default {
  title: 'Hooks / useShareButton',
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
    engagementMedium: 'HOSTED',
  };
  const res = [useShareButton({ variables, medium: 'facebook' }), useShareButton({ variables, medium: 'twitter' }), useShareButton({ variables, medium: 'email' })];
  // console.log(res.data.referrals)
  return (
    <div>
      {res.map(r => (
        <div>
          <button onClick={r.onClick}>Share link ({r.medium})</button>
        </div>
      ))}
    </div>
  );
};

export const RegularView = () => {
  setupGraphQL();
  const variables = {
    programId: 'a-referral-program',
    engagementMedium: 'HOSTED',
  };
  const mediums: Array<ReturnType<typeof useShareButton>['medium']> = ['facebook', 'twitter', 'email'];
  return (
    <div>
      {mediums.map(medium => (
        <div>
          <ShareButtonView
            {...useShareButton({
              variables,
              medium,
            })}
          >BUTTON_TEXT</ShareButtonView>
        </div>
      ))}
    </div>
  );
};
