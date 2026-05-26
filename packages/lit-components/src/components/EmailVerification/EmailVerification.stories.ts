import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { EmailVerificationView } from './EmailVerificationView';

const meta: Meta = {
  title: 'Components/EmailVerification',
  component: 'sql-email-verification',
  tags: ['autodocs'],
  argTypes: {
    'header-text': { control: 'text' },
    'description-text': { control: 'text' },
    'resend-label': { control: 'text' },
    'success-text': { control: 'text' },
  },
  render: (args) => html`
    <sql-email-verification
      header-text="${args['header-text'] || 'Check Your Email'}"
      description-text="${
        args['description-text'] ||
        "We've sent a verification email. Click the link to verify."
      }"
      resend-label="${args['resend-label'] || 'Resend Email'}"
      success-text="${args['success-text'] || 'Verified!'}"
    ></sql-email-verification>
  `,
};

export default meta;
type Story = StoryObj;

const baseProps = {
  headerText: 'Check Your Email',
  descriptionText: "We've sent a verification email. Click the link to verify.",
  resendLabel: 'Resend Email',
  successText: 'Verified!',
};

export const Default: Story = {};

export const Resent: Story = {
  render: () =>
    EmailVerificationView({
      ...baseProps,
      resent: true,
      loading: false,
      onResend: () => {},
    }),
};
