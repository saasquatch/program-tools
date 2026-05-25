import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { ReferralCodesView } from './ReferralCodesView';
import { useReferralCodes } from './useReferralCodes';

export interface ReferralCodesProps {
  programId?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-referral-codes': HTMLElement;
  }
}

export const ReferralCodes = useComponent<ReferralCodesProps>(
  (host) => {
    const props: ReferralCodesProps = {
      ...getProps(host),
    };

    const hookProps = useReferralCodes(props);

    return ReferralCodesView({ ...props, ...hookProps });
  },
  'sql-referral-codes',
  ['program-id'] as const
);
