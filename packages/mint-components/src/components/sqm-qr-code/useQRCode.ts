import {
  useEngagementMedium,
  useParentValue,
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import {
  REFERRAL_CODES_NAMESPACE,
  ReferralCodeContext,
} from "../sqm-referral-codes/useReferralCodes";
import { gql } from "graphql-request";
import { useState } from "@saasquatch/stencil-hooks";
import { QrCode } from "./sqm-qr-code";

const ShareLinkQuery = gql`
  query shareLink($programId: ID, $engagementMedium: UserEngagementMedium!) {
    user: viewer {
      ... on User {
        shareLink(
          programId: $programId
          engagementMedium: $engagementMedium
          shareMedium: DIRECT
        )
      }
    }
  }
`;

export function useQRCode(props: QrCode) {
  const programId = useProgramId();
  const user = useUserIdentity();
  const engagementMedium = useEngagementMedium();
  const contextData = useParentValue<ReferralCodeContext>(
    REFERRAL_CODES_NAMESPACE
  );
  const [expanded, setExpanded] = useState(false);

  const { data } = useQuery(
    ShareLinkQuery,
    { programId, engagementMedium },
    !user?.jwt || contextData?.shareLink !== undefined
  );

  if (!data) return null;

  const qrLink = `${data.user.shareLink}?qrCode`;

  const createDownloadable = async () => {
    const res = await fetch(`${qrLink}&qrCodeSize=800&qrCodeImageFormat=png`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrCode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const createPrintable = async () => {};

  const fireViewQrEvent = () => {
    setExpanded((e) => !e);
  };

  return {
    ...props,
    qrLink,
    expanded,
    setExpanded,
    fireViewQrEvent,
    createDownloadable,
    createPrintable,
  };
}
