import { useQuery } from '@saasquatch/component-boilerplate';
import gql from 'graphql-tag';
import { ShareLinkViewProps } from './share-link-view';

interface ShareLinkProps {
  icon?: string;
  iconlabel?: string;
  tooltiptext?: string;
  sharelink?: string;
  disabled?: boolean;
  variables?: {
    programId: string;
  };
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

  const res = useQuery(MessageLinkQuery, { ...props.variables, id, accountId });
  console.log(res);
  return { ...props, sharelink: res?.data?.user?.shareLink ?? '' };
}
