import { useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import type { PortalChangeMarketingProps } from './PortalChangeMarketing';

const MARKETING_QUERY = gql`
  query getMarketingPrefs {
    viewer {
      ... on User {
        customFields
      }
    }
  }
`;

export function usePortalChangeMarketing(_props: PortalChangeMarketingProps) {
  const user = useUserIdentity();
  const { data, loading } = useQuery(MARKETING_QUERY, {}, !user?.jwt);
  const [subscribed, setSubscribed] = useState(
    data?.viewer?.customFields?.marketingOptIn ?? true
  );
  const [saving, setSaving] = useState(false);

  async function onToggle() {
    setSaving(true);
    const newValue = !subscribed;
    setSubscribed(newValue);
    const event = new CustomEvent('sq:marketing-change', {
      bubbles: true,
      composed: true,
      detail: { subscribed: newValue },
    });
    document.dispatchEvent(event);
    setSaving(false);
  }

  return { subscribed, loading, saving, onToggle };
}

export function useDemoPortalChangeMarketing(_props: PortalChangeMarketingProps): ReturnType<typeof usePortalChangeMarketing> {
  const [subscribed, setSubscribed] = useState(true);
  const [saving, setSaving] = useState(false);

  async function onToggle() {
    setSaving(true);
    setSubscribed(!subscribed);
    setSaving(false);
  }

  return { subscribed, loading: false, saving, onToggle };
}
