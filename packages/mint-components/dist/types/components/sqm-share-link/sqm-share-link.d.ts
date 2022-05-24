import { ShareLinkViewProps } from "./sqm-share-link-view";
import { DemoData } from "../../global/demo";
/**
 * @uiName Share Link
 */
export declare class ShareLink {
  /**
   * The ID of the program that should generate the link. Defaults to the program ID in context where this widget is loaded.
   *
   * @uiName Program ID
   */
  programId?: string;
  /**
   * This is shown after someone has successfully copied the link to the clipboard.
   *
   * @uiName Tooltip text
   */
  tooltiptext: string;
  /**
   * The number of milliseconds that the tooltip will appear for
   *
   * @uiName Tooltip lifespan
   */
  tooltiplifespan: number;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<ShareLinkViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
