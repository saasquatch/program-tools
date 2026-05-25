import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { PortalRegisterView } from './PortalRegisterView';

const meta: Meta = {
  title: 'Components/PortalRegister',
  component: 'sql-portal-register',
  tags: ['autodocs'],
  argTypes: {
    'email-label': { control: 'text' },
    'password-label': { control: 'text' },
    'confirm-password-label': { control: 'text' },
    'submit-label': { control: 'text' },
    'login-label': { control: 'text' },
    'header-text': { control: 'text' },
    'show-confirm-password': { control: 'boolean' },
    'password-min-length': { control: 'number' },
  },
  render: (args) => html`
    <sql-portal-register
      email-label="${args['email-label'] || 'Email'}"
      password-label="${args['password-label'] || 'Password'}"
      confirm-password-label="${args['confirm-password-label'] || 'Confirm Password'}"
      submit-label="${args['submit-label'] || 'Register'}"
      login-label="${args['login-label'] || 'Already have an account? Sign in'}"
      header-text="${args['header-text'] || 'Create Account'}"
      ?show-confirm-password="${args['show-confirm-password'] ?? true}"
      password-min-length="${args['password-min-length'] || 8}"
    ></sql-portal-register>
  `,
};

export default meta;
type Story = StoryObj;

const baseProps = {
  emailLabel: 'Email',
  passwordLabel: 'Password',
  confirmPasswordLabel: 'Confirm Password',
  submitLabel: 'Register',
  loginLabel: 'Already have an account? Sign in',
  headerText: 'Create Account',
  showConfirmPassword: true,
  passwordMinLength: 8,
  email: 'jane@example.com',
  setEmail: () => undefined,
  password: 'password123',
  setPassword: () => undefined,
  confirmPassword: 'password123',
  setConfirmPassword: () => undefined,
  error: '',
  loading: false,
  onSubmit: (event: Event) => event.preventDefault(),
  onLogin: () => undefined,
};

export const Default: Story = {};

export const WithError: Story = {
  render: () =>
    PortalRegisterView({
      ...baseProps,
      error: 'Passwords do not match',
      confirmPassword: 'different-password',
    }),
};

export const NoConfirmPassword: Story = {
  args: {
    'show-confirm-password': false,
  },
};

export const CustomLabels: Story = {
  args: {
    'email-label': 'Work Email',
    'password-label': 'Create Password',
    'confirm-password-label': 'Repeat Password',
    'submit-label': 'Create Account',
    'login-label': 'Sign in instead',
    'header-text': 'Join the portal',
  },
};

export const Loading: Story = {
  render: () =>
    PortalRegisterView({
      ...baseProps,
      loading: true,
    }),
};
