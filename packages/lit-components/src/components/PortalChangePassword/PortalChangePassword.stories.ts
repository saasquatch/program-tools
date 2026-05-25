import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { PortalChangePasswordView } from './PortalChangePasswordView';

const meta: Meta = {
  title: 'Components/PortalChangePassword',
  component: 'sql-portal-change-password',
  tags: ['autodocs'],
  argTypes: {
    'current-password-label': { control: 'text' },
    'new-password-label': { control: 'text' },
    'confirm-password-label': { control: 'text' },
    'submit-label': { control: 'text' },
    'header-text': { control: 'text' },
    'success-message': { control: 'text' },
    'password-min-length': { control: 'number' },
  },
  render: (args) => html`
    <sql-portal-change-password
      current-password-label="${args['current-password-label'] || 'Current Password'}"
      new-password-label="${args['new-password-label'] || 'New Password'}"
      confirm-password-label="${args['confirm-password-label'] || 'Confirm New Password'}"
      submit-label="${args['submit-label'] || 'Change Password'}"
      header-text="${args['header-text'] || 'Change Password'}"
      success-message="${args['success-message'] || 'Password changed successfully.'}"
      password-min-length="${args['password-min-length'] || 8}"
    ></sql-portal-change-password>
  `,
};

export default meta;
type Story = StoryObj;

const baseProps = {
  currentPasswordLabel: 'Current Password',
  newPasswordLabel: 'New Password',
  confirmPasswordLabel: 'Confirm New Password',
  submitLabel: 'Change Password',
  headerText: 'Change Password',
  successMessage: 'Password changed successfully.',
  passwordMinLength: 8,
  currentPassword: 'old-password',
  setCurrentPassword: () => undefined,
  newPassword: 'new-password-123',
  setNewPassword: () => undefined,
  confirmPassword: 'new-password-123',
  setConfirmPassword: () => undefined,
  error: '',
  loading: false,
  success: false,
  isOpen: false,
  open: () => undefined,
  close: () => undefined,
  onSubmit: (event: Event) => event.preventDefault(),
};

export const Default: Story = {};

export const Open: Story = {
  render: () =>
    PortalChangePasswordView({
      ...baseProps,
      isOpen: true,
    }),
};

export const WithError: Story = {
  render: () =>
    PortalChangePasswordView({
      ...baseProps,
      isOpen: true,
      error: 'Passwords do not match',
      confirmPassword: 'different-password',
    }),
};

export const Success: Story = {
  render: () =>
    PortalChangePasswordView({
      ...baseProps,
      isOpen: true,
      success: true,
    }),
};
