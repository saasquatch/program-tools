import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const imageUrl =
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80';

const meta: Meta = {
  title: 'Components/HeroImage',
  component: 'sql-hero-image',
  tags: ['autodocs'],
  argTypes: {
    'image-url': { control: 'text' },
    layout: { control: 'select', options: ['overlay', 'columns'] },
    header: { control: 'text' },
    description: { control: 'text' },
    'button-text': { control: 'text' },
    'button-link': { control: 'text' },
    'image-pos': { control: 'select', options: ['left', 'right'] },
    'overlay-opacity': { control: 'number' },
    'overlay-color': { control: 'color' },
    'text-color': { control: 'color' },
    'image-min-height': { control: 'text' },
    'image-padding': { control: 'text' },
  },
  render: (args) => html`
    <sql-hero-image
      image-url="${args['image-url'] || imageUrl}"
      layout="${args.layout || 'overlay'}"
      header="${args.header || 'Refer friends. Earn rewards.'}"
      description="${args.description || 'Create a polished launch moment with a flexible image layout.'}"
      button-text="${args['button-text'] || ''}"
      button-link="${args['button-link'] || ''}"
      image-pos="${args['image-pos'] || 'left'}"
      overlay-opacity="${args['overlay-opacity'] || 0.75}"
      overlay-color="${args['overlay-color'] || '#000000'}"
      text-color="${args['text-color'] || '#ffffff'}"
      image-min-height="${args['image-min-height'] || '360px'}"
      image-padding="${args['image-padding'] || '0'}"
    ></sql-hero-image>
  `,
};

export default meta;
type Story = StoryObj;

export const OverlayLayout: Story = {
  args: {
    layout: 'overlay',
  },
};

export const ColumnsLayout: Story = {
  args: {
    layout: 'columns',
    'text-color': '#0f172a',
  },
};

export const ImageOnRight: Story = {
  args: {
    layout: 'columns',
    'image-pos': 'right',
    'text-color': '#0f172a',
  },
};

export const CustomOverlayOpacity: Story = {
  args: {
    layout: 'overlay',
    'overlay-opacity': 0.45,
  },
};

export const CustomTextColor: Story = {
  args: {
    layout: 'overlay',
    'text-color': '#fde68a',
  },
};

export const WithButton: Story = {
  args: {
    layout: 'overlay',
    'button-text': 'Learn more',
    'button-link': 'https://example.com',
  },
};
