import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/NavigationSidebar',
  component: 'sql-navigation-sidebar',
  tags: ['autodocs'],
  argTypes: {
    header: { control: 'text' },
    'background-color': { control: 'color' },
    'border-color': { control: 'color' },
    width: { control: 'text' },
  },
  render: (args) => html`
    <div style="height: 320px;">
      <sql-navigation-sidebar
        header="${args.header || ''}"
        background-color="${args['background-color'] || ''}"
        border-color="${args['border-color'] || ''}"
        width="${args.width || '250px'}"
      ></sql-navigation-sidebar>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    width: '250px',
  },
};

export const WithHeader: Story = {
  args: {
    header: 'Navigation',
  },
};

export const CustomBackground: Story = {
  args: {
    header: 'Navigation',
    'background-color': '#f8fafc',
    'border-color': '#cbd5e1',
  },
};

export const CustomWidth: Story = {
  args: {
    header: 'Navigation',
    width: '320px',
  },
};

export const WithItems: Story = {
  render: () => html`
    <div style="height: 320px;">
      <sql-navigation-sidebar header="Navigation">
        <sql-navigation-sidebar-item label="Dashboard" icon="grid"></sql-navigation-sidebar-item>
        <sql-navigation-sidebar-item label="Rewards" icon="gift" selected></sql-navigation-sidebar-item>
        <sql-navigation-sidebar-item label="Settings" icon="gear"></sql-navigation-sidebar-item>
      </sql-navigation-sidebar>
    </div>
  `,
};
