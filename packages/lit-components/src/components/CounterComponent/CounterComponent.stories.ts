import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/CounterComponent',
  component: 'lit-counter',
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed above the counter',
      defaultValue: 'Counter',
    },
    'initial-count': {
      control: 'number',
      description: 'The initial count value',
      defaultValue: 0,
    },
  },
  render: (args) => html`
    <lit-counter
      title="${args.title || 'Counter'}"
      initial-count="${args['initial-count'] || 0}"
    ></lit-counter>
  `,
};

export default meta;
type Story = StoryObj;

/**
 * Default counter with no custom attributes
 */
export const Default: Story = {
  args: {},
};

/**
 * Counter with custom title
 */
export const CustomTitle: Story = {
  args: {
    title: 'My Custom Counter',
  },
};

/**
 * Counter starting at 10
 */
export const StartingAt10: Story = {
  args: {
    title: 'Counter',
    'initial-count': 10,
  },
};

/**
 * Counter starting at 100
 */
export const StartingAt100: Story = {
  args: {
    title: 'High Value Counter',
    'initial-count': 100,
  },
};

/**
 * Counter with negative starting value
 */
export const NegativeStart: Story = {
  args: {
    title: 'Negative Counter',
    'initial-count': -5,
  },
};

/**
 * Multiple counters side by side
 */
export const MultipleCounters: Story = {
  render: () => html`
    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
      <lit-counter title="Counter 1" initial-count="0"></lit-counter>
      <lit-counter title="Counter 2" initial-count="5"></lit-counter>
      <lit-counter title="Counter 3" initial-count="10"></lit-counter>
    </div>
  `,
};
