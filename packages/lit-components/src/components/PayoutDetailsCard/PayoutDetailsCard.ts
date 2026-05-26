import { isDemo } from '@saasquatch/component-boilerplate';
import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PayoutDetailsCardView } from './PayoutDetailsCardView';
import { useDemoPayoutDetailsCard, usePayoutDetailsCard } from './usePayoutDetailsCard';

export interface PayoutDetailsCardProps {
  headerText: string;
  nextPayoutLabel: string;
  balanceLabel: string;
  programId?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-payout-details-card': HTMLElement;
  }
}

export const PayoutDetailsCard = useComponent<PayoutDetailsCardProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof PayoutDetailsCardProps, unknown>>;
    const props: PayoutDetailsCardProps = {
      headerText: typeof rawProps.headerText === 'string' ? rawProps.headerText : 'Payout Details',
      nextPayoutLabel: typeof rawProps.nextPayoutLabel === 'string' ? rawProps.nextPayoutLabel : 'Next Payout',
      balanceLabel: typeof rawProps.balanceLabel === 'string' ? rawProps.balanceLabel : 'Available Balance',
      programId: typeof rawProps.programId === 'string' ? rawProps.programId : undefined,
    };

    const hookProps = isDemo() ? useDemoPayoutDetailsCard(props) : usePayoutDetailsCard(props);

    return PayoutDetailsCardView({ ...props, ...hookProps });
  },
  'sql-payout-details-card',
  ['header-text', 'next-payout-label', 'balance-label', 'program-id'] as const
);
