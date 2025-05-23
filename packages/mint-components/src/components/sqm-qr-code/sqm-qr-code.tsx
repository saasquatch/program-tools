import {
  useEngagementMedium,
  useParentValue,
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { gql } from "graphql-request";
import {
  REFERRAL_CODES_NAMESPACE,
  ReferralCodeContext,
} from "../sqm-referral-codes/useReferralCodes";
import { QrCodeView } from "./sqm-qr-code-view";
import { getProps } from "../../utils/utils";

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
  /**
   * @uiName Title
   */
  @Prop() titleText: string = "Share your QR code";

  /**
   * @uiName View QR code text
   */
  @Prop() viewCodeText: string = "View QR code";

  /**
   * @uiName Download QR code text
   */
  @Prop() downloadCodeText: string = "Download";

  /**
   * @uiName Print QR code text
   */
  @Prop() printCodeText: string = "Print";

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

    const createPrintable = async () => {};

    const fireViewQrEvent = () => {
      setExpanded((e) => !e);
    };

    const viewProps = {
      ...getProps(this),
      qrLink,
      expanded,
      fireViewQrEvent,
      createDownloadable,
      createPrintable,
    };

    return <QrCodeView {...viewProps} />;
  }
}
