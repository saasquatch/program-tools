import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/TableRow',
  component: 'sql-table-row',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="width: 100%; border: 1px solid var(--sl-color-neutral-200);">
      <sql-table-row ?highlighted="${args.highlighted}">
        <div style="padding: var(--sl-spacing-small) var(--sl-spacing-medium); flex: 1;">Taylor Smith</div>
        <div style="padding: var(--sl-spacing-small) var(--sl-spacing-medium); flex: 1;">$25.00</div>
        <div style="padding: var(--sl-spacing-small) var(--sl-spacing-medium); flex: 1;">Converted</div>
      </sql-table-row>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    highlighted: false,
  },
};

export const Highlighted: Story = {
  args: {
    highlighted: true,
  },
};
