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


export const CardWithLongText = () => {
  const props = {
    text: { titleText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, sunt dolores? Dolore temporibus autem officia blanditiis minus in voluptatem molestiae!" },
    imgUrl: "../../assets/saasquatch-logo.png",
    callbacks: {},
  };
  return <AssetCardView {...props} />;
};

export const CardWithNoImg = () => {
  const props = {
    text: { titleText: "Marketing Banner" },
    imgUrl: "",
    callbacks: {},
  };
  return <AssetCardView {...props} />;
};