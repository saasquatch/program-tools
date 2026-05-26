import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/Text',
  component: 'sql-text',
  tags: ['autodocs'],
  argTypes: {
    'font-size': { control: 'number' },
    'text-color': { control: 'color' },
  },
  render: (args) => {
    return html`<sql-text
      font-size="${args['font-size'] || ''}"
      text-color="${args['text-color'] || ''}"
    >
      <p>${args.content || 'This is some text content'}</p>
    </sql-text>`;
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default text component with paragraph
 */
export const Default: Story = {
  args: {
    content: 'This is a paragraph of text.',
  },
};

/**
 * Heading 1
 */
export const Heading1: Story = {
  render: (args) => html`<sql-text
    font-size="${args['font-size'] || ''}"
    text-color="${args['text-color'] || ''}"
  >
    <h1>This is a Heading 1</h1>
  </sql-text>`,
};

/**
 * Heading 2
 */
export const Heading2: Story = {
  render: (args) => html`<sql-text
    font-size="${args['font-size'] || ''}"
    text-color="${args['text-color'] || ''}"
  >
    <h2>This is a Heading 2</h2>
  </sql-text>`,
};

/**
 * Heading 3
 */
export const Heading3: Story = {
  render: (args) => html`<sql-text
    font-size="${args['font-size'] || ''}"
    text-color="${args['text-color'] || ''}"
  >
    <h3>This is a Heading 3</h3>
  </sql-text>`,
};

/**
 * Heading 4
 */
export const Heading4: Story = {
  render: (args) => html`<sql-text
    font-size="${args['font-size'] || ''}"
    text-color="${args['text-color'] || ''}"
  >
    <h4>This is a Heading 4</h4>
  </sql-text>`,
};

/**
 * Custom font size
 */
export const CustomFontSize: Story = {
  args: {
    'font-size': 24,
    content: 'This text has a custom 24px font size.',
  },
};

/**
 * Custom text color
 */
export const CustomColor: Story = {
  args: {
    'text-color': '#4169e1',
    content: 'This text has a custom blue color.',
  },
};

/**
 * Multiple elements
 */
export const MultipleElements: Story = {
  render: (args) => html`<sql-text
    font-size="${args['font-size'] || ''}"
    text-color="${args['text-color'] || ''}"
  >
    <h2>Welcome to our program</h2>
    <p>Refer your friends and earn rewards!</p>
  </sql-text>`,
};

/**
 * Subscript text
 */
export const SubscriptText: Story = {
  render: () => html`<sql-text>
    <sub>This is smaller subscript text</sub>
  </sql-text>`,
};
