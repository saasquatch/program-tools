import { useProgramId } from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { UserInfoFormProps } from './UserInfoForm';

export function useUserInfoForm(props: UserInfoFormProps) {
  const programId = useProgramId() || props.programId;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: Event) {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      setError('First name, last name, and email are required');
      return;
    }
    setLoading(true);
    setError('');
    const event = new CustomEvent('sq:user-info-submit', {
      bubbles: true,
      composed: true,
      detail: { firstName, lastName, email, phone, country, programId },
    });
    document.dispatchEvent(event);
    setLoading(false);
  }

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    country,
    setCountry,
    error,
    loading,
    onSubmit,
  };
}
