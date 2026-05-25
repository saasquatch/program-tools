import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { TaxAndCashView } from './TaxAndCashView';
import { useTaxAndCash } from './useTaxAndCash';

export interface TaxAndCashProps {
  programId?: string;
  step: 'dashboard' | 'user-info' | 'tax-form' | 'banking-info' | 'docusign';
}

const parseStep = (value: unknown): TaxAndCashProps['step'] => {
  switch (value) {
    case 'user-info':
    case 'tax-form':
    case 'banking-info':
    case 'docusign':
      return value;
    default:
      return 'dashboard';
  }
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-tax-and-cash': HTMLElement;
  }
}

export const TaxAndCash = useComponent<TaxAndCashProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof TaxAndCashProps, unknown>>;
    const props: TaxAndCashProps = {
      programId: typeof rawProps.programId === 'string' ? rawProps.programId : undefined,
      step: parseStep(rawProps.step),
    };

    const hookProps = useTaxAndCash(props);

    return TaxAndCashView({ ...props, ...hookProps });
  },
  'sql-tax-and-cash',
  ['program-id', 'step'] as const
);
