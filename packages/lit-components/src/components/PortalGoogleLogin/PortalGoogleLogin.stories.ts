import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/PortalGoogleLogin',
  component: 'sql-portal-google-login',
  tags: ['autodocs'],
  render: (args) => html`
    <sql-portal-google-login
      button-text="${args['button-text'] || 'Sign in with Google'}"
      client-id="${args['client-id'] || ''}"
      size="${args.size || 'medium'}"
    ></sql-portal-google-login>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const CustomText: Story = {
  args: {
    'button-text': 'Continue with Google',
  },
};
