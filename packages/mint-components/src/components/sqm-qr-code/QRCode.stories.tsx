import { h } from "@stencil/core";
import { QrCodeView, QRCodeViewProps } from "./sqm-qr-code-view";

export default {
  title: "Components/QR Code",
};

const defaultProps: QRCodeViewProps = {
  hideTitle: false,
  loading: false,
  alignment: "center",
  error: false,
  qrLink:
    "https://media.istockphoto.com/id/1251071788/vector/qr-code-bar-code-black-icon-digital-technology.jpg?s=612x612&w=0&k=20&c=maw4OqMSEegAdSo8Drm9HO7i1ddddvP2YaL1UuWbRig=",
  createDownloadable: async () => {
    console.log("Download QR Code clicked");
  },
  createPrintable: async () => {
    console.log("Print QR Code clicked");
  },
  titleText: "Share your QR code",
  downloadCodeText: "Download",
  printCodeText: "Print",
  errorHeaderText: "There was an error loading your QR code",
  errorDescriptionText: "Please refresh this page and try again",
};

export const Default = () => {
  return <QrCodeView {...defaultProps}></QrCodeView>;
};

export const HideTitle = () => {
  return <QrCodeView {...defaultProps} hideTitle={true}></QrCodeView>;
};

export const LeftAlign = () => {
  return <QrCodeView {...defaultProps} alignment="left"></QrCodeView>;
};

export const CenterAlign = () => {
  return <QrCodeView {...defaultProps} alignment="center"></QrCodeView>;
};

export const RightAlign = () => {
  return <QrCodeView {...defaultProps} alignment="right"></QrCodeView>;
};

export const Loading = () => {
  return <QrCodeView {...defaultProps} loading={true}></QrCodeView>;
};

export const Error = () => {
  return <QrCodeView {...defaultProps} error={true}></QrCodeView>;
};

export const DownloadError = () => {
  return <QrCodeView {...defaultProps} error={true}></QrCodeView>;
};
