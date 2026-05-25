import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '../../index';
import { PortalVerifyEmailView } from './PortalVerifyEmailView';

const meta: Meta = {
  title: 'Components/PortalVerifyEmail',
  component: 'sql-portal-verify-email',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const baseProps = {
  verifyingText: 'Verifying your email...',
  successText: 'Email verified! Redirecting...',
  errorText: 'Verification failed. Please try again.',
  redirectUrl: '/',
  token: 'demo-token',
};

export const Verifying: Story = {
  render: () => PortalVerifyEmailView({ ...baseProps, status: 'verifying' }),
};

export const Success: Story = {
  render: () => PortalVerifyEmailView({ ...baseProps, status: 'success' }),
};

export const Error: Story = {
  render: () => PortalVerifyEmailView({ ...baseProps, status: 'error' }),
};
