import { createHookStory } from '../sqb-stencilbook/HookStoryAddon';
import { h } from '@stencil/core';
import { useEffect, useState } from '@saasquatch/universal-hooks';

export default {
  title: 'Auth Template Switch',
};

function useAuth() {
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

function useNoAuth() {
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: 'test_agvu4yg8zrkxt',
    appDomain: 'https://app.referralsaasquatch.com',
    programId: 'Vacay-referral',
    engagementMedium: 'EMBED',
  };
}

export const AuthTemplateSwitch = createHookStory(() => {
  useAuth();

  useEffect(() => {
    return () => (window.widgetIdent = undefined);
  }, []);

  return (
    <div>
      <sqb-auth-template-switch>
        <template slot="logged-in">
          <span>Logged in slot</span>
        </template>
        <template slot="logged-out">
          <span>Logged out slot</span>
        </template>
      </sqb-auth-template-switch>
    </div>
  );
});
