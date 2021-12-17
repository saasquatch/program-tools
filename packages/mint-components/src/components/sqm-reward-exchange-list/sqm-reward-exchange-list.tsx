import { Component, h, Host, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import {
  ExchangeState,
  Stages,
  useRewardExchangeList,
} from "./useRewardExchangeList";
import {
  RewardExchangeViewProps,
  RewardExchangeView,
} from "./sqm-reward-exchange-list-view";
import { isDemo } from "@saasquatch/component-boilerplate";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";

/**
 * @uiName Reward Exchange List
 */
@Component({
  tag: "sqm-reward-exchange-list",
  assetsDirs: ["assets"],
  shadow: true,
})
export class SqmRewardExchangeList {
  @State()
  ignored = true;

  /**
   * @uiName Exchange button text
   */
  @Prop() buttonText: string = "Exchange Rewards";

  /**
   * @uiName Exchange button text
   */
  @Prop() notAvailableError: string =
    "{unavailableReason, select, US_TAX {US Tax limit} INSUFFICIENT_REDEEMABLE_CREDIT {{sourceValue} required} other {Not available} }";

  /**
   * @uiName Choose Reward Progress Title
   */
  @Prop() chooseRewardTitle: string = "Choose reward";

  /**
   * @uiName Choose Amount Progress Title
   */
  @Prop() chooseAmountTitle: string = "Amount";

  /**
   * @uiName Confirmation Progress Title
   */
  @Prop() confirmationTitle: string = "Confirm";

  /**
   * @uiName Cancel Button Text
   */
  @Prop() cancelText: string = "Cancel";

  /**
   * @uiName Back Button Text
   */
  @Prop() backText: string = "Back";

  /**
   * @uiName Continue Button Text
   */
  @Prop() continueText: string = "Continue";

  /**
   * @uiName Continue to Confirmation Button Text
   */
  @Prop() continueToConfirmationText: string = "Continue to confirmation";

  /**
   * @uiName Redeem Button Text
   */
  @Prop() redeemText: string = "Redeem";

  /**
   * @uiName Confirmation Title Text
   */
  @Prop() redeemTitle: string = "Confirm and redeem";

  /**
   * @uiName Redemption Success Message
   */
  @Prop() redemptionSuccessText: string =
    "Successfully redeemed {sourceValue} for {destinationValue}";

  /**
   * @uiName Done Text
   */
  @Prop() doneText: string = "Done";

  /**
   * @uiName Reward List Error Message
   */
  @Prop() queryError: string = "Unable to load reward exchange list";

  /**
   * @uiName Redemption Error Message
   */
  @Prop() redemptionError: string =
    "An error occured trying to redeem this reward. Please try again";

  /**
   * @uiName Not Enough Available Error Message
   */
  @Prop() notEnoughError: string =
    "Not enough {sourceUnit} to redeem for this reward";

  /**
   * @uiName Select Amount Text
   */
  @Prop() selectAmount: string = "Select amount to receive";

  /**
   * @uiName Number of Skeleton Cards
   */
  @Prop() skeletonCardNum: number = 8;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<RewardExchangeViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    // const missingProps = getMissingProps([
    //   {
    //     attribute: "listType",
    //     value: this.listType,
    //   },
    // ]);

    // if (missingProps) {
    //   return <RequiredPropsError missingProps={missingProps} />;
    // }

    const { states, data, callbacks } = isDemo()
      ? useRewardExchangeListDemo(getProps(this))
      : useRewardExchangeList(getProps(this));

    return (
      <Host style={{ display: "contents" }}>
        <RewardExchangeView
          states={states}
          data={data}
          callbacks={callbacks}
        ></RewardExchangeView>
      </Host>
    );
  }
}

function useRewardExchangeListDemo(props: SqmRewardExchangeList) {
  return deepmerge(
    {
      states: {
        content: {
          text: props,
        },
        redeemStage: "chooseReward",
        amount: 0,
        selectedStep: undefined,
        exchangeError: false,
        queryError: false,
        loading: false,
      },
      data: {
        shareCode: "SHARECODE123",
      },
      callbacks: {
        exchangeReward: () => {},
        setExchangeState: (_: ExchangeState) => {},
        setStage: (_: Stages) => {},
        resetState: () => {},
        copyFuelTankCode: () => {},
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
