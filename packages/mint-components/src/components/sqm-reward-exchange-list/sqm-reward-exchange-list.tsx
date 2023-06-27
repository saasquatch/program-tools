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
 * @slots [{"name":"empty", "title":"Empty State"}]
 * @exampleGroup Rewards
 * @example Reward Exchange - <sqm-reward-exchange-list not-available-error="{unavailableReasonCode, select, US_TAX {US Tax limit} INSUFFICIENT_REDEEMABLE_CREDIT {{sourceValue} required} AVAILABILITY_PREDICATE {Not available} other {{unavailableReasonCode}} }" choose-reward-title="Rewards" choose-amount-title="Select" confirmation-title="Confirm" reward-title="Choose a reward" cancel-text="Cancel" back-text="Back" continue-text="Continue" continue-to-confirmation-text="Continue to confirmation" redeem-text="Redeem" redeem-title="Confirm and redeem" redemption-success-text="Redeemed {sourceValue} for {destinationValue}" source-amount-message="{ruleType, select, FIXED_GLOBAL_REWARD {{sourceValue}} other {{sourceMinValue} to {sourceMaxValue}}}" tooltip-text="Copied" done-text="Done" select-text="Select amount to receive" query-error="Unable to load reward exchange list. Please try again" redemption-error="An error occured trying to redeem this reward. Please try again" not-enough-error="Not enough {sourceUnit} to redeem for this reward" reward-redeemed-text="Reward redeemed" promo-code="Promo Code" skeleton-card-num=8 reward-name-title="Reward" reward-amount-title="Reward Amount" cost-title="Cost to Redeem"><sqm-empty empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_exchange2.png" empty-state-header="Redeem rewards" empty-state-text="Use your points to redeem rewards once they become available" slot="empty"></sqm-empty></sqm-reward-exchange-list>
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
   * Error message shown when reward is not available
   *
   * @uiName Not available error
   * @uiWidget textArea
   */
  @Prop() notAvailableError: string =
    "{unavailableReasonCode, select, US_TAX {US Tax limit} INSUFFICIENT_REDEEMABLE_CREDIT {{sourceValue} required} AVAILABILITY_PREDICATE {Not available} other {{unavailableReasonCode}} }";

  /**
   * @uiName Choose reward progress title
   */
  @Prop() chooseRewardTitle: string = "Rewards";

  /**
   * @uiName Choose amount progress title
   */
  @Prop() chooseAmountTitle: string = "Select";

  /**
   * @uiName Confirmation progress title
   */
  @Prop() confirmationTitle: string = "Confirm";

  /**
   * @uiName Reward title text
   */
  @Prop() rewardTitle: string = "Choose a reward";

  /**
   * @uiName Cancel button text
   */
  @Prop() cancelText: string = "Cancel";

  /**
   * @uiName Back button text
   */
  @Prop() backText: string = "Back";

  /**
   * @uiName Continue button text
   */
  @Prop() continueText: string = "Continue";

  /**
   * Displayed on the reward selection page.
   * @uiName Continue to confirmation button text
   */
  @Prop() continueToConfirmationText: string = "Continue to confirmation";

  /**
   * @uiName Redeem button text
   */
  @Prop() redeemText: string = "Redeem";

  /**
   * Displayed as the header for the confirmation page.
   *
   * @uiName Confirmation title text
   */
  @Prop() redeemTitle: string = "Confirm and redeem";

  /**
   * Displayed on the success screen when a user successfully exchanges for a reward.
   *
   * @uiName Redemption success message
   * @uiWidget textArea
   */
  @Prop() redemptionSuccessText: string =
    "Redeemed {sourceValue} for {destinationValue}";

  /**
   * Displayed on the reward exchange cards.
   *
   * @uiName Reward exchange amount text
   * @uiWidget textArea
   */
  @Prop() sourceAmountMessage: string =
    "{ruleType, select, FIXED_GLOBAL_REWARD {{sourceValue}} other {{sourceMinValue} to {sourceMaxValue}}}";

  /**
   * Shown when a user copies a fuel tank code
   *
   * @uiName Tooltip text
   */
  @Prop() tooltipText: string = "Copied";

  /**
   * @uiName Done text
   */
  @Prop() doneText: string = "Done";

  /**
   * @uiName Select amount text
   * @uiWidget textArea
   */
  @Prop() selectText: string = "Select amount to receive";

  /**
   * Shown if an error occurs when loading the reward exchange.
   *
   * @uiName Reward list error message
   * @uiWidget textArea
   */
  @Prop() queryError: string =
    "Unable to load reward exchange list. Please try again";

  /**
   * Shown if an error occurs during the reward exchange.
   *
   * @uiName Redemption error message
   * @uiWidget textArea
   */
  @Prop() redemptionError: string =
    "An error occured trying to redeem this reward. Please try again";

  /**
   * @uiName Not enough error message
   * @uiWidget textArea
   */
  @Prop() notEnoughError: string =
    "Not enough {sourceUnit} to redeem for this reward";

  /**
   * @uiName Reward redeemed text
   */
  @Prop() rewardRedeemedText: string = "Reward redeemed";

  /**
   * @uiName Promo code text
   */
  @Prop() promoCode: string = "Promo Code";

  /**
   * Set the number of placeholder cards to be shown in loading state.
   *
   * @uiName Loading cards
   */
  @Prop() skeletonCardNum: number = 8;

  /**
   * Shown in the confirmation state.
   *
   * @uiName Reward row title
   */
  @Prop() rewardNameTitle: string = "Reward";

  /**
   * Shown in the confirmation state.
   *
   * @uiName Reward amount row title
   */
  @Prop() rewardAmountTitle: string = "Reward Amount";

  /**
   * Shown in the confirmation state.
   *
   * @uiName Cost row title
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
