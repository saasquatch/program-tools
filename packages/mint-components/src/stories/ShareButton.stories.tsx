import { h } from "@stencil/core";
import { ShareButtonView } from "../components/sqm-share-button/sqm-share-button-view";

export default {
  title: "Share Button",
};

export const WithIcon = () => {
  const props = { medium: "facebook", iconslot: "suffix" } as const;
  return <ShareButtonView {...props}>Share</ShareButtonView>;
};

export const WithIconOverride = () => {
  const props = {
    medium: "facebook",
    icon: "person-badge",
    iconslot: "suffix",
  } as const;
  return <ShareButtonView {...props}>Share</ShareButtonView>;
};

export const TextStyle = () => {
  const props = {
    medium: "facebook",
    type: "text",
    iconslot: "suffix",
  } as const;
  return <ShareButtonView {...props}>Share</ShareButtonView>;
};

export const WithoutIcon = () => {
  const props = { medium: "facebook", hideicon: true } as const;
  return <ShareButtonView {...props}>Share</ShareButtonView>;
};

export const TextStyleWithoutIcon = () => {
  const props = { medium: "facebook", type: "text", hideicon: true } as const;
  return <ShareButtonView {...props}>Share</ShareButtonView>;
};

export const FullStackIcon = () => {
  return (
    <div>
      <sqm-share-button medium="facebook" iconslot="prefix">
        <span>Facebook</span>
      </sqm-share-button>
      <br />
      <sqm-share-button medium="email" icon="envelope" iconslot="prefix">
        <span>Email</span>
      </sqm-share-button>
    </div>
  );
};
