import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/Route',
  component: 'sql-route',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    window.location.hash = '#/overview/details';

    return html`
      <sql-route path="/overview">
        <p>Visible when the path starts with /overview</p>
      </sql-route>
    `;
  },
};

export const ExactMatch: Story = {
  render: () => {
    window.location.hash = '#/overview';

    return html`
      <sql-route path="/overview" exact>
        <p>Visible only when the path exactly matches /overview</p>
      </sql-route>
    `;
  },
};
