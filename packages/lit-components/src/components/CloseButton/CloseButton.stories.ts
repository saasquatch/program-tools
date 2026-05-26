import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/CloseButton',
  component: 'sql-close-button',
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
  render: (args) => html`
    <sql-close-button size="${args.size || 'medium'}"></sql-close-button>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};
