import { useQuery } from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/universal-hooks";
import gql from "graphql-tag";
import { ShareLinkViewProps } from "./share-link-view";

interface ShareLinkProps {
  programId: string;
  icon?: string;
  iconlabel?: string;
  tooltiptext?: string;
  tooltiplifespan?: number;
}

const MessageLinkQuery = gql`
  query($id: String!, $accountId: String!, $programId: ID) {
    user(id: $id, accountId: $accountId) {
      shareLink(programId: $programId)
    }
  }
`;

const DEFAULT_TOOLTIP_LIFESPAN = 1000;

export function useShareLink(props: ShareLinkProps): ShareLinkViewProps {
  //@ts-ignore
  const { userId: id, accountId } = window.widgetIdent;
  const { programId } = props;

  const res = useQuery(MessageLinkQuery, { programId, id, accountId });
  const sharelink = res?.data?.user?.shareLink ?? "";

  // TODO move to hook and write stories
  const [open, setOpen] = useState(false);

  function onClick() {
    navigator.clipboard.writeText(sharelink);
    setOpen(true);
    setTimeout(
      () => setOpen(false),
      props.tooltiplifespan ?? DEFAULT_TOOLTIP_LIFESPAN
    );
  }

  return { ...props, onClick, open, sharelink };
}
