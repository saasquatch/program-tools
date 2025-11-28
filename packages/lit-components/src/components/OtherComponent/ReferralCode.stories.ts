import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/ReferralCode',
  component: 'sql-referral-code',
  tags: ['autodocs'],
  argTypes: {},
  render: () => {
    window.squatchTenant = 'ac52kfybp1tkr';
    window.squatchConfig = {
      domain: 'https://staging.referralsaasquatch.com',
    };
    window.squatchToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoidGVzdHVzZXIiLCJhY2NvdW50SWQiOiJ0ZXN0dXNlciIsImVtYWlsIjoidGVzdHVzZXJAZXhhbXBsZS5jb20ifX0.tegzTaLms4g47rwcWoyhk1WW4hqB16PulQV9zouJNfU';
    window.widgetIdent = {
      programId: '41863',
      userId: 'testuser',
      accountId: 'testuser',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoidGVzdHVzZXIiLCJhY2NvdW50SWQiOiJ0ZXN0dXNlciIsImVtYWlsIjoidGVzdHVzZXJAZXhhbXBsZS5jb20ifX0.tegzTaLms4g47rwcWoyhk1WW4hqB16PulQV9zouJNfU',
      tenantAlias: 'ac52kfybp1tkr',
      engagementMedium: 'EMBED',
      appDomain: 'https://staging.referralsaasquatch.com',
    };
    return html`<sql-referral-code></sql-referral-code>`;
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default referral code component
 */
export const Default: Story = {
  args: {},
};
