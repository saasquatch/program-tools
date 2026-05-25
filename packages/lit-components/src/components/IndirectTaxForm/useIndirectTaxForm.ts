import { useProgramId } from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { IndirectTaxFormProps } from './IndirectTaxForm';

export function useIndirectTaxForm(props: IndirectTaxFormProps) {
  const programId = useProgramId() || props.programId;
  const [taxId, setTaxId] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: Event) {
    e.preventDefault();
    if (!taxId) {
      setError('Tax ID is required');
      return;
    }
    setLoading(true);
    setError('');
    const event = new CustomEvent('sq:tax-form-submit', {
      bubbles: true,
      composed: true,
      detail: { taxId, country, programId },
    });
    document.dispatchEvent(event);
    setSuccess(true);
    setLoading(false);
  }

  return { taxId, setTaxId, country, setCountry, error, loading, success, onSubmit };
}
