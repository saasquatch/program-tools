import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const longVerticalContent = html`
  <div style="display: grid; gap: 0.75rem;">
    ${Array.from({ length: 10 }, (_, index) => html`
      <div style="padding: 1rem; background: var(--sl-color-neutral-100); border-radius: var(--sl-border-radius-medium);">
        Scroll item ${index + 1}
      </div>
    `)}
  </div>
`;

const wideHorizontalContent = html`
  <div style="display: flex; gap: 1rem; width: max-content;">
    ${Array.from({ length: 8 }, (_, index) => html`
      <div style="min-width: 180px; padding: 1rem; background: var(--sl-color-neutral-100); border-radius: var(--sl-border-radius-medium);">
        Card ${index + 1}
      </div>
    `)}
  </div>
`;

const gridContent = html`
  <div style="display: grid; grid-template-columns: repeat(4, 180px); gap: 1rem; width: max-content;">
    ${Array.from({ length: 12 }, (_, index) => html`
      <div style="height: 120px; padding: 1rem; background: var(--sl-color-neutral-100); border-radius: var(--sl-border-radius-medium);">
        Panel ${index + 1}
      </div>
    `)}
  </div>
`;

const meta: Meta = {
  title: 'Components/Scroll',
  component: 'sql-scroll',
  tags: ['autodocs'],
  argTypes: {
    'max-height': { control: 'text' },
    'scroll-direction': { control: 'select', options: ['vertical', 'horizontal', 'both'] },
  },
  render: (args) => html`
    <sql-scroll
      max-height="${args['max-height'] || '400px'}"
      scroll-direction="${args['scroll-direction'] || 'vertical'}"
      style="display: block; max-width: 420px;"
    >
      ${args['scroll-direction'] === 'horizontal'
        ? wideHorizontalContent
        : args['scroll-direction'] === 'both'
          ? gridContent
          : longVerticalContent}
    </sql-scroll>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    'scroll-direction': 'vertical',
  },
};

export const Horizontal: Story = {
  args: {
    'scroll-direction': 'horizontal',
    'max-height': '220px',
  },
};

export const CustomHeight: Story = {
  args: {
    'max-height': '240px',
  },
};

export const BothDirections: Story = {
  args: {
    'scroll-direction': 'both',
    'max-height': '260px',
  },
};
