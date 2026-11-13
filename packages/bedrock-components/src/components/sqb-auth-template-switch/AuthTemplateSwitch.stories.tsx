import { createHookStory } from '../sqb-stencilbook/HookStoryAddon';
import { h } from '@stencil/core';
import { useEffect } from '@saasquatch/universal-hooks';
import { fakeJwt } from '@saasquatch/component-boilerplate';
import { useCannedEnvironment } from '@saasquatch/component-boilerplate/canned';

export default {
  title: 'Auth Template Switch',
};

function useAuth() {
  // Identity comes from widgetIdent here, as it does in a squatch.js embed.
  useCannedEnvironment({
    programId: 'Vacay-referral',
    widgetIdent: {
      userId: 'rfcdhX2WTcgyJUB061TxE1xwXvj1',
      accountId: 'rfcdhX2WTcgyJUB061TxE1xwXvj1',
      token: fakeJwt({ user: { id: 'rfcdhX2WTcgyJUB061TxE1xwXvj1', accountId: 'rfcdhX2WTcgyJUB061TxE1xwXvj1' } }),
      engagementMedium: 'EMBED',
    },
  });
}

//@ts-ignore
function useNoAuth() {
  useCannedEnvironment({
    programId: 'Vacay-referral',
    widgetIdent: { engagementMedium: 'EMBED' },
  });
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
