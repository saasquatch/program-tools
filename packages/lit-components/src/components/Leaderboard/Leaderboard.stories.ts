import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '../../index';
import type { LeaderboardProps, LeaderboardRow } from './Leaderboard';
import { LeaderboardView } from './LeaderboardView';
import type { LeaderboardHookResult } from './useLeaderboard';

const mockRows: LeaderboardRow[] = [
  { rank: 1, firstName: 'Morgan', lastInitial: 'L', statValue: 42 },
  { rank: 2, firstName: 'Avery', lastInitial: 'K', statValue: 36 },
  { rank: 3, firstName: 'Jordan', lastInitial: 'P', statValue: 29 },
  { rank: 4, firstName: 'Casey', lastInitial: 'N', statValue: 21 },
  { rank: 5, firstName: 'Taylor', lastInitial: 'R', statValue: 18 },
];

const defaultArgs: LeaderboardProps = {
  leaderboardType: 'topStartedReferrers',
  rankType: 'rowNumber',
  showRank: true,
  showUser: true,
  showStats: true,
  emptyStateText: 'No data available',
  maxRows: 10,
};

function normalizeArgs(args: Partial<LeaderboardProps>): LeaderboardProps {
  return {
    ...defaultArgs,
    ...args,
    showRank: args.showRank ?? defaultArgs.showRank,
    showUser: args.showUser ?? defaultArgs.showUser,
    showStats: args.showStats ?? defaultArgs.showStats,
    maxRows: Number(args.maxRows ?? defaultArgs.maxRows),
  };
}

function renderView(
  args: Partial<LeaderboardProps>,
  hookProps: Partial<LeaderboardHookResult> = {}
) {
  const props = normalizeArgs(args);
  const rows = hookProps.rows ?? mockRows.slice(0, props.maxRows);

  return LeaderboardView({
    ...props,
    rows,
    loading: hookProps.loading ?? false,
    empty: hookProps.empty ?? rows.length === 0,
  });
}

const meta = {
  title: 'Components/Leaderboard',
  component: 'sql-leaderboard',
  tags: ['autodocs'],
  argTypes: {
    leaderboardType: { control: 'text' },
    rankType: { control: 'text' },
    showRank: { control: 'boolean' },
    showUser: { control: 'boolean' },
    showStats: { control: 'boolean' },
    header: { control: 'text' },
    emptyStateText: { control: 'text' },
    maxRows: { control: 'number' },
  },
  render: (args: Partial<LeaderboardProps>) => renderView(args),
} satisfies Meta<Partial<LeaderboardProps>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  render: (args) => renderView(args, { rows: [], loading: true, empty: false }),
};

export const Empty: Story = {
  render: (args) => renderView(args, { rows: [], loading: false, empty: true }),
};

export const WithHeader: Story = {
  args: {
    header: 'Top Referrers',
  },
};

export const HideRank: Story = {
  args: {
    showRank: false,
  },
};

export const MaxRows: Story = {
  args: {
    maxRows: 3,
  },
  render: (args) => {
    const props = normalizeArgs(args);
    return renderView(props, { rows: mockRows.slice(0, props.maxRows) });
  },
};
