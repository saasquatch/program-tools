import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { PortalEmailVerificationView } from './PortalEmailVerificationView';

const meta: Meta = {
  title: 'Components/PortalEmailVerification',
  component: 'sql-portal-email-verification',
  tags: ['autodocs'],
  argTypes: {
    'header-text': { control: 'text' },
    'description-text': { control: 'text' },
    'resend-text': { control: 'text' },
    'success-text': { control: 'text' },
    'redirect-url': { control: 'text' },
  },
  render: (args) => html`
    <sql-portal-email-verification
      header-text="${args['header-text'] || 'Verify Your Email'}"
      description-text="${
        args['description-text'] || "We've sent a verification link to your email."
      }"
      resend-text="${args['resend-text'] || 'Resend verification email'}"
      success-text="${args['success-text'] || 'Email verified successfully!'}"
      redirect-url="${args['redirect-url'] || ''}"
    ></sql-portal-email-verification>
  `,
};

export default meta;
type Story = StoryObj;

const baseProps = {
  headerText: 'Verify Your Email',
  descriptionText: "We've sent a verification link to your email.",
  resendText: 'Resend verification email',
  successText: 'Email verified successfully!',
};

export const Default: Story = {};

export const Verified: Story = {
  render: () =>
    PortalEmailVerificationView({
      ...baseProps,
      verified: true,
      token: 'demo-token',
      resent: false,
      loading: false,
      onResend: async () => {},
    }),
};

export const Resent: Story = {
  render: () =>
    PortalEmailVerificationView({
      ...baseProps,
      verified: false,
      token: '',
      resent: true,
      loading: false,
      onResend: async () => {},
    }),
};

export const Loading: Story = {
  render: () =>
    PortalEmailVerificationView({
      ...baseProps,
      verified: false,
      token: '',
      resent: false,
      loading: true,
      onResend: async () => {},
    }),
};
