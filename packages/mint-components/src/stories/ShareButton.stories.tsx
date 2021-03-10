import { ShareButtonView } from '../components/share-button/share-button-view';

export default {
  title: 'Share Button',
};

export const WithoutIcon = () => {
  const props = { label: 'Share' };
  return ShareButtonView(props);
};

export const WithIcon = () => {
  const props = { label: 'Share', icon:"facebook", iconslot:"suffix" } as const;
  return ShareButtonView(props);
};

export const IconOnly = () => {
  const props = { icon:"facebook", iconslot:"suffix" } as const;
  return ShareButtonView(props);
};

export const TextButton = () => {
  const props = { label: 'Share', type:'text' } as const;
  return ShareButtonView(props);
};
