import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '../../index';
import { ReferralTableProps } from './ReferralTable';
import { ReferralTableView } from './ReferralTableView';

const sampleReferrals = [
  {
    dateReferralStarted: '2024-01-15T00:00:00.000Z',
    dateConverted: '2024-01-20T00:00:00.000Z',
    referredUser: { firstName: 'Taylor', lastName: 'Smith' },
    rewards: [{ prettyValue: '$25.00', type: 'CASH', statuses: ['APPROVED'] }],
    dateModerated: '2024-01-21T00:00:00.000Z',
  },
  {
    dateReferralStarted: '2024-02-01T00:00:00.000Z',
    dateConverted: '',
    referredUser: { firstName: 'Jordan', lastName: 'Lee' },
    rewards: [{ prettyValue: '$10.00', type: 'CASH', statuses: ['PENDING'] }],
    dateModerated: '',
  },
  {
    dateReferralStarted: '2024-02-10T00:00:00.000Z',
    dateConverted: '2024-02-14T00:00:00.000Z',
    referredUser: { firstName: 'Alex', lastName: 'Chen' },
    rewards: [{ prettyValue: '$15.00', type: 'POINTS', statuses: ['APPROVED'] }],
    dateModerated: '2024-02-15T00:00:00.000Z',
  },
  {
    dateReferralStarted: '2024-03-03T00:00:00.000Z',
    dateConverted: '',
    referredUser: { firstName: 'Morgan', lastName: 'Brown' },
    rewards: [],
    dateModerated: '',
  },
];

const baseProps: ReferralTableProps = {
  perPage: 4,
  programId: '41863',
  showLabels: true,
  hiddenColumns: '',
  dateShownColumn: 'Date Referred',
  nameShownColumn: 'Name',
  rewardsShownColumn: 'Rewards',
  statusShownColumn: 'Status',
  emptyStateText: 'No referrals yet',
  emptyStateImage: '',
};

const renderTable = (
  args: Partial<ReferralTableProps> = {},
  overrides: Partial<Parameters<typeof ReferralTableView>[0]> = {}
) =>
  ReferralTableView({
    ...baseProps,
    ...args,
    referrals: sampleReferrals,
    loading: false,
    totalCount: sampleReferrals.length,
    totalPages: 1,
    currentPage: 0,
    nextPage: () => undefined,
    prevPage: () => undefined,
    empty: false,
    ...overrides,
  });

const meta: Meta = {
  title: 'Components/ReferralTable',
  component: 'sql-referral-table',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => renderTable(),
};

export const Loading: Story = {
  render: () => renderTable({}, { loading: true }),
};

export const Empty: Story = {
  render: () => renderTable({}, { referrals: [], totalCount: 0, totalPages: 0, empty: true }),
};

export const WithPagination: Story = {
  render: () => renderTable({}, { totalCount: 8, totalPages: 2, currentPage: 0 }),
};

export const HiddenColumns: Story = {
  render: () => renderTable({ hiddenColumns: 'rewards,status' }),
};
