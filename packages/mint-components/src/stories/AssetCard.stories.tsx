import { h } from "@stencil/core";
import { AssetCardView } from "../components/sqm-asset-card/sqm-asset-card-view";

export default {
  title: "Asset Card",
};

export const Default = () => {
  const props = {
    text: { titleText: "Marketing Banner" },
    imgUrl: "../../assets/saasquatch-logo.png",
    callbacks: {},
  };
  return <AssetCardView {...props} />;
};
