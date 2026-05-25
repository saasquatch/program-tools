import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import type { ProgramExplainerProps } from './ProgramExplainer';

const meta = {
  title: 'Components/ProgramExplainer',
  component: 'sql-program-explainer',
  tags: ['autodocs'],
  argTypes: {
    header: { control: 'text' },
    description: { control: 'text' },
    layout: { control: 'select', options: ['horizontal', 'vertical'] },
  },
  render: (args: Partial<ProgramExplainerProps>) => html`<sql-program-explainer
    header="${args.header || ''}"
    description="${args.description || ''}"
    layout="${args.layout || 'horizontal'}"
  >
    <sql-program-explainer-step
      step-title="Share your link"
      step-description="Send your referral link to a friend."
      step-number="1"
    ></sql-program-explainer-step>
    <sql-program-explainer-step
      step-title="Friend signs up"
      step-description="They create an account and start exploring."
      step-number="2"
    ></sql-program-explainer-step>
    <sql-program-explainer-step
      step-title="Earn rewards"
      step-description="Collect points or credits when they complete the goal."
      step-number="3"
    ></sql-program-explainer-step>
  </sql-program-explainer>`,
} satisfies Meta<Partial<ProgramExplainerProps>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: 'How it works',
  },
};

export const Vertical: Story = {
  args: {
    header: 'How it works',
    layout: 'vertical',
  },
};

export const WithHeaderAndDescription: Story = {
  args: {
    header: 'Refer friends in three easy steps',
    description: 'Invite friends, track their progress, and unlock rewards as they convert.',
  },
};
