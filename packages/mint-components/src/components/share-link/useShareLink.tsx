import { useProgramId, useQuery } from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/universal-hooks";
import gql from "graphql-tag";
import { ShareLinkViewProps } from "./share-link-view";

interface ShareLinkProps {
  programId?: string;
  tooltiptext: string;
  tooltiplifespan: number;
}

const MessageLinkQuery = gql`
  query($programId: ID) {
    user: viewer {
      ... on User {
        shareLink(programId: $programId)
      }
    }
  }
`;

export function useShareLink(props: ShareLinkProps): ShareLinkViewProps {
  const { programId = useProgramId() } = props;

  const res = useQuery(MessageLinkQuery, { programId });
  const sharelink =
    res?.data?.user?.shareLink ??
    // Shown during loading
    "...";

  const [open, setOpen] = useState(false);

  function onClick() {
    navigator.clipboard.writeText(sharelink);
    setOpen(true);
    setTimeout(() => setOpen(false), props.tooltiplifespan);
  }

  return { ...props, onClick, open, sharelink };
}
