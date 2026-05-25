import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/Brand',
  component: 'sql-brand',
  tags: ['autodocs'],
  argTypes: {
    'brand-color': { control: 'color' },
    'brand-font': { control: 'text' },
  },
  render: (args) => html`
    <sql-brand brand-color="${args['brand-color'] || ''}" brand-font="${args['brand-font'] || 'Nunito Sans'}">
      <div style="display: grid; gap: var(--sl-spacing-medium); padding: var(--sl-spacing-large);">
        <h2 style="margin: 0;">Brand your referral experience</h2>
        <p style="margin: 0;">Adjust the font family and primary brand color for slotted content.</p>
        <sl-button variant="primary">Primary action</sl-button>
        <sl-input label="Email address" placeholder="name@example.com"></sl-input>
      </div>
    </sql-brand>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const CustomBrandColor: Story = {
  args: {
    'brand-color': '#7c3aed',
  },
};

export const CustomFont: Story = {
  args: {
    'brand-font': 'Roboto',
  },
};

export const BothCustomized: Story = {
  args: {
    'brand-color': '#0f766e',
    'brand-font': 'Poppins',
  },
};
