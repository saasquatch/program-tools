import { ShareLinkViewProps } from './shareLinkView';

interface ShareLinkProps extends ShareLinkViewProps {}

export function useShareLink(props: ShareLinkProps): ShareLinkViewProps {
  return props;
}
