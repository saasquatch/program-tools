import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { ReferralIframeView } from './ReferralIframeView';
import { useReferralIframe } from './useReferralIframe';

export interface ReferralIframeProps {
  iframeUrl?: string;
  iframeWidth: string;
  iframeHeight: string;
  programId?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-referral-iframe': HTMLElement;
  }
}

export const ReferralIframe = useComponent<ReferralIframeProps>(
  (host) => {
    const props: ReferralIframeProps = {
      iframeUrl: '',
      iframeWidth: '100%',
      iframeHeight: '400px',
      ...getProps(host),
    };

    const hookProps = useReferralIframe(props);

    return ReferralIframeView({ ...props, ...hookProps });
  },
  'sql-referral-iframe',
  ['iframe-url', 'iframe-width', 'iframe-height', 'program-id'] as const
);
