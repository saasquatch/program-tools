import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '../../index';
import { DocusignFormView } from './DocusignFormView';

const meta: Meta = {
  title: 'Components/DocusignForm',
  component: 'sql-docusign-form',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const baseProps = {
  headerText: 'Tax Document Signing',
  descriptionText: 'Please sign the tax document to continue.',
  iframeUrl: 'https://example.com/sign',
  iframeHeight: '600px',
  programId: 'demo-program',
  docusignUrl: 'https://example.com/sign',
  loading: false,
  signed: false,
};

export const Default: Story = {
  render: () => DocusignFormView(baseProps),
};

export const Loading: Story = {
  render: () =>
    DocusignFormView({
      ...baseProps,
      loading: true,
    }),
};

export const Signed: Story = {
  render: () =>
    DocusignFormView({
      ...baseProps,
      signed: true,
    }),
};

export const NoUrl: Story = {
  render: () =>
    DocusignFormView({
      ...baseProps,
      iframeUrl: '',
      docusignUrl: '',
    }),
};
