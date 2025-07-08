import { isDemo } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";
import { QrCodeView, QRCodeViewProps } from "./sqm-qr-code-view";
import { useQRCode } from "./useQRCode";

/**
 * @uiName QR Code
 * @validParents ["sqm-portal-container","div","sqm-divided-layout","sqm-brand", "sqb-program-section", "sqb-conditional-section"]
 * @exampleGroup Sharing
 * @example QR Code - <sqm-qr-code></sqm-qr-code>
 */
@Component({
  tag: "sqm-qr-code",
  shadow: true,
})
export class QrCode {
  /**
   * @uiName Title
   */
  @Prop() titleText?: string = "Share your QR code";

  /**
   * @uiName View QR code text
   */
  @Prop() viewCodeText?: string = "View QR code";

  /**
   * @uiName Download QR code text
   */
  @Prop() downloadCodeText?: string = "Download";

  /**
   * @uiName Print QR code text
   */
  @Prop() printCodeText?: string = "Print";
  /**
   * @uiName Header for error banner
   */
  @Prop() errorHeaderText?: string = "There was an error loading your QR code";

  /**
   * @uiName Description for error banner
   */
  @Prop() errorDescriptionText?: string =
    "Please refresh this page and try again";
  /**
   * @uiName Hide title
   */
  @Prop() hideTitle?: boolean = false;

  /**
   * @uiName QR code alignment
   * @uiType string
   * @uiEnum ["left", "center", "right"]
   * @uiEnumNames ["Left", "Center", "Right"]
   */
  @Prop() alignment?: "left" | "center" | "right" = "center";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<QRCodeViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  render() {
    const thisProps = getProps(this);
    const props = isDemo() ? useDemoQRCode(thisProps) : useQRCode(thisProps);

    return <QrCodeView {...props} />;
  }
}

function useDemoQRCode(props: QrCode): QRCodeViewProps {
  const [dialogIsOpen, setDialog] = useState(false);

  return deepmerge(
    {
      dialogIsOpen,
      hideTitle: props.hideTitle,
      showDialog: () => setDialog(true),
      hideDialog: () => setDialog(false),
      titleText: props.titleText,
      viewCodeText: props.viewCodeText,
      downloadCodeText: props.downloadCodeText,
      printCodeText: props.printCodeText,
      alignment: props.alignment,
      qrLink:
        "https://media.istockphoto.com/id/1251071788/vector/qr-code-bar-code-black-icon-digital-technology.jpg?s=612x612&w=0&k=20&c=maw4OqMSEegAdSo8Drm9HO7i1ddddvP2YaL1UuWbRig=",
      fireViewQrEvent: () => {
        console.log("View QR Code clicked");
      },
      createDownloadable: async () => {
        console.log("Download QR Code clicked");
      },
      createPrintable: async () => {
        console.log("Print QR Code clicked");
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
