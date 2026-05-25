import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/Hero',
  component: 'sql-hero',
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'number' },
    'min-height': { control: 'text' },
    background: { control: 'text' },
    'secondary-background': { control: 'text' },
    'padding-size': { control: 'select', options: ['none', 'small', 'medium', 'large', 'x-large', 'xx-large'] },
    'wrap-direction': { control: 'select', options: ['', 'reverse'] },
    'column-to-hide-in-mobile': { control: 'number' },
  },
  render: (args) => html`
    <sql-hero
      columns="${args.columns || 2}"
      min-height="${args['min-height'] || '320px'}"
      background="${args.background || '#f8fafc'}"
      secondary-background="${args['secondary-background'] || '#e2e8f0'}"
      padding-size="${args['padding-size'] || 'large'}"
      wrap-direction="${args['wrap-direction'] || ''}"
      column-to-hide-in-mobile="${args['column-to-hide-in-mobile'] || 0}"
    >
      <div slot="1" style="display: grid; gap: var(--sl-spacing-small); max-width: 28rem;">
        <h1 style="margin: 0;">Grow faster with referrals</h1>
        <p style="margin: 0;">Launch a branded referral campaign in minutes.</p>
        <sl-button variant="primary">Get started</sl-button>
      </div>
      ${Number(args.columns || 2) === 2
        ? html`
            <div slot="2" style="display: grid; gap: var(--sl-spacing-small); max-width: 24rem;">
              <h2 style="margin: 0;">Built for teams</h2>
              <p style="margin: 0;">Combine acquisition, engagement, and rewards in one experience.</p>
            </div>
          `
        : ''}
    </sql-hero>
  `,
};

export default meta;
type Story = StoryObj;

export const OneColumn: Story = {
  args: {
    columns: 1,
    background: 'linear-gradient(135deg, #dbeafe, #eff6ff)',
  },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
  },
};

export const CustomBackground: Story = {
  args: {
    background: 'linear-gradient(135deg, #0f172a, #1d4ed8)',
    'secondary-background': 'linear-gradient(135deg, #ffffff, #dbeafe)',
  },
};

export const CustomPadding: Story = {
  args: {
    'padding-size': 'xx-large',
  },
};

export const WrapReverse: Story = {
  args: {
    'wrap-direction': 'reverse',
  },
};

export const HideColumnOnMobile: Story = {
  args: {
    'column-to-hide-in-mobile': 2,
  },
};
