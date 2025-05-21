import {
  useEngagementMedium,
  useParentValue,
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, h } from "@stencil/core";
import { gql } from "graphql-request";
import {
  REFERRAL_CODES_NAMESPACE,
  ReferralCodeContext,
} from "../sqm-referral-codes/useReferralCodes";

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

@Component({
  tag: "sqm-qr-code",
  shadow: true,
})
export class QrCode {
  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
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

    if (!data) return <div></div>;

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

    const fireViewQrEvent = () => {
      setExpanded((e) => !e);
    };

    const dimensions = expanded ? 500 : 100;
    const buttonLabel = expanded ? "Hide QR Code" : "View QR Code";

    return (
      <div
        style={{
          border: "1px solid #eee",
          padding: "12px",
          display: "flex",
          flexDirection: expanded ? "column" : "row",
          gap: "12px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span>Share your QR code</span>
          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={fireViewQrEvent}>{buttonLabel}</button>
            <button onClick={createDownloadable}>Download</button>
          </div>
        </div>
        <img
          src={`${qrLink}&qrCodeImageFormat=svg`}
          width={dimensions}
          height={dimensions}
        />
      </div>
    );
  }
}
