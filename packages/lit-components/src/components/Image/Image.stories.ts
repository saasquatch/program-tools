import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/Image',
  component: 'sql-image',
  tags: ['autodocs'],
  argTypes: {
    'image-url': { control: 'text' },
    alignment: { control: 'select', options: ['left', 'center', 'right'] },
    'background-color': { control: 'color' },
    'min-height': { control: 'text' },
    width: { control: 'text' },
  },
  render: (args) => html`<sql-image
    image-url="${
      args['image-url'] ||
      'https://res.cloudinary.com/saasquatch/image/upload/v1644000259/squatch-assets/tn47wOj.png'
    }"
    alignment="${args.alignment || 'center'}"
    background-color="${args['background-color'] || ''}"
    min-height="${args['min-height'] || ''}"
    width="${args.width || ''}"
  ></sql-image>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const LeftAligned: Story = {
  args: {
    alignment: 'left',
  },
};

export const RightAligned: Story = {
  args: {
    alignment: 'right',
  },
};

export const CustomBackground: Story = {
  args: {
    'background-color': '#f5f5f5',
  },
};

export const CustomSize: Story = {
  args: {
    'min-height': '180px',
    width: '240px',
  },
};

export const CustomWidth: Story = {
  args: {
    width: '50%',
  },
};
