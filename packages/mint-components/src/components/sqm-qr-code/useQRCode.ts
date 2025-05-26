import {
  useEngagementMedium,
  useParentValue,
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/stencil-hooks";
import { gql } from "graphql-request";
import {
  REFERRAL_CODES_NAMESPACE,
  ReferralCodeContext,
} from "../sqm-referral-codes/useReferralCodes";
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
  const [dialogIsOpen, setDialog] = useState(false);

  const { data } = useQuery(
    ShareLinkQuery,
    { programId, engagementMedium },
    !user?.jwt || contextData?.shareLink !== undefined
  );

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

  const createPrintable = async () => {
    const res = await fetch(
      `${qrLink}&qrCodeSize=1000&qrCodeImageFormat=png&qrCodeErrorCorrectionLevel=H`
    );
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const page = window.open("about:blank", "_new");
    const img = page.document.createElement("img");
    img.src = url;
    img.onload = () => {
      page.print();
      page.close();
    };
    page.document.body.appendChild(img);
  };

  return {
    ...props,
    qrLink,
    dialogIsOpen,
    showDialog: () => setDialog(true),
    hideDialog: () => setDialog(false),
    createDownloadable,
    createPrintable,
  };
}
