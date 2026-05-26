import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import type { TaskCardProps } from './TaskCard';

const defaultArgs: TaskCardProps = {
  rewardUnit: 'Points',
  taskCardTitle: 'Invite a friend',
  taskCardDescription: 'Share your referral link to start earning rewards.',
  buttonText: 'Start',
  showProgressBar: false,
  progressCurrent: 0,
  progressGoal: 1,
  completedText: 'Completed!',
  repeatable: false,
  cardStatus: 'incomplete',
};

function normalizeArgs(args: Partial<TaskCardProps>): TaskCardProps {
  return {
    ...defaultArgs,
    ...args,
    showProgressBar: args.showProgressBar ?? defaultArgs.showProgressBar,
    progressCurrent: Number(args.progressCurrent ?? defaultArgs.progressCurrent),
    progressGoal: Number(args.progressGoal ?? defaultArgs.progressGoal),
    repeatable: args.repeatable ?? defaultArgs.repeatable,
    cardStatus: args.cardStatus ?? defaultArgs.cardStatus,
  };
}

const meta = {
  title: 'Components/TaskCard',
  component: 'sql-task-card',
  tags: ['autodocs'],
  argTypes: {
    rewardAmount: { control: 'text' },
    rewardUnit: { control: 'text' },
    taskCardTitle: { control: 'text' },
    taskCardDescription: { control: 'text' },
    buttonText: { control: 'text' },
    buttonLink: { control: 'text' },
    showProgressBar: { control: 'boolean' },
    progressCurrent: { control: 'number' },
    progressGoal: { control: 'number' },
    completedText: { control: 'text' },
    repeatable: { control: 'boolean' },
    dateExpires: { control: 'text' },
    cardIcon: { control: 'text' },
    cardStatus: { control: 'select', options: ['incomplete', 'complete', 'expired'] },
  },
  render: (args: Partial<TaskCardProps>) => {
    const props = normalizeArgs(args);

    return html`<sql-task-card
      reward-amount="${props.rewardAmount || ''}"
      reward-unit="${props.rewardUnit}"
      task-card-title="${props.taskCardTitle || ''}"
      task-card-description="${props.taskCardDescription || ''}"
      button-text="${props.buttonText}"
      button-link="${props.buttonLink || ''}"
      ?show-progress-bar=${props.showProgressBar}
      progress-current="${props.progressCurrent}"
      progress-goal="${props.progressGoal}"
      completed-text="${props.completedText}"
      ?repeatable=${props.repeatable}
      date-expires="${props.dateExpires || ''}"
      card-icon="${props.cardIcon || ''}"
      card-status="${props.cardStatus}"
    ></sql-task-card>`;
  },
} satisfies Meta<Partial<TaskCardProps>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithProgress: Story = {
  args: {
    showProgressBar: true,
    progressCurrent: 2,
    progressGoal: 5,
  },
};

export const Complete: Story = {
  args: {
    cardStatus: 'complete',
    rewardAmount: '250',
  },
};

export const Expired: Story = {
  args: {
    cardStatus: 'expired',
    dateExpires: 'Jan 31, 2026',
  },
};

export const WithIcon: Story = {
  args: {
    cardIcon: 'gift',
  },
};

export const WithReward: Story = {
  args: {
    rewardAmount: '500',
    rewardUnit: 'Points',
  },
};

export const Repeatable: Story = {
  args: {
    repeatable: true,
    dateExpires: 'Every Friday',
    rewardAmount: '100',
  },
};
