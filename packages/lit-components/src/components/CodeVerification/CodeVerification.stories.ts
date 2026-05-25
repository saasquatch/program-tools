import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { CodeVerificationView } from './CodeVerificationView';

const meta: Meta = {
  title: 'Components/CodeVerification',
  component: 'sql-code-verification',
  tags: ['autodocs'],
  argTypes: {
    'header-text': { control: 'text' },
    'description-text': { control: 'text' },
    'code-length': { control: 'number' },
    'submit-label': { control: 'text' },
    'resend-label': { control: 'text' },
  },
  render: (args) => html`
    <sql-code-verification
      header-text="${args['header-text'] || 'Enter Verification Code'}"
      description-text="${args['description-text'] || 'Enter the code we sent to your email.'}"
      code-length="${args['code-length'] || 6}"
      submit-label="${args['submit-label'] || 'Verify'}"
      resend-label="${args['resend-label'] || 'Resend Code'}"
    ></sql-code-verification>
  `,
};

export default meta;
type Story = StoryObj;

const baseProps = {
  headerText: 'Enter Verification Code',
  descriptionText: 'Enter the code we sent to your email.',
  codeLength: 6,
  submitLabel: 'Verify',
  resendLabel: 'Resend Code',
};

export const Default: Story = {};

export const WithError: Story = {
  render: () =>
    CodeVerificationView({
      ...baseProps,
      code: '123',
      error: 'Code must be 6 digits',
      loading: false,
      resent: false,
      setCode: () => {},
      onSubmit: (e: Event) => e.preventDefault(),
      onResend: () => {},
    }),
};

export const Loading: Story = {
  render: () =>
    CodeVerificationView({
      ...baseProps,
      code: '123456',
      error: '',
      loading: true,
      resent: false,
      setCode: () => {},
      onSubmit: (e: Event) => e.preventDefault(),
      onResend: () => {},
    }),
};

export const Resent: Story = {
  render: () =>
    CodeVerificationView({
      ...baseProps,
      code: '',
      error: '',
      loading: false,
      resent: true,
      setCode: () => {},
      onSubmit: (e: Event) => e.preventDefault(),
      onResend: () => {},
    }),
};
