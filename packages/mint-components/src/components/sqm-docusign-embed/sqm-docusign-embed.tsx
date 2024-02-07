import { Component, Prop, h } from "@stencil/core";

declare global {
  interface Window {
    DocuSign: any;
  }
}

/**
 * @uiName DocuSign Embedded IFrame
 */
@Component({
  tag: "sqm-docusign-embed",
  shadow: true,
})
export class DocusignEmbedComponent {
  @Prop() url: string;

  render() {
    return (
      <iframe
        src={this.url}
        width="100%"
        height="100%"
        class="docusign-iframe"
      ></iframe>
    );
  }
}
