import { setUserIdentity } from '@saasquatch/component-boilerplate';
import { useCannedEnvironment } from '@saasquatch/component-boilerplate/canned';
import { h } from '@stencil/core';
import { createHookStory } from '../sqb-stencilbook/HookStoryAddon';
import scenario from './sqb-widget.feature';
import { cannedWidgetMocks } from './cannedWidgetTemplates';
export default {
  title: 'Widget',
  parameters: {
    scenario,
  },
};

function useGraphQL(user: { id: string; accountId: string; programId?: string; locale?: string }) {
  useCannedEnvironment({
    programId: user.programId ?? 'Vacay-referral',
    user: { id: user.id, accountId: user.accountId },
    widgetIdent: { engagementMedium: 'EMBED', locale: user.locale },
    mocks: cannedWidgetMocks,
  });
}

export const Widget = createHookStory(() => {
  const user = {
    id: 'rfcdhX2WTcgyJUB061TxE1xwXvj1',
    accountId: 'rfcdhX2WTcgyJUB061TxE1xwXvj1',
  };
  useGraphQL(user);
  return (
    <div>
      <sqb-widget widget-type="p/Vacay-referral/w/referrerWidget"></sqb-widget>
    </div>
  );
});

export const WidgetWithAnalytics = createHookStory(() => {
  const user = {
    id: 'rfcdhX2WTcgyJUB061TxE1xwXvj1',
    accountId: 'rfcdhX2WTcgyJUB061TxE1xwXvj1',
  };
  useGraphQL(user);
  return (
    <div>
      <sqb-widget widget-type="p/Vacay-referral/w/referrerWidget" track-loads="true"></sqb-widget>
    </div>
  );
});

export const WidgetWithLocaleEn = createHookStory(() => {
  const user = {
    id: 'samenglish',
    accountId: 'samenglish',
    locale: 'en',
    programId: 'klip-referral-program',
  };
  useGraphQL(user);

  return (
    <div>
      <sqb-widget widget-type="p/klip-referral-program/w/referrerWidget" track-loads="true" require-auth="true"></sqb-widget>
    </div>
  );
});

export const WidgetWithLocaleTr = createHookStory(() => {
  const user = {
    id: 'samturkey',
    accountId: 'samturkey',
    locale: 'tr',
    programId: 'klip-referral-program',
  };
  useGraphQL(user);
  return (
    <div>
      <sqb-widget widget-type="p/klip-referral-program/w/referrerWidget" track-loads="true" require-auth="true"></sqb-widget>
    </div>
  );
});

export const WidgetWithLocaleFr = createHookStory(() => {
  const user = {
    id: 'samfrench',
    accountId: 'samfrench',
    locale: 'fr',
    programId: 'klip-referral-program',
  };
  useGraphQL(user);
  return (
    <div>
      <sqb-widget widget-type="p/klip-referral-program/w/referrerWidget" track-loads="true" require-auth="true"></sqb-widget>
    </div>
  );
});

export const WidgetWithNoLocale = createHookStory(() => {
  const user = {
    id: 'nolocale',
    accountId: 'nolocale',
    programId: 'klip-referral-program',
  };
  useGraphQL(user);
  return (
    <div>
      <sqb-widget widget-type="p/klip-referral-program/w/referrerWidget" track-loads="true" require-auth="true"></sqb-widget>
    </div>
  );
});

export const WidgetWithNoAuth = createHookStory(() => {
  useCannedEnvironment({ programId: 'klip-referral-program', mocks: cannedWidgetMocks });
  setUserIdentity(undefined);
  return (
    <div>
      <sqb-widget widget-type="w/sampleWidget" track-loads="false"></sqb-widget>
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
              >Post about us</sqm-share-button
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
