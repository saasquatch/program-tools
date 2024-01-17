import { h } from "@stencil/core";
import { IframeView, IframeViewProps } from "./sqm-iframe-view";
import scenario from "./sqm-iframe.feature";

export default {
  title: "Components/Iframe",
  parameters: {
    scenario,
  },
};

const props: IframeViewProps = {
  iframeSrc: "https://example.com",
  iframeHeight: "100%",
  iframeWidth: "100%",
};

export const DefaultIframe = () => {
  return (
    <div style={{ width: "1000px", height: "1000px" }}>
      <IframeView {...props} />
    </div>
  );
};

export const ReferralIframeError = () => {
  return (
    <div style={{ width: "1000px", height: "1000px" }}>
      <sqm-iframe></sqm-iframe>
    </div>
  );
};
