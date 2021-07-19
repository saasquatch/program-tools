import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h, State } from "@stencil/core";
import { AssetCardView, AssetCardViewProps } from "./sqm-asset-card-view";
import { useAssetCard } from "./useAssetCard";

/**
 * @uiName Asset Card
 */
@Component({
  tag: "sqm-asset-card",
  assetsDirs: ["../../assets"],
  shadow: true,
})
export class AssetCard {
  /**
   * @uiName Banner title
   * */
  @Prop() titleText: string;

  /**
   * @uiName Banner image
   * */
  @Prop() imgUrl: string;

  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const props = isDemo() ? useAssetCardDemo(this) : useAssetCard(this);
    return <AssetCardView {...props} />;
  }
}

function useAssetCardDemo(_props: AssetCard): AssetCardViewProps {
  return {
    text: {
      titleText: "Marketing Banner",
    },
    imgUrl: "../../assets/saasquatch-logo.png",
    callbacks: {},
  };
}
