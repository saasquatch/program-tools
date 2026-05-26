import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/PayoutButtonScroll',
  component: 'sql-payout-button-scroll',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <sql-payout-button-scroll
        button-text="${args.buttonText || 'Cash Out'}"
        scroll-target-id="payout-target"
        ?disabled="${args.disabled}"
      ></sql-payout-button-scroll>
      <div id="payout-target" style="padding: 16px; border: 1px solid var(--sl-color-neutral-200);">
        Scroll target
      </div>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    buttonText: 'Cash Out',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    buttonText: 'Cash Out',
    disabled: true,
  },
};

export const CustomText: Story = {
  args: {
    buttonText: 'Request Payout',
    disabled: false,
  },
};
