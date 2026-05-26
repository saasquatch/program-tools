import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/DividedLayout',
  component: 'sql-divided-layout',
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['row', 'column'] },
    gap: { control: 'text' },
    'divider-color': { control: 'color' },
    'divider-width': { control: 'text' },
  },
  render: (args) => html`
    <sql-divided-layout
      direction="${args.direction || 'row'}"
      gap="${args.gap || 'var(--sl-spacing-medium)'}"
      divider-color="${args['divider-color'] || ''}"
      divider-width="${args['divider-width'] || '1px'}"
    >
      <div style="padding: 1rem; background: var(--sl-color-neutral-100);">First section</div>
      <div style="padding: 1rem; background: var(--sl-color-neutral-100);">Second section</div>
      <div style="padding: 1rem; background: var(--sl-color-neutral-100);">Third section</div>
    </sql-divided-layout>
  `,
};

export default meta;
type Story = StoryObj;

export const Horizontal: Story = {
  args: {
    direction: 'row',
  },
};

export const Vertical: Story = {
  args: {
    direction: 'column',
  },
};

export const CustomGap: Story = {
  args: {
    gap: '2rem',
  },
};

export const CustomDivider: Story = {
  args: {
    'divider-color': '#6366f1',
    'divider-width': '2px',
  },
};
