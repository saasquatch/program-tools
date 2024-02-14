import { useRef } from "@saasquatch/universal-hooks";
import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  h,
} from "@stencil/core";

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
  @Element() el!: HTMLElement;
  @Prop() url: string;

  @Event({ bubbles: true }) docusignEvent: EventEmitter<{ status: string }>;

  messageCallback = (e) => {
    // ! TODO: Change this to the final url
    if (e.origin !== "https://staging.referralsaasquatch.com") return;

    this.docusignEvent.emit(e.data);
  };

  componentDidRender() {
    const iframe = this.el?.shadowRoot.querySelector(
      "iframe.docusign-iframe"
    ) as HTMLIFrameElement | null;
    if (!iframe) console.error("Could not find docusign iframe");

    window.addEventListener("message", this.messageCallback, false);
  }

  disconnectedCallback() {
    window.removeEventListener("message", this.messageCallback);
  }

  render() {
    return (
      <iframe
        src={this.url}
        width="100%"
        height="900px"
        class="docusign-iframe"
      ></iframe>
    );
  }
}
