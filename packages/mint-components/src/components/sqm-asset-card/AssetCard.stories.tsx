import { h } from "@stencil/core";
import { AssetCardView } from "./sqm-asset-card-view";

export default {
  title: "Components/Asset Card",
};

export const Default = () => {
  const props = {
    text: { titleText: "Marketing Banner" },
    imgUrl: "https://res.cloudinary.com/saasquatch/image/upload/v1634255445/squatch-assets/Copy_of_saasquatch-logo-tree-large-horizontal.png",
    callbacks: {},
  };
  return <AssetCardView {...props} />;
};

export const CardWithLongText = () => {
  const props = {
    text: { titleText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, sunt dolores? Dolore temporibus autem officia blanditiis minus in voluptatem molestiae!" },
    imgUrl: "https://res.cloudinary.com/saasquatch/image/upload/v1634255445/squatch-assets/Copy_of_saasquatch-logo-tree-large-horizontal.png",
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