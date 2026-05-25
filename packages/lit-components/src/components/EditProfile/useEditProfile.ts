import { useMutation, useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import type { EditProfileProps } from './EditProfile';

const PROFILE_QUERY = gql`
  query getProfile {
    viewer {
      ... on User {
        firstName
        lastName
        email
      }
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation updateProfile($firstName: String, $lastName: String) {
    updateUser(userInput: { firstName: $firstName, lastName: $lastName }) {
      firstName
      lastName
    }
  }
`;

export function useEditProfile(_props: EditProfileProps) {
  const user = useUserIdentity();
  const { data, loading } = useQuery(PROFILE_QUERY, {}, !user?.jwt);
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const [firstName, setFirstName] = useState(data?.viewer?.firstName || '');
  const [lastName, setLastName] = useState(data?.viewer?.lastName || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: Event) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);
    try {
      await updateProfile({ firstName, lastName });
      setSuccess(true);
    } catch (_err) {
      setError('Failed to update profile. Please try again.');
    }
    setSaving(false);
  }

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email: data?.viewer?.email || '',
    error,
    success,
    loading,
    saving,
    onSubmit,
  };
}
