import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { PortalLoginView } from './PortalLoginView';

const meta: Meta = {
  title: 'Components/PortalLogin',
  component: 'sql-portal-login',
  tags: ['autodocs'],
  argTypes: {
    'email-label': { control: 'text' },
    'password-label': { control: 'text' },
    'submit-label': { control: 'text' },
    'forgot-password-label': { control: 'text' },
    'register-label': { control: 'text' },
    'header-text': { control: 'text' },
    'error-message': { control: 'text' },
    'hide-register': { control: 'boolean' },
    'hide-forgot-password': { control: 'boolean' },
  },
  render: (args) => html`
    <sql-portal-login
      email-label="${args['email-label'] || 'Email'}"
      password-label="${args['password-label'] || 'Password'}"
      submit-label="${args['submit-label'] || 'Sign In'}"
      forgot-password-label="${args['forgot-password-label'] || 'Forgot Password?'}"
      register-label="${args['register-label'] || 'Register'}"
      header-text="${args['header-text'] || 'Sign In'}"
      error-message="${args['error-message'] || ''}"
      ?hide-register="${args['hide-register'] || false}"
      ?hide-forgot-password="${args['hide-forgot-password'] || false}"
    ></sql-portal-login>
  `,
};

export default meta;
type Story = StoryObj;

const baseProps = {
  emailLabel: 'Email',
  passwordLabel: 'Password',
  submitLabel: 'Sign In',
  forgotPasswordLabel: 'Forgot Password?',
  registerLabel: 'Register',
  headerText: 'Sign In',
  hideRegister: false,
  hideForgotPassword: false,
  email: 'jane@example.com',
  setEmail: () => undefined,
  password: 'password123',
  setPassword: () => undefined,
  error: '',
  loading: false,
  onSubmit: (event: Event) => event.preventDefault(),
  onForgotPassword: () => undefined,
  onRegister: () => undefined,
};

export const Default: Story = {};

export const WithError: Story = {
  args: {
    'error-message': 'Invalid email or password.',
  },
};

export const HideRegister: Story = {
  args: {
    'hide-register': true,
  },
};

export const HideForgotPassword: Story = {
  args: {
    'hide-forgot-password': true,
  },
};

export const CustomLabels: Story = {
  args: {
    'email-label': 'Work Email',
    'password-label': 'Account Password',
    'submit-label': 'Continue',
    'forgot-password-label': 'Need help signing in?',
    'register-label': 'Create an account',
    'header-text': 'Welcome back',
  },
};

export const Loading: Story = {
  render: () =>
    PortalLoginView({
      ...baseProps,
      loading: true,
    }),
};
