import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/TableCell',
  component: 'sql-table-cell',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="display: table; width: 100%; border: 1px solid var(--sl-color-neutral-200);">
      <div style="display: table-row;">
        <sql-table-cell
          alignment="${args.alignment || 'left'}"
          width="${args.width || ''}"
          font-weight="${args.fontWeight || 'normal'}"
        >
          Example cell content
        </sql-table-cell>
      </div>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    alignment: 'left',
    fontWeight: 'normal',
  },
};

export const CenterAligned: Story = {
  args: {
    alignment: 'center',
  },
};

export const RightAligned: Story = {
  args: {
    alignment: 'right',
  },
};

export const CustomWidth: Story = {
  args: {
    width: '240px',
    fontWeight: '600',
  },
};
