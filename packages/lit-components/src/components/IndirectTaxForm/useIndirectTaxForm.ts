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

export function useDemoIndirectTaxForm(
  _props: IndirectTaxFormProps
): ReturnType<typeof useIndirectTaxForm> {
  const [taxId, setTaxId] = useState('VAT-123456789');
  const [country, setCountry] = useState('United States');
  const [error, setError] = useState('');
  const [loading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(event: Event) {
    event.preventDefault();
    setError('');
    setSuccess(true);
  }

  return { taxId, setTaxId, country, setCountry, error, loading, success, onSubmit };
}
