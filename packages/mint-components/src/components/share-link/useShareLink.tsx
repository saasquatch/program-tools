import { ShareLinkViewProps } from './share-link-view';

interface ShareLinkProps {
  icon?: string;
  iconlabel?: string;
  tooltiptext?: string;
  sharelink?: string;
  disabled?: boolean;
}

export function useShareLink(props: ShareLinkProps): ShareLinkViewProps {
  return {
    sharelink: 'https://www.saasquatch.com/',
    ...props,
  };
}
