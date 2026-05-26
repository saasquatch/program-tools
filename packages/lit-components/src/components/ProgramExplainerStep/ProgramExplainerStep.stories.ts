import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import type { ProgramExplainerStepProps } from './ProgramExplainerStep';

const defaultArgs: ProgramExplainerStepProps = {
  stepTitle: 'Share your link',
  stepDescription: 'Send your referral link to a friend.',
  iconColor: 'var(--sl-color-primary-600)',
};

const meta = {
  title: 'Components/ProgramExplainerStep',
  component: 'sql-program-explainer-step',
  tags: ['autodocs'],
  argTypes: {
    stepTitle: { control: 'text' },
    stepDescription: { control: 'text' },
    stepNumber: { control: 'number' },
    icon: { control: 'text' },
    iconColor: { control: 'color' },
  },
  render: (args: Partial<ProgramExplainerStepProps>) => html`<sql-program-explainer-step
    step-title="${args.stepTitle || defaultArgs.stepTitle || ''}"
    step-description="${args.stepDescription || defaultArgs.stepDescription || ''}"
    step-number="${args.stepNumber ?? ''}"
    icon="${args.icon || ''}"
    icon-color="${args.iconColor || defaultArgs.iconColor}"
  ></sql-program-explainer-step>`,
} satisfies Meta<Partial<ProgramExplainerStepProps>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: 'gift-fill',
  },
};

export const WithNumber: Story = {
  args: {
    stepNumber: 2,
    icon: undefined,
  },
};

export const WithDescription: Story = {
  args: {
    stepDescription: 'Invite friends, wait for them to convert, and collect your reward.',
    icon: 'people-fill',
  },
};
