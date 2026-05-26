import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/Tabs',
  component: 'sql-tabs',
  tags: ['autodocs'],
  render: () => html`
    <sql-tabs>
      <sql-tab header="Overview">Overview content</sql-tab>
      <sql-tab header="Rewards">Rewards content</sql-tab>
    </sql-tabs>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithMultipleTabs: Story = {
  render: () => html`
    <sql-tabs>
      <sql-tab header="Overview">Overview content</sql-tab>
      <sql-tab header="Rewards">Rewards content</sql-tab>
      <sql-tab header="History">History content</sql-tab>
    </sql-tabs>
  `,
};
