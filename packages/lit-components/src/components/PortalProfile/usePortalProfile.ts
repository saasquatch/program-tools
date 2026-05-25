import { isDemo, useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useEffect, useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import { PortalProfileProps } from './PortalProfile';

const PROFILE_QUERY = gql`
  query getProfile {
    user: viewer {
      ... on User {
        firstName
        lastName
        email
        countryCode
      }
    }
  }
`;

export function usePortalProfile(props: PortalProfileProps) {
  const user = useUserIdentity();
  const shouldSkipQuery = !user?.jwt || isDemo();
  const { data, loading } = useQuery(PROFILE_QUERY, {}, shouldSkipQuery);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  void props;

  useEffect(() => {
    if (!data?.user) {
      return;
    }
    setFirstName(data.user.firstName || '');
    setLastName(data.user.lastName || '');
    setEmail(data.user.email || '');
    setCountry(data.user.countryCode || '');
  }, [data?.user?.firstName, data?.user?.lastName, data?.user?.email, data?.user?.countryCode]);

  async function onSubmit(event: Event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);
    document.dispatchEvent(
      new CustomEvent('sq:profile-update', {
        bubbles: true,
        composed: true,
        detail: { firstName, lastName, email, country },
      })
    );
    setSuccess(true);
    setSaving(false);
  }

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    country,
    setCountry,
    error,
    success,
    loading,
    saving,
    onSubmit,
  };
}
