import { h } from '@stencil/core';
import { ShareButtonView } from '../components/share-button/share-button-view';

export default {
  title: 'Share Button',
};

export const WithIcon = () => {
  const props = { medium: 'facebook', iconslot: 'suffix' } as const;
  return <ShareButtonView {...props}>Share</ShareButtonView>;
};

export const TextStyle = () => {
  const props = { medium: 'facebook', type: 'text', iconslot: 'suffix' } as const;
  return <ShareButtonView {...props}>Share</ShareButtonView>;
};

export const WithoutIcon = () => {
  const props = { medium: 'facebook', hideicon: true } as const;
  return <ShareButtonView {...props}>Share</ShareButtonView>;
};

export const TextStyleWithoutIcon = () => {
  const props = { medium: 'facebook', type: 'text', hideicon: true } as const;
  return <ShareButtonView {...props}>Share</ShareButtonView>;
};
