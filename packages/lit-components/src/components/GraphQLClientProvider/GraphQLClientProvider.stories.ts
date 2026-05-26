import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/GraphQLClientProvider',
  component: 'sql-graphql-client-provider',
  tags: ['autodocs'],
  render: () => html`
    <sql-graphql-client-provider domain="https://example.com" tenant-alias="demo">
      <p>Wrapped content</p>
    </sql-graphql-client-provider>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
