import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import type { TimelineEntryProps } from './TimelineEntry';

const defaultArgs: TimelineEntryProps = {
  entryLabel: 'Referral started',
  entryDescription: 'Your friend signed up using your referral link.',
  entryIcon: 'circle-fill',
  entryColor: 'var(--sl-color-primary-600)',
  status: 'pending',
};

function normalizeArgs(args: Partial<TimelineEntryProps>): TimelineEntryProps {
  return {
    ...defaultArgs,
    ...args,
    entryIcon: args.entryIcon ?? defaultArgs.entryIcon,
    entryColor: args.entryColor ?? defaultArgs.entryColor,
    status: args.status ?? defaultArgs.status,
  };
}

const meta = {
  title: 'Components/TimelineEntry',
  component: 'sql-timeline-entry',
  tags: ['autodocs'],
  argTypes: {
    entryLabel: { control: 'text' },
    entryDescription: { control: 'text' },
    entryDate: { control: 'text' },
    entryIcon: { control: 'text' },
    entryColor: { control: 'color' },
    status: { control: 'select', options: ['complete', 'active', 'pending'] },
  },
  render: (args: Partial<TimelineEntryProps>) => {
    const props = normalizeArgs(args);
    return html`<sql-timeline-entry
      entry-label="${props.entryLabel || ''}"
      entry-description="${props.entryDescription || ''}"
      entry-date="${props.entryDate || ''}"
      entry-icon="${props.entryIcon}"
      entry-color="${props.entryColor}"
      status="${props.status}"
    ></sql-timeline-entry>`;
  },
} satisfies Meta<Partial<TimelineEntryProps>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Complete: Story = {
  args: {
    status: 'complete',
  },
};

export const Active: Story = {
  args: {
    status: 'active',
    entryIcon: 'star-fill',
  },
};

export const Pending: Story = {};

export const WithDescription: Story = {
  args: {
    entryDescription: 'Share your link with a friend to begin this step.',
  },
};

export const WithDate: Story = {
  args: {
    entryDate: 'Jan 20, 2026',
  },
};

export const InTimeline: Story = {
  render: () => html`<sql-timeline>
    <sql-timeline-entry
      entry-label="Referral started"
      entry-description="Your friend signed up using your link."
      entry-date="Jan 12, 2026"
      status="complete"
    ></sql-timeline-entry>
    <sql-timeline-entry
      entry-label="Reward pending"
      entry-description="Reward will unlock after purchase."
      entry-date="Jan 20, 2026"
      status="active"
      entry-icon="gift-fill"
    ></sql-timeline-entry>
  </sql-timeline>`,
};
