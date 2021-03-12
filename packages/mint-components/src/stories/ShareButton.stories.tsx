import { h } from '@stencil/core';
import { ShareButtonView } from '../components/share-button/share-button-view';

export default {
  title: 'Share Button',
};

export const WithoutIcon = () => {
  const props = {};
  return <ShareButtonView {...props}>Share</ShareButtonView>;
};

export const WithIcon = () => {
  const props = { label: 'Share', icon: 'facebook', iconslot: 'suffix' } as const;
  return <ShareButtonView {...props}>Share</ShareButtonView>;
};

export const TextButton = () => {
  const props = { label: 'Share', type: 'text' } as const;
  return <ShareButtonView {...props}>Share</ShareButtonView>;
};
