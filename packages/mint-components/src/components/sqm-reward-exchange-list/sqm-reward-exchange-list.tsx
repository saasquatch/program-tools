import { Component, h, Host, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import {
  ExchangeItem,
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
import { getMissingProps, getProps } from "../../utils/utils";
import { RequiredPropsError } from "../../utils/RequiredPropsError";

/**
 * @uiName Reward Exchange List
 */
@Component({
  tag: "sqm-reward-exchange-list",
  assetsDirs: ["assets"],
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
    "{unavailableReasonCode, select, US_TAX {US Tax limit} INSUFFICIENT_REDEEMABLE_CREDIT {Not enough points} other {Not available} }";

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
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
