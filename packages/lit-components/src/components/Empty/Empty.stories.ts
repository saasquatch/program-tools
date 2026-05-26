import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const defaultImage =
  'https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_leaderboard2.png';

const meta: Meta = {
  title: 'Components/Empty',
  component: 'sql-empty',
  tags: ['autodocs'],
  argTypes: {
    'empty-state-image': { control: 'text' },
    'empty-state-header': { control: 'text' },
    'empty-state-text': { control: 'text' },
    'support-text': { control: 'text' },
  },
  render: (args) => html`<sql-empty
    empty-state-image="${args['empty-state-image'] ?? defaultImage}"
    empty-state-header="${args['empty-state-header'] || 'View your rank in the leaderboard'}"
    empty-state-text="${
      args['empty-state-text'] || 'Be the first to refer a friend and reach the top of the leaderboard'
    }"
    support-text="${args['support-text'] || ''}"
  ></sql-empty>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const CustomImage: Story = {
  args: {
    'empty-state-image':
      'https://res.cloudinary.com/saasquatch/image/upload/v1715360191/squatch-assets/Leaderboard_Not_Available.svg',
  },
};

export const NoImage: Story = {
  args: {
    'empty-state-image': '',
  },
};

export const CustomHeaderAndText: Story = {
  args: {
    'empty-state-header': 'Nothing to show yet',
    'empty-state-text': 'Complete your first action to populate this section.',
    'support-text': 'Need help? Contact support.',
  },
};
