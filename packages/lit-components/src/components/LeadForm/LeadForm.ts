import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { LeadFormView } from './LeadFormView';
import { useLeadForm } from './useLeadForm';

export interface LeadFormProps {
  headerText: string;
  submitLabel: string;
  successMessage: string;
  programId?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-lead-form': HTMLElement;
  }
}

export const LeadForm = useComponent<LeadFormProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: LeadFormProps = {
      headerText: rawProps.headerText || 'Get Started',
      submitLabel: rawProps.submitLabel || 'Submit',
      successMessage: rawProps.successMessage || 'Thank you for your submission!',
      programId: rawProps.programId || undefined,
    };

    const hookProps = useLeadForm(props);

    return LeadFormView({ ...props, ...hookProps });
  },
  'sql-lead-form',
  ['header-text', 'submit-label', 'success-message', 'program-id'] as const
);
