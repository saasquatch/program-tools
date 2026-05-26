import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/PortalFrame',
  component: 'sql-portal-frame',
  tags: ['autodocs'],
  argTypes: {
    'max-width': { control: 'text' },
    'background-color': { control: 'color' },
    'show-border': { control: 'boolean' },
    'border-color': { control: 'color' },
  },
  render: (args) => html`
    <sql-portal-frame
      max-width="${args['max-width'] || '800px'}"
      background-color="${args['background-color'] || ''}"
      ?show-border="${args['show-border'] ?? true}"
      border-color="${args['border-color'] || ''}"
    >
      <div slot="header" style="padding: 16px; font-weight: 600;">Portal Header</div>
      <div style="padding: 16px; background: var(--sl-color-neutral-100); border-radius: 8px;">
        Main content goes here.
      </div>
      <div slot="footer" style="padding: 16px;">Portal Footer</div>
    </sql-portal-frame>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const CustomWidth: Story = {
  args: {
    'max-width': '1024px',
  },
};

export const CustomBackground: Story = {
  args: {
    'background-color': '#f8fafc',
  },
};

export const NoBorder: Story = {
  args: {
    'show-border': false,
  },
};

export const WithHeaderAndFooter: Story = {};
