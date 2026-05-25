import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { PortalRegistrationFormView } from './PortalRegistrationFormView';

const meta: Meta = {
  title: 'Components/PortalRegistrationForm',
  component: 'sql-portal-registration-form',
  tags: ['autodocs'],
  argTypes: {
    'email-label': { control: 'text' },
    'password-label': { control: 'text' },
    'confirm-password-label': { control: 'text' },
    'first-name-label': { control: 'text' },
    'last-name-label': { control: 'text' },
    'submit-label': { control: 'text' },
    'show-name-fields': { control: 'boolean' },
    'show-confirm-password': { control: 'boolean' },
    'password-min-length': { control: 'number' },
    'header-text': { control: 'text' },
    'terms-text': { control: 'text' },
    'terms-url': { control: 'text' },
  },
  render: (args) => html`
    <sql-portal-registration-form
      email-label="${args['email-label'] || 'Email'}"
      password-label="${args['password-label'] || 'Password'}"
      confirm-password-label="${args['confirm-password-label'] || 'Confirm Password'}"
      first-name-label="${args['first-name-label'] || 'First Name'}"
      last-name-label="${args['last-name-label'] || 'Last Name'}"
      submit-label="${args['submit-label'] || 'Register'}"
      ?show-name-fields="${args['show-name-fields'] ?? true}"
      show-confirm-password="${args['show-confirm-password'] ?? true}"
      password-min-length="${args['password-min-length'] || 8}"
      header-text="${args['header-text'] || 'Create Your Account'}"
      terms-text="${args['terms-text'] || ''}"
      terms-url="${args['terms-url'] || ''}"
    ></sql-portal-registration-form>
  `,
};

export default meta;
type Story = StoryObj;

const baseProps = {
  emailLabel: 'Email',
  passwordLabel: 'Password',
  confirmPasswordLabel: 'Confirm Password',
  firstNameLabel: 'First Name',
  lastNameLabel: 'Last Name',
  submitLabel: 'Register',
  showNameFields: true,
  showConfirmPassword: true,
  passwordMinLength: 8,
  headerText: 'Create Your Account',
  termsText: undefined,
  termsUrl: undefined,
};

const baseHookProps = {
  firstName: '',
  setFirstName: (_value: string) => {},
  lastName: '',
  setLastName: (_value: string) => {},
  email: '',
  setEmail: (_value: string) => {},
  password: '',
  setPassword: (_value: string) => {},
  confirmPassword: '',
  setConfirmPassword: (_value: string) => {},
  error: '',
  loading: false,
  termsAccepted: false,
  setTermsAccepted: (_value: boolean) => {},
  onSubmit: async (event: Event) => event.preventDefault(),
};

export const Default: Story = {};

export const WithoutNameFields: Story = {
  args: {
    'show-name-fields': false,
  },
};

export const WithTerms: Story = {
  args: {
    'terms-text': 'I accept the terms and conditions',
    'terms-url': 'https://example.com/terms',
  },
};

export const WithError: Story = {
  render: () =>
    PortalRegistrationFormView({
      ...baseProps,
      ...baseHookProps,
      error: 'Passwords do not match',
    }),
};

export const Loading: Story = {
  render: () =>
    PortalRegistrationFormView({
      ...baseProps,
      ...baseHookProps,
      loading: true,
    }),
};
