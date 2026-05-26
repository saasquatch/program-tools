import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { UI } from '../../ui';
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
      ${UI.Button({ variant: 'text', children: 'Overview' })}
      ${UI.Button({ variant: 'text', children: 'Rewards' })}
      ${UI.Button({ variant: 'text', children: 'History' })}
    </sql-navigation-menu>
  `,
};

export const DropdownStyle: Story = {
  render: () => html`
    <sql-navigation-menu menu-style="dropdown">
      ${UI.MenuItem({ children: 'Overview' })}
      ${UI.MenuItem({ children: 'Rewards' })}
      ${UI.MenuItem({ children: 'History' })}
    </sql-navigation-menu>
  `,
};
