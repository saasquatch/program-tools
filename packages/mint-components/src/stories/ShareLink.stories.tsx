import { h } from '@stencil/core';
import { ShareLinkView } from '../components/share-link/share-link-view';

export default {
  title: 'Share Link',
};

export const Default = () => {
  const props = {
    shareLink: 'https://noah.example.com',
  };
  return <ShareLinkView {...props} />;
};
