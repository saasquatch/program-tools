import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { PortalGoogleRegistrationFormView } from './PortalGoogleRegistrationFormView';

const meta: Meta = {
  title: 'Components/PortalGoogleRegistrationForm',
  component: 'sql-portal-google-registration-form',
  tags: ['autodocs'],
  argTypes: {
    'page-label': { control: 'text' },
    'email-label': { control: 'text' },
    'password-label': { control: 'text' },
    'submit-label': { control: 'text' },
    'login-label': { control: 'text' },
    'confirm-password-label': { control: 'text' },
    'confirm-password': { control: 'boolean' },
    'google-button-text': {
      control: 'select',
      options: ['signup_with', 'signin_with', 'continue_with', 'signin'],
    },
  },
  render: (args) => html`
    <sql-portal-google-registration-form
      page-label="${args['page-label'] || 'Register'}"
      email-label="${args['email-label'] || 'Email'}"
      password-label="${args['password-label'] || 'Password'}"
      submit-label="${args['submit-label'] || 'Register'}"
      login-label="${args['login-label'] || 'Sign in'}"
      confirm-password-label="${args['confirm-password-label'] || 'Confirm Password'}"
      ?confirm-******
      google-button-text="${args['google-button-text'] || 'signup_with'}"
    >
      <p slot="terms" style="margin: 0; color: var(--sl-color-neutral-600);">
        By continuing, you agree to the terms and conditions.
      </p>
    </sql-portal-google-registration-form>
  `,
};

export default meta;
type Story = StoryObj<typeof meta>;

const baseProps = {
  nextPage: '/',
  redirectPath: '/verifyEmail',
  emailLabel: 'Email',
  passwordLabel: 'Password',
  submitLabel: 'Register',
  loginLabel: 'Sign in',
  confirmPasswordLabel: 'Confirm Password',
  confirmPassword: false,
  disablePasswordValidation: false,
  hideInputs: false,
  pageLabel: 'Register',
  loginPath: '/login',
  loginCTA: 'Already have an account?',
  requiredFieldErrorMessage: 'Cannot be empty',
  networkErrorMessage: 'Network request failed.',
  passwordMismatchErrorMessage: 'Passwords do not match.',
  invalidEmailErrorMessage: 'Must be a valid email address',
  formDisabledErrorMessage: 'The registration form is currently disabled.',
  meetsRequirementsText: 'Password has met all requirements',
  doesNotMeetRequirementsText: 'Password must meet the following requirements:',
  minErrorText: 'be a minimum of 8 characters',
  uppercaseErrorText: 'contain at least 1 uppercase character',
  lowercaseErrorText: 'contain at least 1 lowercase character',
  hasErrorText: 'contain at least 1 number or symbol',
  googleButtonText: 'signup_with',
  mode: 'google' as const,
  baseEmail: 'testuser@example.com',
  setBaseEmail: (_value: string) => undefined,
  firstName: 'Test',
  setFirstName: (_value: string) => undefined,
  lastName: 'User',
  setLastName: (_value: string) => undefined,
  email: 'testuser@example.com',
  setEmail: (_value: string) => undefined,
  password: '',
  setPassword: (_value: string) => undefined,
  confirmPasswordValue: '',
  setConfirmPasswordValue: (_value: string) => undefined,
  validationErrors: {},
  loading: false,
  error: '',
  passwordHelpText: '',
  onBaseSubmit: async (event: Event) => event.preventDefault(),
  onGoogleInit: (_event: Event) => undefined,
  onSubmit: async (event: Event) => event.preventDefault(),
  onLogin: () => undefined,
};

export const Default: Story = {};

export const GooglePrefilled: Story = {
  render: () => PortalGoogleRegistrationFormView(baseProps),
};

export const RegisterWithError: Story = {
  render: () =>
    PortalGoogleRegistrationFormView({
      ...baseProps,
      mode: 'manual',
      password: 'short',
      error: 'Password must meet the following requirements.',
    }),
};
