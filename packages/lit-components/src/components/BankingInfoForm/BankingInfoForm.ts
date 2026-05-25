import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { BankingInfoFormView } from './BankingInfoFormView';
import { useBankingInfoForm } from './useBankingInfoForm';

export interface BankingInfoFormProps {
  headerText: string;
  submitLabel: string;
  accountNameLabel: string;
  bankNameLabel: string;
  accountNumberLabel: string;
  routingNumberLabel: string;
  programId?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-banking-info-form': HTMLElement;
  }
}

export const BankingInfoForm = useComponent<BankingInfoFormProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof BankingInfoFormProps, unknown>>;
    const props: BankingInfoFormProps = {
      headerText: typeof rawProps.headerText === 'string' ? rawProps.headerText : 'Banking Information',
      submitLabel: typeof rawProps.submitLabel === 'string' ? rawProps.submitLabel : 'Save',
      accountNameLabel:
        typeof rawProps.accountNameLabel === 'string' ? rawProps.accountNameLabel : 'Account Holder Name',
      bankNameLabel: typeof rawProps.bankNameLabel === 'string' ? rawProps.bankNameLabel : 'Bank Name',
      accountNumberLabel:
        typeof rawProps.accountNumberLabel === 'string' ? rawProps.accountNumberLabel : 'Account Number',
      routingNumberLabel:
        typeof rawProps.routingNumberLabel === 'string' ? rawProps.routingNumberLabel : 'Routing Number',
      programId: typeof rawProps.programId === 'string' ? rawProps.programId : undefined,
    };

    const hookProps = useBankingInfoForm(props);

    return BankingInfoFormView({ ...props, ...hookProps });
  },
  'sql-banking-info-form',
  [
    'header-text',
    'submit-label',
    'account-name-label',
    'bank-name-label',
    'account-number-label',
    'routing-number-label',
    'program-id',
  ] as const
);
