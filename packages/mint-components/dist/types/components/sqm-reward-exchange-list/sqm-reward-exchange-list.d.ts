import { RewardExchangeViewProps } from "./sqm-reward-exchange-list-view";
import { DemoData } from "../../global/demo";
/**
 * @uiName Reward Exchange List
 */
export declare class SqmRewardExchangeList {
  ignored: boolean;
  /**
   * @uiName Exchange button text
   */
  buttonText: string;
  /**
   * @uiName Exchange button text
   */
  notAvailableError: string;
  /**
   * @uiName Choose Reward Progress Title
   */
  chooseRewardTitle: string;
  /**
   * @uiName Choose Amount Progress Title
   */
  chooseAmountTitle: string;
  /**
   * @uiName Confirmation Progress Title
   */
  confirmationTitle: string;
  /**
   * @uiName Reward Title Text
   */
  rewardTitle: string;
  /**
   * @uiName Cancel Button Text
   */
  cancelText: string;
  /**
   * @uiName Back Button Text
   */
  backText: string;
  /**
   * @uiName Continue Button Text
   */
  continueText: string;
  /**
   * @uiName Continue to Confirmation Button Text
   */
  continueToConfirmationText: string;
  /**
   * @uiName Redeem Button Text
   */
  redeemText: string;
  /**
   * @uiName Confirmation Title Text
   */
  redeemTitle: string;
  /**
   * @uiName Redemption Success Message
   */
  redemptionSuccessText: string;
  /**
   * @uiName Reward Exchange Amount Text
   */
  sourceAmountMessage: string;
  /**
   * Shown when a user copies a fuel tank code
   *
   * @uiName Tool Tip Text
   */
  tooltiptext: string;
  /**
   * @uiName Done Text
   */
  doneText: string;
  /**
   * @uiName Select Amount Text
   */
  selectText: string;
  /**
   * @uiName Reward List Error Message
   */
  queryError: string;
  /**
   * @uiName Redemption Error Message
   */
  redemptionError: string;
  /**
   * @uiName Not Enough Available Error Message
   */
  notEnoughError: string;
  /**
   * @uiName Promo Code Text
   */
  promoCode: string;
  /**
   * @uiName Number of Skeleton Cards
   */
  skeletonCardNum: number;
  /**
   * Shown in the confirmation state.
   *
   * @uiName Reward Row Title
   */
  rewardNameTitle: string;
  /**
   * Shown in the confirmation state.
   *
   * @uiName Reward Amount Row Title
   */
  rewardAmountTitle: string;
  /**
   * Shown in the confirmation state.
   *
   * @uiName Cost Row Title
   */
  costTitle: string;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<RewardExchangeViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
