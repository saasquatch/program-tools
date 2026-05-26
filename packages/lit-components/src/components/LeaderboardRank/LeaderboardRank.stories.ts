import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '../../index';
import type { LeaderboardRankProps } from './LeaderboardRank';
import { LeaderboardRankView } from './LeaderboardRankView';
import type { LeaderboardRankHookResult } from './useLeaderboardRank';

const defaultArgs: LeaderboardRankProps = {
  leaderboardType: 'topStartedReferrers',
  rankTextFormat: 'Your rank: {rank}',
  unrankedText: 'Complete a referral to get ranked!',
};

function normalizeArgs(args: Partial<LeaderboardRankProps>): LeaderboardRankProps {
  return {
    ...defaultArgs,
    ...args,
  };
}

function formatRankText(props: LeaderboardRankProps, rank?: number) {
  return rank
    ? (props.rankTextFormat || 'Your rank: {rank}').replace('{rank}', String(rank))
    : props.unrankedText;
}

function renderView(
  args: Partial<LeaderboardRankProps>,
  hookProps: Partial<LeaderboardRankHookResult> = {}
) {
  const props = normalizeArgs(args);
  const rank = hookProps.rank;

  return LeaderboardRankView({
    ...props,
    rank,
    rankText: hookProps.rankText ?? formatRankText(props, rank),
    loading: hookProps.loading ?? false,
  });
}

const meta = {
  title: 'Components/LeaderboardRank',
  component: 'sql-leaderboard-rank',
  tags: ['autodocs'],
  argTypes: {
    leaderboardType: { control: 'text' },
    rankTextFormat: { control: 'text' },
    unrankedText: { control: 'text' },
  },
  render: (args: Partial<LeaderboardRankProps>) => renderView(args, { rank: 7 }),
} satisfies Meta<Partial<LeaderboardRankProps>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Ranked: Story = {
  render: (args) => renderView(args, { rank: 2 }),
};

export const Unranked: Story = {
  render: (args) => renderView(args, { rank: undefined, rankText: normalizeArgs(args).unrankedText }),
};

export const Loading: Story = {
  render: (args) => renderView(args, { loading: true, rank: undefined }),
};

export const CustomFormat: Story = {
  args: {
    rankTextFormat: 'You are currently #{rank}',
  },
  render: (args) => renderView(args, { rank: 12 }),
};
