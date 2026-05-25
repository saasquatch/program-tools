import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/TextSpan',
  component: 'sql-text-span',
  tags: ['autodocs'],
  argTypes: {
    'font-size': { control: 'number' },
    'text-color': { control: 'color' },
    'font-weight': { control: 'number' },
  },
  render: (args) =>
    html`<sql-text-span
      font-size="${args['font-size'] || ''}"
      text-color="${args['text-color'] || ''}"
      font-weight="${args['font-weight'] || ''}"
    >
      ${args.content || 'Inline text span'}
    </sql-text-span>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    content: 'Inline text span',
  },
};

export const CustomSize: Story = {
  args: {
    'font-size': 20,
    content: 'Larger inline text',
  },
};

export const CustomColor: Story = {
  args: {
    'text-color': '#2563eb',
    content: 'Colored inline text',
  },
};

export const Bold: Story = {
  args: {
    'font-weight': 700,
    content: 'Bold inline text',
  },
};
