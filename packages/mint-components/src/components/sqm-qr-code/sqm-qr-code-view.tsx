import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface QRCodeViewProps {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  qrLink: string;
  fireViewQrEvent: () => void;
  createDownloadable: () => void;
  titleText?: string;
  viewCodeText?: string;
  downloadCodeText?: string;
  printCodeText?: string;
  createPrintable: () => void;
}

const style = {
  DialogContainer: {
    maxWidth: "390px !important",
  },
  Container: {
    padding: "var(--sl-spacing-small)",
    display: "flex",
    flexDirection: "row",
    gap: "var(--sl-spacing-small)",
    justifyContent: "space-between",
  },
  FacadeContainer: {
    display: "flex",
    gap: "var(--sl-spacing-medium)",
    flexDirection: "column",
  },
  ButtonContainer: {
    display: "flex",
    gap: "var(--sl-spacing-medium)",
  },
  FooterContainer: {
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "var(--sl-spacing-medium)",
  },
  CodeContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  Code: {
    width: "100%",
    height: "100%",
    maxWidth: "335px",
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
  sl-dialog::part(body) {
    padding: 0 var(--sl-spacing-large);
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

export function QrCodeView({
  expanded,
  qrLink,
  titleText,
  viewCodeText,
  downloadCodeText,
  printCodeText,
  fireViewQrEvent,
  createDownloadable,
  createPrintable,
  setExpanded,
}: QRCodeViewProps) {
  return (
    <div class={sheet.classes.Container} part="sqm-base">
      <style>{vanillaStyle}</style>
      <style>{styleString}</style>
      <div class={sheet.classes.FacadeContainer}>
        <span part="sqm-title">{titleText}</span>
        <div class={sheet.classes.ButtonContainer}>
          <sl-button type="primary" onClick={fireViewQrEvent}>
            {viewCodeText}
          </sl-button>
          <sl-button type="text" onClick={createDownloadable}>
            {downloadCodeText}
          </sl-button>
          <sl-button type="text" onClick={createPrintable}>
            {printCodeText}
          </sl-button>
        </div>
      </div>

      <sl-dialog
        class={sheet.classes.DialogContainer}
        width="250px"
        open={expanded}
        label={titleText}
        onSl-hide={() => setExpanded(false)}
      >
        <div class={sheet.classes.CodeContainer}>
          <img
            class={sheet.classes.Code}
            src={`${qrLink}&qrCodeImageFormat=svg`}
          />
        </div>

        <div slot="footer" class={sheet.classes.FooterContainer}>
          <sl-button variant="default" onClick={createDownloadable}>
            {downloadCodeText}
          </sl-button>
          <sl-button variant="default" onClick={createDownloadable}>
            {printCodeText}
          </sl-button>
        </div>
      </sl-dialog>
    </div>
  );
}
