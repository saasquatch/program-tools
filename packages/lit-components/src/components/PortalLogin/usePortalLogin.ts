import { isDemo, useMutation, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import { PortalLoginProps } from './PortalLogin';

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        accountId
      }
    }
  }
`;

export function usePortalLogin(props: PortalLoginProps) {
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const user = useUserIdentity();
  const demoMode = isDemo();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  void loginMutation;
  void user;
  void demoMode;
  void props;

  async function onSubmit(event: Event) {
    event.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    document.dispatchEvent(
      new CustomEvent('sq:login', {
        bubbles: true,
        composed: true,
        detail: { email, password },
      })
    );
    setLoading(false);
  }

  function onForgotPassword() {
    document.dispatchEvent(
      new CustomEvent('sq:navigate', {
        bubbles: true,
        composed: true,
        detail: { path: '/forgot-password' },
      })
    );
  }

  function onRegister() {
    document.dispatchEvent(
      new CustomEvent('sq:navigate', {
        bubbles: true,
        composed: true,
        detail: { path: '/register' },
      })
    );
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    onSubmit,
    onForgotPassword,
    onRegister,
  };
}
