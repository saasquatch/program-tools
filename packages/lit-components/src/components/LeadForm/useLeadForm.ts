import { useMutation, useProgramId } from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import type { LeadFormProps } from './LeadForm';

const LEAD_FORM_MUTATION = gql`
  mutation submitLeadForm($formData: JSONObject!, $programId: ID) {
    submitForm(formData: $formData, programId: $programId) {
      success
    }
  }
`;

export function useLeadForm(props: LeadFormProps) {
  const programId = useProgramId() || props.programId;
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitForm] = useMutation(LEAD_FORM_MUTATION);

  function updateField(name: string, value: string) {
    setFormData({ ...formData, [name]: value });
  }

  async function onSubmit(e: Event) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitForm({ formData, programId });
      setSuccess(true);
    } catch (_err) {
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  }

  return { formData, updateField, error, loading, success, onSubmit };
}
