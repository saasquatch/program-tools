import { isDemo } from '@saasquatch/component-boilerplate';
import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PayoutStatusAlertView } from './PayoutStatusAlertView';
import { useDemoPayoutStatus, usePayoutStatus } from './usePayoutStatus';

export interface PayoutStatusAlertProps {
  pendingText: string;
  approvedText: string;
  deniedText: string;
  programId?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-payout-status-alert': HTMLElement;
  }
}

export const PayoutStatusAlert = useComponent<PayoutStatusAlertProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof PayoutStatusAlertProps, unknown>>;
    const props: PayoutStatusAlertProps = {
      pendingText:
        typeof rawProps.pendingText === 'string' ? rawProps.pendingText : 'Your payout is being processed.',
      approvedText:
        typeof rawProps.approvedText === 'string' ? rawProps.approvedText : 'Your payout has been approved!',
      deniedText:
        typeof rawProps.deniedText === 'string'
          ? rawProps.deniedText
          : 'Your payout was denied. Please contact support.',
      programId: typeof rawProps.programId === 'string' ? rawProps.programId : undefined,
    };

    const hookProps = isDemo() ? useDemoPayoutStatus(props) : usePayoutStatus(props);

    return PayoutStatusAlertView({ ...props, ...hookProps });
  },
  'sql-payout-status-alert',
  ['pending-text', 'approved-text', 'denied-text', 'program-id'] as const
);
