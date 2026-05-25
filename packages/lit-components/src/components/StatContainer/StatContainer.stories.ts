import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const statCard = (label: string, value: string) => html`
  <div
    style="padding: 1rem; border-radius: var(--sl-border-radius-medium); background: var(--sl-color-neutral-100); text-align: center;"
  >
    <div style="font-size: 1.5rem; font-weight: 600;">${value}</div>
    <div>${label}</div>
  </div>
`;

const meta: Meta = {
  title: 'Components/StatContainer',
  component: 'sql-stat-container',
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'number' },
    gap: { control: 'text' },
    padding: { control: 'text' },
  },
  render: (args) => html`
    <sql-stat-container
      columns="${args.columns || 3}"
      gap="${args.gap || 'var(--sl-spacing-medium)'}"
      padding="${args.padding || 'var(--sl-spacing-large)'}"
    >
      ${statCard('Referrals', '24')}
      ${statCard('Rewards', '$480')}
      ${statCard('Clicks', '1.2k')}
      ${statCard('Conversion', '12%')}
    </sql-stat-container>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    columns: 3,
  },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
  },
};

export const FourColumns: Story = {
  args: {
    columns: 4,
  },
};

export const CustomGap: Story = {
  args: {
    gap: '2rem',
  },
};
