import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { WidgetVerificationView } from './WidgetVerificationView';

const meta: Meta = {
  title: 'Components/WidgetVerification',
  component: 'sql-widget-verification',
  tags: ['autodocs'],
  argTypes: {
    'verification-type': { control: 'select', options: ['email', 'code'] },
    'header-text': { control: 'text' },
    'description-text': { control: 'text' },
  },
  render: (args) => html`
    <sql-widget-verification
      verification-type="${args['verification-type'] || 'email'}"
      header-text="${args['header-text'] || 'Verify Your Identity'}"
      description-text="${args['description-text'] || ''}"
    >
      ${(args['verification-type'] || 'email') === 'code'
        ? html`<sql-code-verification slot="verification-form"></sql-code-verification>`
        : html`<sql-email-verification slot="verification-form"></sql-email-verification>`}
    </sql-widget-verification>
  `,
};

export default meta;
type Story = StoryObj;

const baseProps = {
  verificationType: 'email' as const,
  headerText: 'Verify Your Identity',
  descriptionText: 'Choose a verification method to continue.',
};

export const Default: Story = {
  args: {
    'verification-type': 'email',
    'header-text': 'Verify Your Identity',
    'description-text': 'Choose a verification method to continue.',
  },
};

export const Verifying: Story = {
  render: () =>
    WidgetVerificationView({
      ...baseProps,
      verified: false,
      step: 'verifying',
      onVerify: () => {},
    }),
};

export const Success: Story = {
  render: () =>
    WidgetVerificationView({
      ...baseProps,
      verified: true,
      step: 'success',
      onVerify: () => {},
    }),
};

export const CodeType: Story = {
  args: {
    'verification-type': 'code',
    'header-text': 'Enter Your Verification Code',
    'description-text': 'Provide the code we sent to your email to continue.',
  },
};
