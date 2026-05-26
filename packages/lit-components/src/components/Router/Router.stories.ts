import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { UI } from '../../ui';
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
          ${UI.Button({ onClick: () => document.dispatchEvent(new CustomEvent('sq:navigate', { detail: { path: '/overview' } })), children: 'Overview' })}
          ${UI.Button({ onClick: () => document.dispatchEvent(new CustomEvent('sq:navigate', { detail: { path: '/rewards' } })), children: 'Rewards' })}
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
