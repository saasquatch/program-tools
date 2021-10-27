import { h } from '@stencil/core';
import { createHookStory } from '../components/sqb-stencilbook/HookStoryAddon';
import scenario from '../components/sqb-widget/sqb-widget.feature';
export default {
  title: 'Widget',
  parameters: {
    scenario,
  },
};

function useGraphQL() {
  window.widgetIdent = {
    tenantAlias: 'test_agvu4yg8zrkxt',
    appDomain: 'https://app.referralsaasquatch.com',
    userId: 'rfcdhX2WTcgyJUB061TxE1xwXvj1',
    accountId: 'rfcdhX2WTcgyJUB061TxE1xwXvj1',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InJmY2RoWDJXVGNneUpVQjA2MVR4RTF4d1h2ajEiLCJpZCI6InJmY2RoWDJXVGNneUpVQjA2MVR4RTF4d1h2ajEifX0.lGUEN_cmRrSdw-y2fEz-BQ2R5COoN8tQTiKJGEMfCcI',
    programId: 'Vacay-referral',
    engagementMedium: 'EMBED',
  };
}

export const Widget = createHookStory(() => {
  useGraphQL();
  return (
    <div>
      <sqb-widget widget-type="p/Vacay-referral/w/referrerWidget"></sqb-widget>
    </div>
  );
});

export const DemoWidget = () => {
  //@ts-ignore
  window.widgetIdent = {
    env: 'demo',
  };
  return (
    <sqb-widget
      widget-type="demo"
      //@ts-ignore
      demoData={{
        data: {
          html: `<sqm-portal-protected-route
        require-email-verification="true"
        redirect-to="/login"
        redirect-to-unverified="/emailVerification"
      ></sqm-portal-protected-route
      ><sqm-portal-container direction="column" padding="xxx-large" gap="xxx-large"
        ><sqm-titled-section label-margin="xx-small"
          ><sqm-text slot="label"> <p>Welcome back,</p> </sqm-text
          ><sqm-text slot="content">
            <h1>
              <sqm-user-name fallback="Anonymous User"></sqm-user-name>
            </h1> </sqm-text
        ></sqm-titled-section>
        <sqm-stat-container space="xxxx-large"
          ><sqm-big-stat
            flex-reverse="true"
            alignment="left"
            stat-type="/referralsCount"
            ><sqm-text><p>Referrals</p></sqm-text></sqm-big-stat
          ><sqm-big-stat
            style="white-space: nowrap"
            flex-reverse="true"
            alignment="left"
            stat-type="/rewardBalance/CREDIT/CENTS"
            ><sqm-text><p>Reward Balance</p></sqm-text></sqm-big-stat
          >
        </sqm-stat-container> </sqm-portal-container
      ><sqm-portal-container direction="column" padding="xxx-large" gap="xxx-large">
        <sqm-titled-section padding="none" label-margin="x-large"
          ><sqm-text slot="label"> <h2>Partner and Profit</h2> </sqm-text
          ><sqm-text slot="content">
            <p>
              Get rewarded for referring potential customers to SaaSquatch. Earn
              commission for each successful lead you send our way
            </p>
          </sqm-text></sqm-titled-section
        >
        <sqm-titled-section label-margin="small" padding="none"
          ><sqm-text slot="label"> <h3>Share your referral link</h3> </sqm-text
          ><sqm-share-link slot="content"></sqm-share-link
        ></sqm-titled-section>
        <sqm-titled-section label-margin="small" padding="none">
          <sqm-text slot="label"> <h3>Share your referral code</h3> </sqm-text
          ><sqm-share-code slot="content"></sqm-share-code>
        </sqm-titled-section>
        <sqm-titled-section label-margin="small" padding="none"
          ><sqm-text slot="label"> <h3>Share via social media</h3> </sqm-text
          ><sqm-portal-container
            slot="content"
            direction="row"
            padding="none"
            gap="xxx-large"
            min-width="160px"
            ><sqm-share-button
              icon="envelope"
              medium="email"
              size="medium"
              pill="true"
              >Email a friend</sqm-share-button
            ><sqm-share-button medium="twitter" size="medium" pill="true"
              >Tweet about us</sqm-share-button
            ><sqm-share-button medium="facebook" size="medium" pill="true"
              >Share on Facebook</sqm-share-button
            ></sqm-portal-container
          ></sqm-titled-section
        ></sqm-portal-container
      >`,
        },
      }}
    />
  );
};
