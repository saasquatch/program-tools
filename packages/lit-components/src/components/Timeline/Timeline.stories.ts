import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta = {
  title: 'Components/Timeline',
  component: 'sql-timeline',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => html`<sql-timeline>
    <div style="padding: var(--sl-spacing-small) 0;">Add timeline entries here</div>
  </sql-timeline>`,
};

export const WithEntries: Story = {
  render: () => html`<sql-timeline>
    <sql-timeline-entry
      entry-label="Program joined"
      entry-description="You enrolled in the referral program."
      entry-date="Jan 10, 2026"
      status="complete"
    ></sql-timeline-entry>
    <sql-timeline-entry
      entry-label="First referral"
      entry-description="Invite one friend to unlock your first reward."
      entry-date="Jan 14, 2026"
      status="active"
      entry-icon="star-fill"
    ></sql-timeline-entry>
    <sql-timeline-entry
      entry-label="Reward earned"
      entry-description="Receive 500 points after your friend converts."
      status="pending"
    ></sql-timeline-entry>
  </sql-timeline>`,
};
