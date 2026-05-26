import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/CardFeed',
  component: 'sql-card-feed',
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'number' },
    gap: { control: 'number' },
  },
  render: (args) => html`
    <sql-card-feed width="${args.width || 347}" gap="${args.gap || 24}">
      <sql-task-card
        reward-amount="20"
        reward-unit="Points"
        task-card-title="Complete a survey"
        task-card-description="Fill out our NPS survey to earn points."
        button-text="Start"
        card-status="incomplete"
      ></sql-task-card>
      <sql-task-card
        reward-amount="150"
        reward-unit="Points"
        task-card-title="Spend $500"
        task-card-description="Earn a bonus once you reach the spend threshold."
        button-text="See details"
        show-progress-bar
        progress-current="2"
        progress-goal="5"
        card-status="incomplete"
      ></sql-task-card>
      <sql-task-card
        reward-amount="50"
        reward-unit="Points"
        task-card-title="Follow us on social"
        task-card-description="Connect with us to unlock an extra reward."
        button-text="Follow"
        card-status="complete"
      ></sql-task-card>
    </sql-card-feed>
  `,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WideCards: Story = {
  args: {
    width: 420,
  },
};

export const CompactGap: Story = {
  args: {
    gap: 12,
  },
};
