import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { RewardExchangeListView } from './RewardExchangeListView';

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
  title: 'Components/RewardExchangeList',
  component: 'sql-reward-exchange-list',
  tags: ['autodocs'],
  argTypes: {
    'header-text': { control: 'text' },
    'empty-text': { control: 'text' },
    'program-id': { control: 'text' },
  },
  render: (args) => {
    setupGlobals();
    return html`<sql-reward-exchange-list
      header-text="${args['header-text'] || 'Redeem Rewards'}"
      empty-text="${args['empty-text'] || 'No rewards available to redeem'}"
      program-id="${args['program-id'] || ''}"
    ></sql-reward-exchange-list>`;
  },
};

export default meta;
type Story = StoryObj;

const baseProps = {
  headerText: 'Redeem Rewards',
  emptyText: 'No rewards available to redeem',
};

export const Default: Story = {};

export const Loading: Story = {
  render: () =>
    RewardExchangeListView({
      ...baseProps,
      exchanges: [],
      currentBalance: '0',
      loading: true,
      empty: false,
    }),
};

export const Empty: Story = {
  render: () =>
    RewardExchangeListView({
      ...baseProps,
      exchanges: [],
      currentBalance: '0',
      loading: false,
      empty: true,
    }),
};

export const WithExchanges: Story = {
  render: () =>
    RewardExchangeListView({
      ...baseProps,
      currentBalance: '$75',
      loading: false,
      empty: false,
      exchanges: [
        {
          id: '1',
          name: 'Coffee Gift Card',
          description: 'Enjoy your favorite drink on us.',
          imageUrl:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=200&q=80',
          costPrettyValue: '$10',
          costValue: 10,
          available: true,
        },
        {
          id: '2',
          name: 'Swag Pack',
          description: 'T-shirt, stickers, and a notebook.',
          imageUrl:
            'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80',
          costPrettyValue: '$25',
          costValue: 25,
          available: false,
        },
      ],
    }),
};
