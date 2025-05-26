import {
  useEngagementMedium,
  useMutation,
  useParentValue,
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/stencil-hooks";
import { useEffect } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import {
  REFERRAL_CODES_NAMESPACE,
  ReferralCodeContext,
} from "../sqm-referral-codes/useReferralCodes";
import { QrCode } from "./sqm-qr-code";
import { QRCodeViewProps } from "./sqm-qr-code-view";

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
const WIDGET_ENGAGEMENT_EVENT = gql`
  mutation loadEvent($eventMeta: UserAnalyticsEvent!) {
    createUserAnalyticsEvent(eventMeta: $eventMeta)
  }
`;

export function useQRCode(props: QrCode): QRCodeViewProps {
  const programId = useProgramId();
  const user = useUserIdentity();
  const engagementMedium = useEngagementMedium();
  const contextData = useParentValue<ReferralCodeContext>(
    REFERRAL_CODES_NAMESPACE
  );
  const [dialogIsOpen, setDialog] = useState(false);
  const [qrLink, setQrUrl] = useState(null);
  const [error, setError] = useState(false);
  const [viewError, setViewError] = useState(false);

  const { data, errors } = useQuery(
    ShareLinkQuery,
    { programId, engagementMedium },
    !user?.jwt || contextData?.shareLink !== undefined
  );
  const [sendLoadEvent] = useMutation(WIDGET_ENGAGEMENT_EVENT);
  const shareLink = data?.user?.shareLink;
  const qrPrefix = `${shareLink}?qrCode`;

  useEffect(() => {
    if (!shareLink) return;

    const getQrCode = async () => {
      try {
        const res = await fetch(`${shareLink}?qrCode&qrCodeImageFormat=svg`);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setQrUrl(url);
      } catch (e) {
        setViewError(true);
      }
    };

    getQrCode();
  }, [shareLink]);

  const fireEvent = async () => {
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
  };

  const createDownloadable = async () => {
    try {
      const res = await fetch(
        `${qrPrefix}&qrCodeSize=800&qrCodeImageFormat=png`
      );
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      // Successful
      if (blob) fireEvent();

      // Trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrCode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Failed to fetch QR code:", e);
      setError(true);
    }
  };

  const createPrintable = async () => {
    try {
      const res = await fetch(
        `${qrPrefix}&qrCodeSize=1000&qrCodeImageFormat=png&qrCodeErrorCorrectionLevel=H`
      );
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      // Successful
      if (blob) fireEvent();

      // Trigger print
      const page = window.open("about:blank", "_new");
      const img = page.document.createElement("img");
      img.src = url;
      img.onload = () => {
        page.print();
        page.close();
      };
      page.document.body.appendChild(img);
    } catch (e) {
      console.error("Failed to fetch QR code: ", e);
      setError(true);
    }
  };

  return {
    ...props,
    qrLink,
    dialogIsOpen,
    error: error,
    viewError: viewError || !!errors?.message,
    showDialog: () => {
      setError(false);
      setDialog(true);
    },
    hideDialog: () => {
      setError(false);
      setDialog(false);
    },
    createDownloadable,
    createPrintable,
  };
}
