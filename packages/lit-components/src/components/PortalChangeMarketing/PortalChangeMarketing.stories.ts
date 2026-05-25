import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '../../index';
import { PortalChangeMarketingView } from './PortalChangeMarketingView';

const meta: Meta = {
  title: 'Components/PortalChangeMarketing',
  component: 'sql-portal-change-marketing',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const baseProps = {
  headerText: 'Email Preferences',
  description: 'Manage your email notification preferences.',
  subscribedText: 'You are subscribed to marketing emails.',
  unsubscribedText: 'You are not subscribed to marketing emails.',
  subscribeLabel: 'Subscribe',
  unsubscribeLabel: 'Unsubscribe',
  saving: false,
  onToggle: async () => {},
};

export const Default: Story = {
  render: () => PortalChangeMarketingView({ ...baseProps, subscribed: true, loading: false }),
};

export const Subscribed: Story = {
  render: () => PortalChangeMarketingView({ ...baseProps, subscribed: true, loading: false }),
};

export const Unsubscribed: Story = {
  render: () => PortalChangeMarketingView({ ...baseProps, subscribed: false, loading: false }),
};

export const Loading: Story = {
  render: () => PortalChangeMarketingView({ ...baseProps, subscribed: true, loading: true }),
};
