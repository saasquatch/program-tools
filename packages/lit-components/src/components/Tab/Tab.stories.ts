import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/Tab',
  component: 'sql-tab',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <sql-tabs>
      <sql-tab header="Overview">Overview tab content</sql-tab>
      <sql-tab header="Rewards">Rewards tab content</sql-tab>
    </sql-tabs>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <sql-tabs>
      <sql-tab header="Overview">Overview tab content</sql-tab>
      <sql-tab header="Rewards" disabled>Rewards tab content</sql-tab>
    </sql-tabs>
  `,
};
