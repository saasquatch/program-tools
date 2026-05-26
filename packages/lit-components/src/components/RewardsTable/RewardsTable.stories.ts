import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '../../index';
import { RewardsTableProps } from './RewardsTable';
import { RewardsTableView } from './RewardsTableView';

const sampleRewards = [
  {
    id: 'reward-1',
    type: 'CASH',
    value: 25,
    unit: 'USD',
    prettyValue: '$25.00',
    dateGiven: '2024-01-15T00:00:00.000Z',
    dateExpires: '2024-12-31T00:00:00.000Z',
    statuses: ['APPROVED'],
    fuelTankCode: '',
    programId: '41863',
    sourceUser: { firstName: 'Taylor', lastName: 'Smith' },
  },
  {
    id: 'reward-2',
    type: 'POINTS',
    value: 100,
    unit: 'points',
    prettyValue: '100 pts',
    dateGiven: '2024-02-01T00:00:00.000Z',
    dateExpires: '',
    statuses: ['PENDING'],
    fuelTankCode: '',
    programId: '41863',
    sourceUser: { firstName: 'Jordan', lastName: 'Lee' },
  },
  {
    id: 'reward-3',
    type: 'CASH',
    value: 10,
    unit: 'USD',
    prettyValue: '$10.00',
    dateGiven: '2024-02-10T00:00:00.000Z',
    dateExpires: '',
    statuses: ['AVAILABLE'],
    fuelTankCode: '',
    programId: '41863',
    sourceUser: { firstName: 'Alex', lastName: 'Chen' },
  },
  {
    id: 'reward-4',
    type: 'GIFT_CARD',
    value: 50,
    unit: 'USD',
    prettyValue: '$50 Gift Card',
    dateGiven: '2024-03-01T00:00:00.000Z',
    dateExpires: '',
    statuses: ['PAID'],
    fuelTankCode: '',
    programId: '41863',
    sourceUser: { firstName: 'Morgan', lastName: 'Brown' },
  },
];

const baseProps: RewardsTableProps = {
  perPage: 4,
  programId: '41863',
  showLabels: true,
  dateShownColumn: 'Date Received',
  rewardShownColumn: 'Reward',
  sourceShownColumn: 'Source',
  statusShownColumn: 'Status',
  emptyStateText: 'No rewards yet',
};

const renderTable = (
  args: Partial<RewardsTableProps> = {},
  overrides: Partial<Parameters<typeof RewardsTableView>[0]> = {}
) =>
  RewardsTableView({
    ...baseProps,
    ...args,
    rewards: sampleRewards,
    loading: false,
    totalCount: sampleRewards.length,
    totalPages: 1,
    currentPage: 0,
    nextPage: () => undefined,
    prevPage: () => undefined,
    empty: false,
    ...overrides,
  });

const meta: Meta = {
  title: 'Components/RewardsTable',
  component: 'sql-rewards-table',
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
  render: () => renderTable({}, { rewards: [], totalCount: 0, totalPages: 0, empty: true }),
};

export const WithPagination: Story = {
  render: () => renderTable({}, { totalCount: 8, totalPages: 2, currentPage: 0 }),
};
