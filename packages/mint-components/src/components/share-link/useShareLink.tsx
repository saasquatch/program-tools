import { ShareLinkViewProps } from './share-link-view';

interface ShareLinkProps extends ShareLinkViewProps {}

export function useShareLink(props: ShareLinkProps): ShareLinkViewProps {
  return props;
}
