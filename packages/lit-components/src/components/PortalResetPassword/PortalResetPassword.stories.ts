import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { PortalResetPasswordView } from './PortalResetPasswordView';

const meta: Meta = {
  title: 'Components/PortalResetPassword',
  component: 'sql-portal-reset-password',
  tags: ['autodocs'],
  argTypes: {
    'password-label': { control: 'text' },
    'confirm-password-label': { control: 'text' },
    'submit-label': { control: 'text' },
    'header-text': { control: 'text' },
    'success-message': { control: 'text' },
    'password-min-length': { control: 'number' },
  },
  render: (args) => html`
    <sql-portal-reset-password
      password-label="${args['password-label'] || 'New Password'}"
      confirm-password-label="${args['confirm-password-label'] || 'Confirm Password'}"
      submit-label="${args['submit-label'] || 'Reset Password'}"
      header-text="${args['header-text'] || 'Reset Password'}"
      success-message="${args['success-message'] || 'Password reset successfully. You can now sign in.'}"
      password-min-length="${args['password-min-length'] || 8}"
    ></sql-portal-reset-password>
  `,
};

export default meta;
type Story = StoryObj;

const baseProps = {
  passwordLabel: 'New Password',
  confirmPasswordLabel: 'Confirm Password',
  submitLabel: 'Reset Password',
  headerText: 'Reset Password',
  successMessage: 'Password reset successfully. You can now sign in.',
  passwordMinLength: 8,
  password: 'password123',
  setPassword: () => undefined,
  confirmPassword: 'password123',
  setConfirmPassword: () => undefined,
  error: '',
  loading: false,
  success: false,
  resetCode: 'demo-reset-code',
  onSubmit: (event: Event) => event.preventDefault(),
};

export const Default: Story = {
  render: () => PortalResetPasswordView(baseProps),
};

export const WithError: Story = {
  render: () =>
    PortalResetPasswordView({
      ...baseProps,
      error: 'Passwords do not match',
      confirmPassword: 'different-password',
    }),
};

export const Success: Story = {
  render: () =>
    PortalResetPasswordView({
      ...baseProps,
      success: true,
    }),
};

export const InvalidCode: Story = {
  render: () =>
    PortalResetPasswordView({
      ...baseProps,
      resetCode: '',
    }),
};

export const CustomLabels: Story = {
  render: () =>
    PortalResetPasswordView({
      ...baseProps,
      passwordLabel: 'Create New Password',
      confirmPasswordLabel: 'Repeat New Password',
      submitLabel: 'Save Password',
      headerText: 'Create a fresh password',
      successMessage: 'Your password has been updated.',
    }),
};
