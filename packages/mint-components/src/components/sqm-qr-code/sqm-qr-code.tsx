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
import { getProps } from "../../utils/utils";
import {
  REFERRAL_CODES_NAMESPACE,
  ReferralCodeContext,
} from "../sqm-referral-codes/useReferralCodes";
import { QrCodeView } from "./sqm-qr-code-view";

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
    const [dialogIsOpen, setDialog] = useState(false);

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

    const viewProps = {
      ...getProps(this),
      qrLink,
      dialogIsOpen,
      showDialog: () => setDialog(true),
      hideDialog: () => setDialog(false),
      createDownloadable,
      createPrintable,
    };

    return <QrCodeView {...viewProps} />;
  }
}
