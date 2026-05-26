import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/ReferralCard',
  component: 'sql-referral-card',
  tags: ['autodocs'],
  argTypes: {
    padding: { control: 'select', options: ['none', 'small', 'medium', 'large'] },
    'background-color': { control: 'color' },
    'border-color': { control: 'color' },
    'border-radius': { control: 'number' },
  },
  render: (args) =>
    html`<sql-referral-card
      padding="${args.padding || 'medium'}"
      background-color="${args['background-color'] || ''}"
      border-color="${args['border-color'] || ''}"
      border-radius="${args['border-radius'] || ''}"
    >
      <div>
        <h3 style="margin-top: 0;">Referral Card</h3>
        <p style="margin-bottom: 0;">Use this card to wrap referral content.</p>
      </div>
    </sql-referral-card>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const CustomPadding: Story = {
  args: {
    padding: 'large',
  },
};

export const CustomColors: Story = {
  args: {
    'background-color': '#f8fafc',
    'border-color': '#cbd5e1',
  },
};

export const NoBorder: Story = {
  args: {
    'border-color': 'transparent',
  },
};

export const Rounded: Story = {
  args: {
    'border-radius': 24,
  },
};
