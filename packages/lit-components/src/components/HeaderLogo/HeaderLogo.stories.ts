import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const defaultImage =
  'https://res.cloudinary.com/saasquatch/image/upload/v1644000259/squatch-assets/tn47wOj.png';

const meta: Meta = {
  title: 'Components/HeaderLogo',
  component: 'sql-header-logo',
  tags: ['autodocs'],
  argTypes: {
    'image-url': { control: 'text' },
    height: { control: 'text' },
    href: { control: 'text' },
    alignment: { control: 'select', options: ['left', 'center', 'right'] },
  },
  render: (args) =>
    html`<sql-header-logo
      image-url="${args['image-url'] || defaultImage}"
      height="${args.height || '40px'}"
      href="${args.href || ''}"
      alignment="${args.alignment || 'left'}"
    ></sql-header-logo>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Centered: Story = {
  args: {
    alignment: 'center',
  },
};

export const WithLink: Story = {
  args: {
    href: 'https://www.saasquatch.com',
  },
};

export const CustomHeight: Story = {
  args: {
    height: '56px',
  },
};
