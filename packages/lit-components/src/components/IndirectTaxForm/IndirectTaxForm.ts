import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { IndirectTaxFormView } from './IndirectTaxFormView';
import { useIndirectTaxForm } from './useIndirectTaxForm';

export interface IndirectTaxFormProps {
  headerText: string;
  submitLabel: string;
  taxIdLabel: string;
  countryLabel: string;
  programId?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-indirect-tax-form': HTMLElement;
  }
}

export const IndirectTaxForm = useComponent<IndirectTaxFormProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof IndirectTaxFormProps, unknown>>;
    const props: IndirectTaxFormProps = {
      headerText: typeof rawProps.headerText === 'string' ? rawProps.headerText : 'Tax Information',
      submitLabel: typeof rawProps.submitLabel === 'string' ? rawProps.submitLabel : 'Submit',
      taxIdLabel: typeof rawProps.taxIdLabel === 'string' ? rawProps.taxIdLabel : 'Tax ID / VAT Number',
      countryLabel: typeof rawProps.countryLabel === 'string' ? rawProps.countryLabel : 'Country',
      programId: typeof rawProps.programId === 'string' ? rawProps.programId : undefined,
    };

    const hookProps = useIndirectTaxForm(props);

    return IndirectTaxFormView({ ...props, ...hookProps });
  },
  'sql-indirect-tax-form',
  ['header-text', 'submit-label', 'tax-id-label', 'country-label', 'program-id'] as const
);
