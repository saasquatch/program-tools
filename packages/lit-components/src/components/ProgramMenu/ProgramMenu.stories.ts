import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { ProgramMenuView } from './ProgramMenuView';

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
  title: 'Components/ProgramMenu',
  component: 'sql-program-menu',
  tags: ['autodocs'],
  argTypes: {
    'program-id': { control: 'text' },
  },
  render: (args) => {
    setupGlobals();
    return html`<sql-program-menu program-id="${args['program-id'] || ''}"></sql-program-menu>`;
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Loading: Story = {
  render: () =>
    ProgramMenuView({
      programId: '41863',
      programs: [],
      selected: '41863',
      loading: true,
      onSelect: () => undefined,
    }),
};

export const WithPrograms: Story = {
  render: () =>
    ProgramMenuView({
      programId: '41863',
      selected: '41863',
      loading: false,
      onSelect: () => undefined,
      programs: [
        { programId: '41863', program: { name: 'Advocate Program' } },
        { programId: '51234', program: { name: 'VIP Rewards' } },
        { programId: '92345', program: { name: 'Partner Referrals' } },
      ],
    }),
};
