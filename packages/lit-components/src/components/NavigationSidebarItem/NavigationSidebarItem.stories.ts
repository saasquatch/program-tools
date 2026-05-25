import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/NavigationSidebarItem',
  component: 'sql-navigation-sidebar-item',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    icon: { control: 'text' },
    path: { control: 'text' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args) => html`
    <sql-navigation-sidebar-item
      label="${args.label || 'Dashboard'}"
      icon="${args.icon || ''}"
      path="${args.path || '/dashboard'}"
      ?selected="${args.selected}"
      ?disabled="${args.disabled}"
    ></sql-navigation-sidebar-item>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Dashboard',
    path: '/dashboard',
  },
};

export const Selected: Story = {
  args: {
    label: 'Rewards',
    path: '/rewards',
    selected: true,
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Settings',
    icon: 'gear',
    path: '/settings',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Item',
    disabled: true,
  },
};

export const Group: Story = {
  render: () => html`
    <div style="width: 250px; border: 1px solid var(--sl-color-neutral-200);">
      <sql-navigation-sidebar-item label="Dashboard" icon="grid" path="/dashboard"></sql-navigation-sidebar-item>
      <sql-navigation-sidebar-item label="Rewards" icon="gift" path="/rewards" selected></sql-navigation-sidebar-item>
      <sql-navigation-sidebar-item label="Settings" icon="gear" path="/settings"></sql-navigation-sidebar-item>
      <sql-navigation-sidebar-item label="Disabled" icon="lock" path="/disabled" disabled></sql-navigation-sidebar-item>
    </div>
  `,
};
