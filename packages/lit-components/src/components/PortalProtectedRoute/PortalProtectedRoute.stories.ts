import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const setAuthGlobals = (authenticated: boolean) => {
  if (authenticated) {
    // @ts-expect-error story globals
    window.squatchToken = 'demo-token';
    // @ts-expect-error story globals
    window.widgetIdent = { token: 'demo-token' };
  } else {
    // @ts-expect-error story globals
    delete window.squatchToken;
    // @ts-expect-error story globals
    window.widgetIdent = {};
  }
};

const meta: Meta = {
  title: 'Components/PortalProtectedRoute',
  component: 'sql-portal-protected-route',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Authenticated: Story = {
  render: () => {
    setAuthGlobals(true);
    return html`
      <sql-portal-protected-route redirect-url="/login">
        <p>Protected content</p>
      </sql-portal-protected-route>
    `;
  },
};

export const Unauthenticated: Story = {
  render: () => {
    setAuthGlobals(false);
    return html`
      <sql-portal-protected-route redirect-url="/login">
        <p>Protected content</p>
      </sql-portal-protected-route>
    `;
  },
};
