import { useState } from '@saasquatch/universal-hooks';
import type { BaseRegistrationProps } from './BaseRegistration';

export interface BaseRegistrationHookResult {
  email: string;
  setEmail: (value: string) => void;
  validationErrors: Record<string, string>;
  loading: boolean;
  onSubmit: (event: Event) => Promise<void>;
}

export function useBaseRegistration(props: BaseRegistrationProps): BaseRegistrationHookResult {
  const [email, setEmail] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: Event) {
    event.preventDefault();

    if (!email) {
      setValidationErrors({ email: props.requiredFieldErrorMessage });
      return;
    }

    if (!email.includes('@')) {
      setValidationErrors({ email: props.invalidEmailErrorMessage });
      return;
    }

    setLoading(true);
    setValidationErrors({});
    document.dispatchEvent(
      new CustomEvent('sq:base-registration-submit', {
        bubbles: true,
        composed: true,
        detail: { email },
      })
    );
    setLoading(false);
  }

  return { email, setEmail, validationErrors, loading, onSubmit };
}
