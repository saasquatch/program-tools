import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/Router',
  component: 'sql-router',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    window.location.hash = '#/overview';

    return html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 8px;">
          <sl-button @click="${() => document.dispatchEvent(new CustomEvent('sq:navigate', { detail: { path: '/overview' } }))}">
            Overview
          </sl-button>
          <sl-button @click="${() => document.dispatchEvent(new CustomEvent('sq:navigate', { detail: { path: '/rewards' } }))}">
            Rewards
          </sl-button>
        </div>
        <sql-router>
          <sql-route path="/overview" exact>
            <p>Overview route content</p>
          </sql-route>
          <sql-route path="/rewards" exact>
            <p>Rewards route content</p>
          </sql-route>
        </sql-router>
      </div>
    `;
  },
};
