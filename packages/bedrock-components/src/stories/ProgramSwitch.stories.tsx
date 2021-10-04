import { h } from '@stencil/core';
import { createHookStory } from '../components/sqb-stencilbook/HookStoryAddon';
export default {
  title: 'Program Switch',
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

export const MyComponent = createHookStory(() => {
  useGraphQL();
  return (
    <div>
      <sqb-program-section program-id="Vacay-referral">
        <sqm-program-menu>
          <sl-menu-item value="Vacay-referral">Vacay-referral</sl-menu-item>
          <sl-menu-item value="vacay-affiliates">vacay-affiliates</sl-menu-item>
        </sqm-program-menu>
        <sqb-program-switch>
          <template program-id="Vacay-referral">
            <sqb-widget widget-type="p/Vacay-referral/w/referrerWidget"></sqb-widget>
          </template>
          <template program-id="vacay-affiliates">
            <sqb-widget widget-type="p/vacay-affiliates/w/referrerWidget"></sqb-widget>
          </template>
        </sqb-program-switch>
      </sqb-program-section>
    </div>
  );
});
