import { Component, h, Host, Prop, State, VNode } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import {
  ExchangeState,
  RewardExchangeProps,
  Stages,
  useRewardExchangeList,
  ExchangeStep,
} from "./useRewardExchangeList";
import {
  RewardExchangeViewProps,
  RewardExchangeView,
} from "./sqm-reward-exchange-list-view";
import { isDemo } from "@saasquatch/component-boilerplate";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";
import { demoRewardExchange, rewardExchange } from "./RewardExchangeListData";

/**
 * @uiName Reward Exchange
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
    "{unavailableReasonCode, select, US_TAX {US Tax limit} INSUFFICIENT_REDEEMABLE_CREDIT {{sourceValue} required} AVAILABILITY_PREDICATE {Not available} other {unavailableReasonCode} }";

  /**
   * @uiName Choose Reward Progress Title
   */
  @Prop() chooseRewardTitle: string = "Rewards";

  /**
   * @uiName Choose Amount Progress Title
   */
  @Prop() chooseAmountTitle: string = "Select";

  /**
   * @uiName Confirmation Progress Title
   */
  @Prop() confirmationTitle: string = "Confirm";

  /**
   * @uiName Reward Title Text
   */
  @Prop() rewardTitle: string = "Choose a reward";

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
  * Displayed as the header for the confirmation page.
   * @uiName Confirmation Title Text
   */
  @Prop() redeemTitle: string = "Confirm and redeem";

  /**
   * @uiName Redemption Success Message
   */
  @Prop() redemptionSuccessText: string =
    "Redeemed {sourceValue} for {destinationValue}";

  /**
   * @uiName Reward Exchange Amount Text
   */
  @Prop() sourceAmountMessage: string =
    "{ruleType, select, FIXED_GLOBAL_REWARD {{sourceValue}} other {{sourceMinValue} to {sourceMaxValue}}}";

  /**
   * Shown when a user copies a fuel tank code
   *
   * @uiName Tooltip Text
   */
  @Prop() tooltipText: string = "Copied";

  /**
   * @uiName Done Text
   */
  @Prop() doneText: string = "Done";

  /**
   * @uiName Select Amount Text
   */
  @Prop() selectText: string = "Select amount to receive";

  /**
   * @uiName Reward List Error Message
   */
  @Prop() queryError: string =
    "Unable to load reward exchange list. Please try again";

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
   * @uiName Reward Redeemed Text
   */
  @Prop() rewardRedeemedText: string = "Reward redeemed";

  /**
   * @uiName Promo Code Text
   */
  @Prop() promoCode: string = "Promo Code";

  /**
   * Set the number of placeholder cards to be shown in loading state.
   * 
   * @undocumented Loading Cards
   */
  @Prop() skeletonCardNum: number = 8;

  /**
   * Shown in the confirmation state.
   *
   * @uiName Reward Row Title
   */
  @Prop() rewardNameTitle: string = "Reward";

  /**
   * Shown in the confirmation state.
   *
   * @uiName Reward Amount Row Title
   */
  @Prop() rewardAmountTitle: string = "Reward Amount";

  /**
   * Shown in the confirmation state.
   *
   * @uiName Cost Row Title
   */
  @Prop() costTitle: string = "Cost to Redeem";

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
    const props: RewardExchangeProps = {
      ...getProps(this),
      empty: <EmptySlot />,
    };

    const { states, data, callbacks, refs } = isDemo()
      ? useRewardExchangeListDemo(props)
      : useRewardExchangeList(props);

    return (
      <Host style={{ display: "contents" }}>
        <RewardExchangeView
          states={states}
          data={data}
          callbacks={callbacks}
          refs={refs}
        ></RewardExchangeView>
      </Host>
    );
  }
}

function EmptySlot() {
  return (
    <slot name="empty">
      <sqm-empty
        emptyStateImage={
          "https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_exchange2.png"
        }
        emptyStateHeader="Redeem rewards"
        emptyStateText={
          "Use your points to redeem rewards once they become available"
        }
      />
    </slot>
  );
}

function useRewardExchangeListDemo(props: RewardExchangeProps) {
  return deepmerge(
    {
      states: {
        content: {
          text: props,
        },
        redeemStage: "chooseReward",
        amount: 0,
        selectedStep: undefined,
        selectedItem: undefined,
        open: false,
        exchangeError: false,
        queryError: false,
        loading: false,
        noExchangeOptions: false,
        empty: EmptySlot(),
      },

      data: {
        shareCode: "SHARECODE123",
        exchangeList: demoRewardExchange.data.exchangeList,
      },
      callbacks: {
        exchangeReward: () => {},
        setExchangeState: (_: ExchangeState) => {},
        setStage: (_: Stages) => {},
        resetState: () => {},
        copyFuelTankCode: () => {},
      },
      refs: {
        canvasRef: {},
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
