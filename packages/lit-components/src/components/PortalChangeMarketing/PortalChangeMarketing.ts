import { isDemo } from '@saasquatch/component-boilerplate';
import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PortalChangeMarketingView } from './PortalChangeMarketingView';
import { useDemoPortalChangeMarketing, usePortalChangeMarketing } from './usePortalChangeMarketing';

export interface PortalChangeMarketingProps {
  headerText: string;
  description: string;
  subscribedText: string;
  unsubscribedText: string;
  subscribeLabel: string;
  unsubscribeLabel: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-portal-change-marketing': HTMLElement;
  }
}

export const PortalChangeMarketing = useComponent<PortalChangeMarketingProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: PortalChangeMarketingProps = {
      headerText: rawProps.headerText || 'Email Preferences',
      description: rawProps.description || 'Manage your email notification preferences.',
      subscribedText:
        rawProps.subscribedText || 'You are subscribed to marketing emails.',
      unsubscribedText:
        rawProps.unsubscribedText || 'You are not subscribed to marketing emails.',
      subscribeLabel: rawProps.subscribeLabel || 'Subscribe',
      unsubscribeLabel: rawProps.unsubscribeLabel || 'Unsubscribe',
    };

    const hookProps = isDemo() ? useDemoPortalChangeMarketing(props) : usePortalChangeMarketing(props);

    return PortalChangeMarketingView({ ...props, ...hookProps });
  },
  'sql-portal-change-marketing',
  [
    'header-text',
    'description',
    'subscribed-text',
    'unsubscribed-text',
    'subscribe-label',
    'unsubscribe-label',
  ] as const
);
