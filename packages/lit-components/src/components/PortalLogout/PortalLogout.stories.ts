import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/PortalLogout',
  component: 'sql-portal-logout',
  tags: ['autodocs'],
  render: () => html`<sql-portal-logout redirect-url="/login"></sql-portal-logout>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
