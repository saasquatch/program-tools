import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { BigStatView } from './BigStatView';

const setupGlobals = () => {
  // @ts-expect-error setup globals
  window.squatchTenant = 'ac52kfybp1tkr';
  // @ts-expect-error setup globals
  window.squatchConfig = {
    domain: 'https://staging.referralsaasquatch.com',
  };
  // @ts-expect-error setup globals
  window.squatchToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoidGVzdHVzZXIiLCJhY2NvdW50SWQiOiJ0ZXN0dXNlciIsImVtYWlsIjoidGVzdHVzZXJAZXhhbXBsZS5jb20ifX0.tegzTaLms4g47rwcWoyhk1WW4hqB16PulQV9zouJNfU';
  // @ts-expect-error setup globals
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
};

const meta: Meta = {
  title: 'Components/BigStat',
  component: 'sql-big-stat',
  tags: ['autodocs'],
  argTypes: {
    'stat-type': { control: 'text' },
    'flex-reverse': { control: 'boolean' },
    alignment: { control: 'select', options: ['left', 'center', 'right'] },
    'program-id': { control: 'text' },
    'stat-text-color': { control: 'color' },
    'stat-font-size': { control: 'number' },
    'stat-font-weight': { control: 'number' },
    'description-text-color': { control: 'color' },
    'description-font-size': { control: 'number' },
    content: { control: 'text' },
  },
  render: (args) => {
    setupGlobals();
    return html`<sql-big-stat
      stat-type="${args['stat-type'] || '/referralsCount'}"
      ?flex-reverse="${args['flex-reverse']}"
      alignment="${args.alignment || 'center'}"
      program-id="${args['program-id'] || '41863'}"
      stat-text-color="${args['stat-text-color'] || ''}"
      stat-font-size="${args['stat-font-size'] || ''}"
      stat-font-weight="${args['stat-font-weight'] || ''}"
      description-text-color="${args['description-text-color'] || ''}"
      description-font-size="${args['description-font-size'] || ''}"
    >
      <p>${args.content || 'Referrals'}</p>
    </sql-big-stat>`;
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    'stat-type': '/referralsCount',
    alignment: 'center',
    content: 'Referrals',
  },
};

export const LeftAligned: Story = {
  args: {
    alignment: 'left',
    content: 'Left aligned stat',
  },
};

export const RightAligned: Story = {
  args: {
    alignment: 'right',
    content: 'Right aligned stat',
  },
};

export const CustomColors: Story = {
  args: {
    'stat-text-color': '#1ed760',
    'description-text-color': '#121212',
    content: 'Custom colors',
  },
};

export const CustomFontSizes: Story = {
  args: {
    'stat-font-size': 48,
    'stat-font-weight': 600,
    'description-font-size': 18,
    content: 'Custom font sizes',
  },
};

export const FlexReverse: Story = {
  args: {
    'flex-reverse': true,
    content: 'Flex reverse',
  },
};

export const LoadingState: Story = {
  render: () =>
    BigStatView({
      statvalue: '...',
      value: 0,
      loading: true,
      label: 'Loading state',
      alignment: 'center',
      flexReverse: false,
    }),
};
