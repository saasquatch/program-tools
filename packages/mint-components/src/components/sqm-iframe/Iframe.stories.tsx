import { h } from "@stencil/core";
import { IframeView, IframeViewProps } from "./sqm-iframe-view";
import scenario from "./sqm-iframe.feature";

export default {
  title: "Components/Iframe",
  parameters: {
    scenario,
  },
};

export const DefaultIframe = () => {
  const defaultProps: IframeViewProps = {
    iframeSrc: "https://example.com",
    iframeHeight: "100%",
    iframeWidth: "100%",
    iframeTitle: "example",
  };
  return (
    <div style={{ width: "1000px", height: "1000px" }}>
      <IframeView {...defaultProps} />
    </div>
  );
};

export const IframeError = () => {
  return (
    <div style={{ width: "1000px", height: "1000px" }}>
      <sqm-iframe></sqm-iframe>
    </div>
  );
};
