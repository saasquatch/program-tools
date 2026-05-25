import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/LogoutCurrentUser',
  component: 'sql-logout-current-user',
  tags: ['autodocs'],
  argTypes: {
    'button-text': { control: 'text' },
    'button-type': { control: 'select', options: ['primary', 'secondary', 'danger', 'text'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
  render: (args) =>
    html`<sql-logout-current-user
      button-text="${args['button-text'] || 'Logout'}"
      button-type="${args['button-type'] || 'text'}"
      size="${args.size || 'medium'}"
    ></sql-logout-current-user>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    'button-type': 'primary',
  },
};

export const Danger: Story = {
  args: {
    'button-type': 'danger',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};
