import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/FormMessage',
  component: 'sql-form-message',
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['success', 'error', 'warning', 'info'] },
    message: { control: 'text' },
    icon: { control: 'text' },
    closable: { control: 'boolean' },
  },
  render: (args) => html`
    <sql-form-message
      type="${args.type || 'info'}"
      message="${args.message || 'Helpful information for the user.'}"
      icon="${args.icon || ''}"
      ?closable="${args.closable}"
    ></sql-form-message>
  `,
};

export default meta;
type Story = StoryObj;

export const InfoMessage: Story = {
  args: {
    type: 'info',
    message: 'Helpful information for the user.',
  },
};

export const SuccessMessage: Story = {
  args: {
    type: 'success',
    message: 'Your changes were saved successfully.',
  },
};

export const ErrorMessage: Story = {
  args: {
    type: 'error',
    message: 'Something went wrong while saving.',
  },
};

export const WarningMessage: Story = {
  args: {
    type: 'warning',
    message: 'Please review the highlighted fields.',
  },
};

export const Closable: Story = {
  args: {
    type: 'info',
    message: 'This message can be dismissed.',
    closable: true,
  },
};

export const WithCustomIcon: Story = {
  args: {
    type: 'success',
    message: 'Custom icon applied to the alert.',
    icon: 'check2-circle',
  },
};
