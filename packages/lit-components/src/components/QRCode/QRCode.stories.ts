import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { QRCodeView } from './QRCodeView';

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
  title: 'Components/QRCode',
  component: 'sql-qr-code',
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number' },
    'program-id': { control: 'text' },
    'background-color': { control: 'color' },
    'foreground-color': { control: 'color' },
  },
  render: (args) => {
    setupGlobals();
    return html`<sql-qr-code
      size="${args.size || 200}"
      program-id="${args['program-id'] || ''}"
      background-color="${args['background-color'] || '#ffffff'}"
      foreground-color="${args['foreground-color'] || '#000000'}"
    ></sql-qr-code>`;
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const CustomSize: Story = {
  args: {
    size: 280,
  },
};

export const CustomColors: Story = {
  args: {
    'background-color': '#f8fafc',
    'foreground-color': '#2563eb',
  },
};

export const Loading: Story = {
  render: () => QRCodeView({ size: 200, loading: true, qrUrl: '', shareLink: '' }),
};
