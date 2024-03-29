import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h, State } from "@stencil/core";
import { DemoData } from "../../global/demo";
import { AssetCardView, AssetCardViewProps } from "./sqm-asset-card-view";
import { useAssetCard } from "./useAssetCard";
import deepmerge from "deepmerge";

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
   */
  @Prop() titleText: string;

  /**
   * @uiName Banner image
   */
  @Prop() imgUrl: string;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<AssetCardViewProps>;

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

function useAssetCardDemo(props: AssetCard): AssetCardViewProps {
  return deepmerge(
    {
      text: {
        titleText: "Marketing Banner",
      },
      imgUrl:
        "https://res.cloudinary.com/saasquatch/image/upload/v1634255445/squatch-assets/Copy_of_saasquatch-logo-tree-large-horizontal.png",
      callbacks: {},
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
