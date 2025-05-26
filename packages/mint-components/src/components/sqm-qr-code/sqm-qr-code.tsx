import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { QrCodeView, QRCodeViewProps } from "./sqm-qr-code-view";
import { getProps } from "../../utils/utils";
import { useQRCode } from "./useQRCode";
import deepmerge from "deepmerge";
import { isDemo } from "@saasquatch/component-boilerplate";
import { DemoData } from "../../global/demo";

/**
 * @uiName QR Code
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

function useDemoQRCode(props: QrCode): any {
  const [expanded, setExpanded] = useState(false);

  return deepmerge(
    {
      expanded,
      setExpanded,
      titleText: this.titleText,
      viewCodeText: this.viewCodeText,
      downloadCodeText: this.downloadCodeText,
      printCodeText: this.printCodeText,
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
