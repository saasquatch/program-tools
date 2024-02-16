import {
  useEngagementMedium,
  useUserIdentity,
  useQuery,
} from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";
import { ShareButtonViewProps } from "./sqm-share-button-view";
import { PlatformNativeActions } from "../../global/android";
import {
  useProgramId,
  getEnvironmentSDK,
} from "@saasquatch/component-boilerplate";

declare const SquatchAndroid: PlatformNativeActions | undefined;

interface ShareButtonProps extends ShareButtonViewProps {
  programId?: string;
  sharetitle?: string;
  sharetext?: string;
  errorText?: string;
  unsupportedPlatformText?: string;
}

const MessageLinkQuery = gql`
  query (
    $programId: ID
    $engagementMedium: UserEngagementMedium!
    $shareMedium: ReferralShareMedium!
  ) {
    viewer {
      ... on User {
        messageLink(
          programId: $programId
          engagementMedium: $engagementMedium
          shareMedium: $shareMedium
        )
        shareLink(programId: $programId, engagementMedium: $engagementMedium)
      }
    }
  }
`;

function NativeShare(
  props: { sharetitle: string; sharetext: string },
  directLink: string,
  undefinedErrorText: string,
  unsupportedPlatformText: string
) {
  const title = props.sharetitle || "Share title";
  const text = props.sharetext || "Share text";

  if (directLink === "undefined") {
    return alert(undefinedErrorText);
  }

  if (window.navigator.share) {
    window.navigator
      .share({
        title,
        text,
        url: directLink,
      })
      .catch((error) => console.error("Error on web share", error));
  } else {
    alert(unsupportedPlatformText);
  }
}

function FacebookShare(directLink: string, res: any, errorText: string) {
  if (
    res.data?.viewer?.messageLink === "undefined" ||
    directLink === "undefined"
  ) {
    return alert(errorText);
  }

  if (typeof SquatchAndroid.shareOnFacebook !== "undefined") {
    return SquatchAndroid.shareOnFacebook(
      directLink,
      res.data.viewer.messageLink
    );
  } else {
    return GenericShare(res, errorText);
  }
}

function GenericShare(res: any, errorText: string) {
  return res.data?.viewer?.messageLink
    ? window.open(res.data.viewer.messageLink)
    : alert(errorText);
}

export function useShareButton(props: ShareButtonProps): ShareButtonViewProps {
  const { sharetitle, sharetext, medium } = props;

  const programId = props.programId ? props.programId : useProgramId();
  const user = useUserIdentity();
  const variables = {
    engagementMedium: useEngagementMedium(),
    programId: programId,
    shareMedium: medium.toUpperCase(),
  };

  // only queries if a programId is available
  const res = useQuery(MessageLinkQuery, variables, !user?.jwt || !programId);

  const directLink = res?.data?.viewer?.shareLink;

  const environment = getEnvironmentSDK();

  const hide =
    (medium.toLocaleUpperCase() === "SMS" &&
      window.orientation === undefined) ||
    (medium.toLocaleUpperCase() === "DIRECT" && !window.navigator.share);

  function onClick() {
    if (
      medium.toLocaleUpperCase() === "FACEBOOK" &&
      environment.type === "SquatchAndroid"
    ) {
      FacebookShare(directLink, res, props.errorText);
    } else if (medium.toLocaleUpperCase() === "DIRECT") {
      NativeShare({ sharetitle, sharetext }, directLink, props.errorText, props.unsupportedPlatformText);
    } else {
      GenericShare(res, props.errorText);
    }
  }

  return { ...props, loading: res.loading, onClick, hide };
}
