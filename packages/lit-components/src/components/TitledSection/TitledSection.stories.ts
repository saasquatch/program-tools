import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const spacingOptions = [
  'none',
  'xxx-small',
  'xx-small',
  'x-small',
  'small',
  'medium',
  'large',
  'x-large',
  'xx-large',
  'xxx-large',
  'xxxx-large',
];

const renderSection = (args: Record<string, unknown>) => html`
  <sql-titled-section
    label="${args.label || 'Section label'}"
    text-align="${args['text-align'] || 'left'}"
    label-margin="${args['label-margin'] || 'small'}"
    padding="${args.padding || 'none'}"
  >
    ${args.useSlots
      ? html`
          <div slot="label"><h2 style="margin: 0;">Reward summary</h2></div>
          <div slot="content">
            <p style="margin: 0;">Invite a friend and earn credits after their first purchase.</p>
          </div>
        `
      : html`<div slot="content"><p style="margin: 0;">${args.content || 'Section content'}</p></div>`}
  </sql-titled-section>
`;

const meta: Meta = {
  title: 'Components/TitledSection',
  component: 'sql-titled-section',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    'text-align': { control: 'select', options: ['left', 'center', 'right'] },
    'label-margin': { control: 'select', options: spacingOptions },
    padding: { control: 'select', options: spacingOptions },
  },
  render: (args) => renderSection(args),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Program overview',
    content: 'Everything your advocates need to know in one place.',
  },
};

export const CenterAligned: Story = {
  args: {
    label: 'Centered content',
    content: 'This section is centered for hero-style layouts.',
    'text-align': 'center',
  },
};

export const RightAligned: Story = {
  args: {
    label: 'Right aligned label',
    content: 'Useful for asymmetric layouts and side panels.',
    'text-align': 'right',
  },
};

export const VariousPaddings: Story = {
  render: () => html`
    <div style="display: grid; gap: var(--sl-spacing-medium);">
      ${['none', 'small', 'large', 'xxxx-large'].map(
        (padding) => html`
          <sql-titled-section label="Padding: ${padding}" padding="${padding}">
            <div slot="content">
              <p style="margin: 0;">The container uses ${padding} spacing.</p>
            </div>
          </sql-titled-section>
        `
      )}
    </div>
  `,
};

export const VariousLabelMargins: Story = {
  render: () => html`
    <div style="display: grid; gap: var(--sl-spacing-medium);">
      ${['none', 'x-small', 'medium', 'x-large'].map(
        (margin) => html`
          <sql-titled-section label="Margin: ${margin}" label-margin="${margin}">
            <div slot="content">
              <p style="margin: 0;">The label spacing uses ${margin}.</p>
            </div>
          </sql-titled-section>
        `
      )}
    </div>
  `,
};

export const WithSlotContent: Story = {
  args: {
    useSlots: true,
    padding: 'medium',
    'label-margin': 'x-small',
  },
};
