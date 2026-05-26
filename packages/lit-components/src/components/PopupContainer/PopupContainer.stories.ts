import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/PopupContainer',
  component: 'sql-popup-container',
  tags: ['autodocs'],
  argTypes: {
    'popup-title': { control: 'text' },
    'show-close-button': { control: 'boolean' },
    'overlay-color': { control: 'text' },
    'max-width': { control: 'text' },
    padding: { control: 'text' },
  },
  render: (args) => html`
    <sql-popup-container
      popup-title="${args['popup-title'] || ''}"
      ?show-close-button="${args['show-close-button'] ?? true}"
      overlay-color="${args['overlay-color'] || 'rgba(0, 0, 0, 0.5)'}"
      max-width="${args['max-width'] || '600px'}"
      padding="${args.padding || 'var(--sl-spacing-large)'}"
    >
      <p>This is popup content rendered inside the container.</p>
      <p>You can place any slotted content here.</p>
    </sql-popup-container>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {},
};

export const WithTitle: Story = {
  args: {
    'popup-title': 'Rewards Details',
  },
};

export const NoCloseButton: Story = {
  args: {
    'popup-title': 'Popup Without Close Button',
    'show-close-button': false,
  },
};

export const CustomWidth: Story = {
  args: {
    'popup-title': 'Wide Popup',
    'max-width': '800px',
  },
};

export const CustomOverlay: Story = {
  args: {
    'popup-title': 'Custom Overlay',
    'overlay-color': 'rgba(99, 102, 241, 0.35)',
  },
};
