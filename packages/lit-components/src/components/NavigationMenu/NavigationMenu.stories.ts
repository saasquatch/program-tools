import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/NavigationMenu',
  component: 'sql-navigation-menu',
  tags: ['autodocs'],
  argTypes: {
    'menu-style': { control: 'select', options: ['tabs', 'dropdown'] },
  },
};

export default meta;
type Story = StoryObj;

export const TabsStyle: Story = {
  render: () => html`
    <sql-navigation-menu menu-style="tabs">
      <sl-button variant="text">Overview</sl-button>
      <sl-button variant="text">Rewards</sl-button>
      <sl-button variant="text">History</sl-button>
    </sql-navigation-menu>
  `,
};

export const DropdownStyle: Story = {
  render: () => html`
    <sql-navigation-menu menu-style="dropdown">
      <sl-menu-item>Overview</sl-menu-item>
      <sl-menu-item>Rewards</sl-menu-item>
      <sl-menu-item>History</sl-menu-item>
    </sql-navigation-menu>
  `,
};
