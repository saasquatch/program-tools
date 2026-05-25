import { useEngagementMedium } from '@saasquatch/component-boilerplate';

export function useContextRouter() {
  const engagementMedium = useEngagementMedium();
  return { engagementMedium: engagementMedium || 'EMBED' };
}
