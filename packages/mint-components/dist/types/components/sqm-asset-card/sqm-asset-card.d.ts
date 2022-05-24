import { DemoData } from "../../global/demo";
import { AssetCardViewProps } from "./sqm-asset-card-view";
/**
 * @uiName Asset Card
 */
export declare class AssetCard {
  /**
   * @uiName Banner title
   */
  titleText: string;
  /**
   * @uiName Banner image
   */
  imgUrl: string;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<AssetCardViewProps>;
  ignored: boolean;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
