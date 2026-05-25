import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/ContextRouter',
  component: 'sql-context-router',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const EmbedContext: Story = {
  render: () => {
    // @ts-expect-error story globals
    window.widgetIdent = { engagementMedium: 'EMBED' };
    return html`
      <sql-context-router>
        <p slot="embed">Embed content</p>
        <p>Shared fallback content</p>
      </sql-context-router>
    `;
  },
};

export const PopupContext: Story = {
  render: () => {
    // @ts-expect-error story globals
    window.widgetIdent = { engagementMedium: 'POPUP' };
    return html`
      <sql-context-router>
        <p slot="popup">Popup content</p>
        <p>Shared fallback content</p>
      </sql-context-router>
    `;
  },
};
