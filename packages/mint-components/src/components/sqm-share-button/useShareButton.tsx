import {
  useEngagementMedium,
  useUserIdentity,
  useQuery,
  useParentValue,
  useMutation,
} from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";
import { ShareButtonViewProps } from "./sqm-share-button-view";
import { PlatformNativeActions } from "../../global/android";
import {
  useProgramId,
  getEnvironmentSDK,
} from "@saasquatch/component-boilerplate";
import {
  REFERRAL_CODES_NAMESPACE,
  ReferralCodeContext,
  SET_CODE_COPIED,
} from "../sqm-referral-codes/useReferralCodes";

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

function FacebookShare(
  directLink: string,
  messageLink: string,
  errorText: string
) {
  if (messageLink === "undefined" || directLink === "undefined") {
    return alert(errorText);
  }

  if (typeof SquatchAndroid.shareOnFacebook !== "undefined") {
    return SquatchAndroid.shareOnFacebook(directLink, messageLink);
  } else {
    return GenericShare(messageLink, errorText);
  }
}

function GenericShare(messageLink: string, errorText: string) {
  return messageLink ? (window.location.href = messageLink) : alert(errorText);
}

export function useShareButton(props: ShareButtonProps): ShareButtonViewProps {
  const { sharetitle, sharetext, medium } = props;

  const programId = props.programId ? props.programId : useProgramId();
  const user = useUserIdentity();
  const engagementMedium = useEngagementMedium();
  const variables = {
    engagementMedium,
    programId: programId,
    shareMedium: medium.toUpperCase(),
  };

  const contextData = useParentValue<ReferralCodeContext>(
    REFERRAL_CODES_NAMESPACE
  );

  const overrideData = contextData?.[medium];

  // only queries if a programId is available
  const res = useQuery(
    MessageLinkQuery,
    variables,
    !user?.jwt || !programId || overrideData !== undefined
  );

  const [setCopied, copiedRes] = useMutation(SET_CODE_COPIED);

  const directLink = overrideData?.shareLink || res?.data?.viewer?.shareLink;

  const environment = getEnvironmentSDK();

  const hide =
    (medium.toLocaleUpperCase() === "SMS" &&
      window.orientation === undefined) ||
    (medium.toLocaleUpperCase() === "DIRECT" && !window.navigator.share);

  const messageLink =
    overrideData?.messageLink || res.data?.viewer?.messageLink;

  async function onClick() {
    if (overrideData) {
      await setCopied({ referralCode: contextData.referralCode });
      contextData.refresh();
    }

    if (
      medium.toLocaleUpperCase() === "FACEBOOK" &&
      environment.type === "SquatchAndroid"
    ) {
      FacebookShare(directLink, messageLink, props.errorText);
    } else if (medium.toLocaleUpperCase() === "DIRECT") {
      NativeShare(
        { sharetitle, sharetext },
        directLink,
        props.errorText,
        props.unsupportedPlatformText
      );
    }
  }

  const isPlainLink =
    !(
      medium.toLocaleUpperCase() === "FACEBOOK" &&
      environment.type === "SquatchAndroid"
    ) &&
    medium.toLocaleUpperCase() !== "DIRECT" &&
    messageLink;

  const userAgent = window.navigator.userAgent.toLowerCase(),
    safari = /safari/.test(userAgent),
    ios = /iphone|ipod|ipad/.test(userAgent);

  const openInSameTab = ios && !safari;

  return {
    ...props,
    loading: res.loading && !overrideData?.messageLink,
    messageLink,
    isPlainLink,
    onClick,
    openInSameTab,
    hide,
  };
}
