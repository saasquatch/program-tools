import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { ReferredRegistrationView } from './ReferredRegistrationView';

export interface ReferredRegistrationProps {
  headerText: string;
  descriptionText: string;
  submitLabel: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-referred-registration': HTMLElement;
  }
}

export const ReferredRegistration = useComponent<ReferredRegistrationProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: ReferredRegistrationProps = {
      headerText: rawProps.headerText || "You've Been Referred!",
      descriptionText:
        rawProps.descriptionText || 'Complete your registration to claim your reward.',
      submitLabel: rawProps.submitLabel || 'Register',
    };

    return ReferredRegistrationView(props);
  },
  'sql-referred-registration',
  ['header-text', 'description-text', 'submit-label'] as const
);
