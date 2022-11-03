import {
  useEngagementMedium,
  useMutation,
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useRef, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { ShareLinkViewProps } from "./sqm-share-link-view";

interface ShareLinkProps {
  programId?: string;
  tooltiptext: string;
  tooltiplifespan: number;
}

const MessageLinkQuery = gql`
  query ($programId: ID) {
    user: viewer {
      ... on User {
        shareLink(programId: $programId)
      }
    }
  }
`;

const WIDGET_ENGAGEMENT_EVENT = gql`
  mutation loadEvent($eventMeta: UserAnalyticsEvent!) {
    createUserAnalyticsEvent(eventMeta: $eventMeta)
  }
`;

export function useShareLink(props: ShareLinkProps): ShareLinkViewProps {
  const { programId = useProgramId() } = props;
  const user = useUserIdentity();
  const engagementMedium = useEngagementMedium();

  const { data } = useQuery(MessageLinkQuery, { programId }, !user?.jwt);
  const [sendLoadEvent] = useMutation(WIDGET_ENGAGEMENT_EVENT);

  const shareString =
    data?.user?.shareLink ??
    // Shown during loading
    "...";

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState<HTMLInputElement>(undefined);
  function onClick() {
    // Should well supported: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility
    // Only if called from a user-initiated event
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(shareString);
    } else {
      input?.select();
      input?.setSelectionRange(0, 99999);
      try {
        document.execCommand("copy");
      } catch (err) {
        console.log("Error while copying to clipboard: " + err);
      }
    }
    setOpen(true);
    setTimeout(() => setOpen(false), props.tooltiplifespan);
    sendLoadEvent({
      eventMeta: {
        programId,
        id: user?.id,
        accountId: user?.accountId,
        type: "USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT",
        meta: {
          engagementMedium,
          shareMedium: "DIRECT",
        },
      },
    });
  }

  return { ...props, onClick, open, shareString, setInput };
}
