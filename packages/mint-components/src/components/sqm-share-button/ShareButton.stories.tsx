import { h } from "@stencil/core";
import { ShareButtonView } from "./sqm-share-button-view";
import scenario from "./ShareButton.feature";

export default {
  title: "Components/Share Button",
  parameters: {
    scenario,
  },
};

export const WithIconPrefix = () => {
  const props = { medium: "whatsapp", iconslot: "prefix" } as const;
  return <ShareButtonView {...props}>Share</ShareButtonView>;
};

export const WithIconSuffix = () => {
  const props = { medium: "whatsapp", iconslot: "suffix" } as const;
  return <ShareButtonView {...props}>Share</ShareButtonView>;
};

export const WithIconOverride = () => {
  const props = {
    medium: "facebook",
    icon: "person-badge",
  } as const;
  return <ShareButtonView {...props}>Share</ShareButtonView>;
};

export const TextStyle = () => {
  const props = {
    medium: "facebook",
    type: "text",
  } as const;
  return <ShareButtonView {...props}>Share</ShareButtonView>;
};

export const WithoutIcon = () => {
  const props = { medium: "facebook", hideicon: true } as const;
  return <ShareButtonView {...props}>Share</ShareButtonView>;
};

export const WithoutText = () => {
  const props = { medium: "facebook", hidetext: true } as const;
  return <ShareButtonView {...props}>Share</ShareButtonView>;
};

export const TextStyleWithoutIcon = () => {
  const props = { medium: "facebook", type: "text", hideicon: true } as const;
  return <ShareButtonView {...props}>Share</ShareButtonView>;
};

export const WithCustomColors = () => {
  const props = {
    medium: "facebook",
    type: "text",
    backgroundcolor: "red",
    textcolor: "yellow",
    iconslot: "prefix",
  } as const;
  return <ShareButtonView {...props}>Facebook</ShareButtonView>;
};

export const WithCustomBorderRadius = () => {
  const props = {
    medium: "facebook",
    type: "text",
    borderradius: 8,
    iconslot: "prefix",
  } as const;
  return <ShareButtonView {...props}>Facebook</ShareButtonView>;
};

export const FullStackIcon = () => {
  return (
    <div>
      <sqm-share-button medium="facebook">
        <span>Facebook</span>
      </sqm-share-button>
      <br />
      <sqm-share-button medium="email">
        <span>Email</span>
      </sqm-share-button>
    </div>
  );
};

export const AllMediums = () => {
  return (
    <div>
      <sqm-share-button medium="facebook">
        <span>Facebook</span>
      </sqm-share-button>
      <br />
      <sqm-share-button medium="email">
        <span>Email</span>
      </sqm-share-button>
      <br />
      <sqm-share-button medium="whatsapp">
        <span>WhatsApp</span>
      </sqm-share-button>
      <br />
      <sqm-share-button medium="linkedin">
        <span>Linkedin</span>
      </sqm-share-button>
      <br />
      <sqm-share-button medium="twitter">
        <span>Post on X</span>
      </sqm-share-button>
      <br />
      <sqm-share-button medium="pinterest">
        <span>Pinterest</span>
      </sqm-share-button>
      <br />
      <sqm-share-button medium="fbmessenger">
        <span>Messenger</span>
      </sqm-share-button>
      <br />
      <sqm-share-button medium="sms">
        <span>SMS</span>
      </sqm-share-button>
      <br />
      <sqm-share-button medium="linemessenger">
        <span>Line Messenger</span>
      </sqm-share-button>
      <br />
      <sqm-share-button medium="direct">
        <span>Share</span>
      </sqm-share-button>
    </div>
  );
};
