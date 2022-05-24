import { ExchangeItem, ExchangeStep, Stages } from "./useRewardExchangeList";
export declare type RewardExchangeViewProps = {
  states: {
    selectedItem: ExchangeItem;
    selectedStep: ExchangeStep;
    redeemStage: string;
    amount: number;
    exchangeError?: boolean;
    queryError?: boolean;
    loading: boolean;
    open: boolean;
    content: {
      text: any;
    };
  };
  data: {
    exchangeList: any;
    fuelTankCode?: string;
  };
  callbacks: {
    exchangeReward: (e: unknown) => unknown;
    setStage: (stage?: Stages) => void;
    resetState: (refresh?: boolean) => void;
    setExchangeState: Function;
    copyFuelTankCode: () => void;
  };
  refs?: {
    canvasRef: any;
  };
};
export declare function RewardExchangeView(props: RewardExchangeViewProps): any;
