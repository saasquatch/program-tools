import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/Pagination',
  component: 'sql-pagination',
  tags: ['autodocs'],
  argTypes: {
    'current-page': { control: 'number' },
    'total-pages': { control: 'number' },
    'show-previous-label': { control: 'text' },
    'show-next-label': { control: 'text' },
  },
  render: (args) => html`
    <sql-pagination
      current-page="${args['current-page'] || 1}"
      total-pages="${args['total-pages'] || 1}"
      show-previous-label="${args['show-previous-label'] || 'Previous'}"
      show-next-label="${args['show-next-label'] || 'Next'}"
    ></sql-pagination>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    'current-page': 1,
    'total-pages': 1,
  },
};

export const MultiplePagesStart: Story = {
  args: {
    'current-page': 1,
    'total-pages': 5,
  },
};

export const MultiplePagesMiddle: Story = {
  args: {
    'current-page': 3,
    'total-pages': 5,
  },
};

export const MultiplePagesEnd: Story = {
  args: {
    'current-page': 5,
    'total-pages': 5,
  },
};

export const SinglePage: Story = {
  args: {
    'current-page': 1,
    'total-pages': 1,
  },
};
