import {
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useDomContext, useEffect } from "@saasquatch/stencil-hooks";
import { useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { ShareLinkViewProps } from "../sqm-share-link/sqm-share-link-view";

interface ShareCodeProps {
  programId?: string;
  tooltiptext: string;
  tooltiplifespan: number;
}

const MessageLinkQuery = gql`
  query ($programId: ID) {
    user: viewer {
      ... on User {
        referralCode(programId: $programId)
      }
    }
  }
`;

export function useShareCode(props: ShareCodeProps): ShareLinkViewProps {
  const programId = useProgramId();
  const user = useUserIdentity();

  const { data, refetch } = useQuery(
    MessageLinkQuery,
    { programId },
    !user?.jwt
  );

  useEffect(() => {
    refetch();
  }, [programId]);
  const shareString =
    data?.user?.referralCode ??
    // Shown during loading
    "...";

  const [open, setOpen] = useState(false);

  function onClick() {
    // Should well supported: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility
    // Only if called from a user-initiated event
    navigator.clipboard.writeText(shareString);
    setOpen(true);
    setTimeout(() => setOpen(false), props.tooltiplifespan);
  }

  return { ...props, onClick, open, shareString };
}
