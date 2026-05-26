import { useMutation, useUserIdentity } from '@saasquatch/component-boilerplate';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  void loginMutation;
  void user;
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

export function useDemoPortalLogin(_props: PortalLoginProps): ReturnType<typeof usePortalLogin> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(event: Event) {
    event.preventDefault();
    console.log('Demo login submit');
  }

  function onForgotPassword() {
    console.log('Demo forgot password');
  }

  function onRegister() {
    console.log('Demo register');
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    error: '',
    loading: false,
    onSubmit,
    onForgotPassword,
    onRegister,
  };
}
