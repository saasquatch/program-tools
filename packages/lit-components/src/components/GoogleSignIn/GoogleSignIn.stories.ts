import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/GoogleSignIn',
  component: 'sql-google-sign-in',
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'select',
      options: ['signup_with', 'signin_with', 'continue_with', 'signin'],
    },
    'client-id': { control: 'text' },
  },
  render: (args) => html`
    <sql-google-sign-in
      text="${args.text || 'signup_with'}"
      client-id="${args['client-id'] || ''}"
    ></sql-google-sign-in>
  `,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SignIn: Story = {
  args: {
    text: 'signin_with',
  },
};

export const Continue: Story = {
  args: {
    text: 'continue_with',
  },
};
