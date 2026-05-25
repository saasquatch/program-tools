import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { PortalForgotPasswordView } from './PortalForgotPasswordView';

const meta: Meta = {
  title: 'Components/PortalForgotPassword',
  component: 'sql-portal-forgot-password',
  tags: ['autodocs'],
  argTypes: {
    'email-label': { control: 'text' },
    'submit-label': { control: 'text' },
    'back-label': { control: 'text' },
    'header-text': { control: 'text' },
    'description-text': { control: 'text' },
    'success-message': { control: 'text' },
  },
  render: (args) => html`
    <sql-portal-forgot-password
      email-label="${args['email-label'] || 'Email'}"
      submit-label="${args['submit-label'] || 'Send Reset Link'}"
      back-label="${args['back-label'] || 'Back to Login'}"
      header-text="${args['header-text'] || 'Forgot Password'}"
      description-text="${args['description-text'] || "Enter your email and we'll send you a reset link."}"
      success-message="${args['success-message'] || 'Check your email for a reset link.'}"
    ></sql-portal-forgot-password>
  `,
};

export default meta;
type Story = StoryObj;

const baseProps = {
  emailLabel: 'Email',
  submitLabel: 'Send Reset Link',
  backLabel: 'Back to Login',
  headerText: 'Forgot Password',
  descriptionText: "Enter your email and we'll send you a reset link.",
  successMessage: 'Check your email for a reset link.',
  email: 'jane@example.com',
  setEmail: () => undefined,
  error: '',
  loading: false,
  success: false,
  onSubmit: (event: Event) => event.preventDefault(),
  onBack: () => undefined,
};

export const Default: Story = {};

export const WithError: Story = {
  render: () =>
    PortalForgotPasswordView({
      ...baseProps,
      error: 'Email is required',
      email: '',
    }),
};

export const Success: Story = {
  render: () =>
    PortalForgotPasswordView({
      ...baseProps,
      success: true,
    }),
};

export const CustomLabels: Story = {
  args: {
    'email-label': 'Work Email',
    'submit-label': 'Email Me a Reset Link',
    'back-label': 'Return to sign in',
    'header-text': 'Reset your password',
    'description-text': 'Share your email address to receive a secure reset link.',
    'success-message': 'Reset instructions have been sent.',
  },
};
