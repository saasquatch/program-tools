import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { ReferralIframeView } from './ReferralIframeView';

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
  title: 'Components/ReferralIframe',
  component: 'sql-referral-iframe',
  tags: ['autodocs'],
  argTypes: {
    'iframe-url': { control: 'text' },
    'iframe-width': { control: 'text' },
    'iframe-height': { control: 'text' },
    'program-id': { control: 'text' },
  },
  render: (args) => {
    setupGlobals();
    return html`<sql-referral-iframe
      iframe-url="${args['iframe-url'] || 'https://example.com/referral'}"
      iframe-width="${args['iframe-width'] || '100%'}"
      iframe-height="${args['iframe-height'] || '400px'}"
      program-id="${args['program-id'] || ''}"
    ></sql-referral-iframe>`;
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const CustomSize: Story = {
  args: {
    'iframe-width': '100%',
    'iframe-height': '500px',
  },
};

export const Loading: Story = {
  render: () =>
    ReferralIframeView({
      iframeUrl: 'https://example.com/referral',
      iframeWidth: '100%',
      iframeHeight: '400px',
      url: '',
      loading: true,
    }),
};
