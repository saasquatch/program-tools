import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Prop, State } from "@stencil/core";
import { getProps, getMissingProps } from "../../utils/utils";
import { IframeView } from "./sqm-iframe-view";
import { RequiredPropsError } from "../../utils/RequiredPropsError";

/**
 * @uiName Iframe
 */
@Component({
  tag: "sqm-iframe",
})
export class SQMIframe {
  @State()
  ignored = true;
  /**
   * URL of iframe to display
   * @uiName IFrame source
   * @required
   */
  @Prop() iframeSrc: string;
  /**
   * Title of iframe
   * @uiName IFrame title
   * @required
   */
  @Prop() iframeTitle: string = "";
  /**
   * Define the height of the iframe with any valid CSS height value. Example: 100px, 5rem, or auto.
   * @uiName IFrame height
   */
  @Prop() iframeHeight: string = "100%";
  /**
   * Define the width of the iframe with any valid CSS width value. Example: 100px, 5rem, or auto.
   * @uiName IFrame width
   */
  @Prop() iframeWidth: string = "100%";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const missingProps = getMissingProps([
      {
        attribute: "iframe-src",
        value: this.iframeSrc,
      },
    ]);

    if (missingProps) {
      return (
        <RequiredPropsError
          missingProps={missingProps}
          heading={"An error occured while loading this page"}
          subheading={
            "A technical problem prevented this iframe from loading. Please contact us with the link to this page."
          }
          description={"Values for the following attributes are missing:"}
        />
      );
    }

    return (
      <Host style={{ display: "contents" }}>
        <IframeView {...getProps(this)}></IframeView>
      </Host>
    );
  }
}
