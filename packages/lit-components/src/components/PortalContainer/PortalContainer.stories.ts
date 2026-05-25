import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/PortalContainer',
  component: 'sql-portal-container',
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['row', 'column'] },
    padding: { control: 'select', options: ['none', 'small', 'medium', 'large', 'x-large', 'xx-large'] },
    gap: { control: 'select', options: ['none', 'small', 'medium', 'large', 'x-large'] },
    'max-width': { control: 'text' },
    display: { control: 'select', options: ['flex', 'grid'] },
    'grid-columns': { control: 'text' },
  },
  render: (args) => html`
    <sql-portal-container
      direction="${args.direction || 'column'}"
      padding="${args.padding || 'none'}"
      gap="${args.gap || 'none'}"
      max-width="${args['max-width'] || ''}"
      display="${args.display || 'flex'}"
      grid-columns="${args['grid-columns'] || '1fr'}"
    >
      <div style="padding: 12px; background: var(--sl-color-neutral-100); border-radius: 8px;">Item 1</div>
      <div style="padding: 12px; background: var(--sl-color-neutral-100); border-radius: 8px;">Item 2</div>
      <div style="padding: 12px; background: var(--sl-color-neutral-100); border-radius: 8px;">Item 3</div>
    </sql-portal-container>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithPadding: Story = {
  args: {
    padding: 'large',
  },
};

export const WithGap: Story = {
  args: {
    gap: 'medium',
  },
};

export const GridLayout: Story = {
  args: {
    display: 'grid',
    gap: 'medium',
    'grid-columns': 'repeat(3, minmax(0, 1fr))',
  },
};

export const MaxWidth: Story = {
  args: {
    'max-width': '640px',
    padding: 'medium',
    gap: 'medium',
  },
};

export const Row: Story = {
  args: {
    direction: 'row',
    gap: 'medium',
  },
};
