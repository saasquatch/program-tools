import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { TaxAndCashDashboardView } from './TaxAndCashDashboardView';
import { useTaxAndCashDashboard } from './useTaxAndCashDashboard';

export interface TaxAndCashDashboardProps {
  userInfoLabel: string;
  taxFormLabel: string;
  bankingInfoLabel: string;
  payoutLabel: string;
  completeText: string;
  incompleteText: string;
  pendingText: string;
  programId?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-tax-and-cash-dashboard': HTMLElement;
  }
}

export const TaxAndCashDashboard = useComponent<TaxAndCashDashboardProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof TaxAndCashDashboardProps, unknown>>;
    const props: TaxAndCashDashboardProps = {
      userInfoLabel: typeof rawProps.userInfoLabel === 'string' ? rawProps.userInfoLabel : 'Personal Information',
      taxFormLabel: typeof rawProps.taxFormLabel === 'string' ? rawProps.taxFormLabel : 'Tax Information',
      bankingInfoLabel:
        typeof rawProps.bankingInfoLabel === 'string' ? rawProps.bankingInfoLabel : 'Banking Information',
      payoutLabel: typeof rawProps.payoutLabel === 'string' ? rawProps.payoutLabel : 'Payout',
      completeText: typeof rawProps.completeText === 'string' ? rawProps.completeText : 'Complete',
      incompleteText: typeof rawProps.incompleteText === 'string' ? rawProps.incompleteText : 'Incomplete',
      pendingText: typeof rawProps.pendingText === 'string' ? rawProps.pendingText : 'Pending',
      programId: typeof rawProps.programId === 'string' ? rawProps.programId : undefined,
    };

    const hookProps = useTaxAndCashDashboard(props);

    return TaxAndCashDashboardView({ ...props, ...hookProps });
  },
  'sql-tax-and-cash-dashboard',
  [
    'user-info-label',
    'tax-form-label',
    'banking-info-label',
    'payout-label',
    'complete-text',
    'incomplete-text',
    'pending-text',
    'program-id',
  ] as const
);
