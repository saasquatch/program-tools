import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface QRCodeViewProps {
  expanded?: boolean;
  qrLink: string;
  buttonLabel: string;
  dimensions?: number;
  fireViewQrEvent: any;
  createDownloadable: any;
}

export function QrCodeView({
  expanded,
  qrLink,
  buttonLabel,
  dimensions,
  fireViewQrEvent,
  createDownloadable,
}: QRCodeViewProps) {
  const style = {
    DialogContainer: {
      maxWidth: "390px !important",
    },
    Container: {
      padding: "12px",
      display: "flex",
      flexDirection: "row",
      gap: "12px",
      justifyContent: "space-between",
    },
    FacadeContainer: {
      display: "flex",
      gap: "16px",
      flexDirection: "column",
    },
    ButtonContainer: {
      display: "flex",
      gap: "16px",
    },
    FooterContainer: {
      textAlign: "left",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  const vanillaStyle = `
  sl-dialog::part(panel) {
    max-width: 390px;
    width: 100%;
  }
  sl-dialog::part(footer) {
    display: flex;
    flex-direction: column;
    gap: var(--sl-spacing-small);
    width: 100%;
  }
  :host{
    display: flex;
    width: 100%;
  }
  @media (max-width: 499px) {
    :host{
      display: block;
    }
  }`;

  return (
    <div class={sheet.classes.Container} part="sqm-base">
      <style>{vanillaStyle}</style>
      <style>{styleString}</style>
      <div class={sheet.classes.FacadeContainer}>
        <span>Share your QR code</span>
        <div class={sheet.classes.ButtonContainer}>
          <sl-button type="primary" onClick={fireViewQrEvent}>
            {buttonLabel}
          </sl-button>
          <sl-button type="text" onClick={createDownloadable}>
            Download
          </sl-button>
          <sl-button type="text" onClick={createDownloadable}>
            Print
          </sl-button>
        </div>
      </div>

      <sl-dialog
        class={sheet.classes.DialogContainer}
        width="250px"
        open={expanded}
        label="Share your QR code"
        aria-modal="true"
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={`${qrLink}&qrCodeImageFormat=svg`}
            width={dimensions}
            height={dimensions}
          />
        </div>

        <div slot="footer" class={sheet.classes.FooterContainer}>
          <sl-button variant="default" onClick={createDownloadable}>
            Download
          </sl-button>
          <sl-button variant="default" onClick={createDownloadable}>
            Print
          </sl-button>
        </div>
      </sl-dialog>
    </div>
  );
}
