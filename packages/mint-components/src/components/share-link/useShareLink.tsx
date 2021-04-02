import {
  useLazyQuery,
  useProgramId,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
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
  const user = useUserIdentity();

  const [getLink, { data }] = useLazyQuery(MessageLinkQuery);

  console.log("shareLink", user?.jwt, data);
  useEffect(() => {
    if (user?.jwt) getLink({ programId });
  }, [user?.jwt]);

  const sharelink =
    data?.user?.shareLink ??
    // Shown during loading
    "...";

  const [open, setOpen] = useState(false);

  function onClick() {
    // Should well supported: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility
    // Only if called from a user-initiated event
    navigator.clipboard.writeText(sharelink);
    setOpen(true);
    setTimeout(() => setOpen(false), props.tooltiplifespan);
  }

  return { ...props, onClick, open, sharelink };
}
