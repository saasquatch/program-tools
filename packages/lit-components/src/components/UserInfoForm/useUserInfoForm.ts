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

export function useDemoUserInfoForm(_props: UserInfoFormProps): ReturnType<typeof useUserInfoForm> {
  const [firstName, setFirstName] = useState('Jane');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('jane@example.com');
  const [phone, setPhone] = useState('+1 555 123 4567');
  const [country, setCountry] = useState('United States');
  const [error, setError] = useState('');
  const [loading] = useState(false);

  async function onSubmit(event: Event) {
    event.preventDefault();
    setError('');
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
