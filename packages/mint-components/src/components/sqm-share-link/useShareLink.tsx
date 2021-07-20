import {
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { ShareLinkViewProps } from "./sqm-share-link-view";

interface ShareLinkProps {
  programId?: string;
  tooltiptext: string;
  tooltiplifespan: number;
  type: "shareLink" | "referralCode";
}

const MessageLinkQuery = gql`
  query ($programId: ID) {
    user: viewer {
      ... on User {
        shareLink(programId: $programId)
        referralCode(programId: $programId)
      }
    }
  }
`;

export function useShareLink(props: ShareLinkProps): ShareLinkViewProps {
  const { programId = useProgramId() } = props;
  const user = useUserIdentity();

  const { data } = useQuery(MessageLinkQuery, { programId }, !user?.jwt);

  const shareString =
    data?.user?.[props.type] ??
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
