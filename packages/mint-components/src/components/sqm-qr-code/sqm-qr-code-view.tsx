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

  LoadingSkeleton: {
    "&::part(indicator)": {
      borderRadius: "0px !important",
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
  loading,
}: QRCodeViewProps) {
  const codeAlignment =
    alignment === "left"
      ? "flex-start"
      : alignment === "right"
      ? "flex-end"
      : "center";

  const getCodeContent = (error: boolean, qrLink: string, loading: boolean) => {
    if (error) {
      return (
        <ErrorView
          loadingErrorAlertDescription={errorHeaderText}
          loadingErrorAlertHeader={errorDescriptionText}
        />
      );
    } else if (loading) {
      return (
        <sl-skeleton
          className={sheet.classes.LoadingSkeleton}
          effect="sheen"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "0px !important",
          }}
        ></sl-skeleton>
      );
    } else if (qrLink) {
      return (
        <svg width="100" height="100">
          <image href={qrLink} width="100" height="100" />
        </svg>
      );
    }
    return null;
  };

  const codeContent = getCodeContent(error, qrLink, loading);
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
        {codeContent}
        <div class={sheet.classes.ButtonContainer}>
          <sl-button
            size="small"
            exportparts="base: primarybutton-base"
            type="primary"
            onClick={createDownloadable}
          >
            {downloadCodeText}
          </sl-button>
          <sl-button
            size="small"
            exportparts="base: secondarybutton-base"
            type="text"
            onClick={createPrintable}
          >
            {printCodeText}
          </sl-button>
        </div>
      </div>
    </div>
  );
}
