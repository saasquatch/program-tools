import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { ReferralCodesView } from './ReferralCodesView';

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
  title: 'Components/ReferralCodes',
  component: 'sql-referral-codes',
  tags: ['autodocs'],
  render: () => {
    setupGlobals();
    return html`
      <sql-referral-codes>
        <sql-referral-code></sql-referral-code>
        <sql-referral-code copy-button-style="button-outside"></sql-referral-code>
      </sql-referral-codes>
    `;
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Loading: Story = {
  render: () => ReferralCodesView({ loading: true, codes: [] }),
};

export const Empty: Story = {
  render: () => ReferralCodesView({ loading: false, codes: [] }),
};
