import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { UserNameView } from './UserNameView';

const setupGlobals = () => {
  // @ts-expect-error setup globals
  window.squatchTenant = 'ac52kfybp1tkr';
  // @ts-expect-error setup globals
  window.squatchConfig = {
    domain: 'https://staging.referralsaasquatch.com',
  };
  // @ts-expect-error setup globals
  window.squatchToken = '******';
  // @ts-expect-error setup globals
  window.widgetIdent = {
    programId: '41863',
    userId: 'testuser',
    accountId: 'testuser',
    token: '******',
    tenantAlias: 'ac52kfybp1tkr',
    engagementMedium: 'EMBED',
    appDomain: 'https://staging.referralsaasquatch.com',
  };
};

const meta: Meta = {
  title: 'Components/UserName',
  component: 'sql-user-name',
  tags: ['autodocs'],
  argTypes: {
    'fallback-text': { control: 'text' },
  },
  render: (args) => {
    setupGlobals();
    return html`<sql-user-name
      fallback-text="${args['fallback-text'] || 'Anonymous'}"
    ></sql-user-name>`;
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Loading: Story = {
  render: () => UserNameView({ fallbackText: 'Anonymous', displayName: '', loading: true }),
};

export const WithFallback: Story = {
  render: () =>
    UserNameView({ fallbackText: 'Anonymous', displayName: 'Anonymous', loading: false }),
};
