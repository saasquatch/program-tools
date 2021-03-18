import { useQuery } from '@saasquatch/component-boilerplate';
import gql from 'graphql-tag';
import { ShareLinkViewProps } from './share-link-view';

interface ShareLinkProps {
  programId: string;
  icon?: string;
  iconlabel?: string;
  tooltiptext?: string;
}

const MessageLinkQuery = gql`
  query($id: String!, $accountId: String!, $programId: ID) {
    user(id: $id, accountId: $accountId) {
      shareLink(programId: $programId)
    }
  }
`;

export function useShareLink(props: ShareLinkProps): ShareLinkViewProps {
  //@ts-ignore
  const { userId: id, accountId } = window.widgetIdent;
  const { programId } = props;

  const res = useQuery(MessageLinkQuery, { programId, id, accountId });

  return { ...props, sharelink: res?.data?.user?.shareLink ?? '' };
}
