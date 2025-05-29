import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { ErrorView } from "../tax-and-cash/sqm-tax-and-cash/ErrorView";

export interface QRCodeViewProps {
  error: boolean;
  qrLink: string;
  createDownloadable: () => void;
  titleText?: string;
  hideTitle?: boolean;
  alignment?: "left" | "center" | "right";
  downloadCodeText?: string;
  printCodeText?: string;
  errorHeaderText?: string;
  errorDescriptionText?: string;
  createPrintable: () => void;
  loading: boolean;
}

const style = {
  DialogContainer: {
    maxWidth: "390px !important",
  },
  Container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "var(--sl-spacing-small)",
  },
  TextContainer: {
    display: "flex",
    gap: "var(--sl-spacing-medium)",
    flexDirection: "column",
    alignItems: "center",
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
  TextButton: {
    "&::part(base)": {
      color: "var(--sl-color-gray-600)",
    },
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

const vanillaStyle = `
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
  error,
  qrLink,
  titleText,
  downloadCodeText,
  printCodeText,
  errorHeaderText,
  errorDescriptionText,
  createDownloadable,
  createPrintable,
  hideTitle,
  alignment,
}: QRCodeViewProps) {
  const codeAlignment =
    alignment === "left"
      ? "flex-start"
      : alignment === "right"
      ? "flex-end"
      : "center";
  return (
    <div
      class={sheet.classes.Container}
      style={{ justifyContent: codeAlignment }}
      part="sqm-base"
    >
      <style>{vanillaStyle}</style>
      <style>{styleString}</style>
      <div
        class={sheet.classes.TextContainer}
        style={{ alignItems: codeAlignment }}
      >
        {!hideTitle && <span part="sqm-title">{titleText}</span>}
        {error && (
          <ErrorView
            loadingErrorAlertDescription={errorHeaderText}
            loadingErrorAlertHeader={errorDescriptionText}
          />
        )}
        {qrLink && (
          <svg width="100" height="100">
            <image href={qrLink} width="100" height="100" />
          </svg>
        )}
        <div class={sheet.classes.ButtonContainer}>
          <sl-button
            size="small"
            exportparts="base: defaultbutton-base"
            type="default"
            onClick={createDownloadable}
          >
            {downloadCodeText}
          </sl-button>
          <sl-button
            size="small"
            exportparts="base: textbutton-base"
            type="text"
            onClick={createPrintable}
            class={sheet.classes.TextButton}
          >
            {printCodeText}
          </sl-button>
        </div>
      </div>
    </div>
  );
}
