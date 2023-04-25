import '../../stencil.core';
interface stats {
    rewardBalanceDetails: Array<balance>;
}
interface balance {
    unit: string;
    rewardUnit: rewardUnit;
    prettyAvailableValue: string;
    prettyAssignedCredit: string;
    prettyRedeemedCredit: string;
}
interface rewardUnit {
    currency: currency;
}
interface currency {
    symbol: string;
    displayName: string;
    currencyCode: string;
}
export declare class ProgressIndicator {
    ishidden: boolean;
    textcolor: string;
    align: string;
    progresstype: string;
    earned: string;
    progress: string;
    progresswidth: string;
    percentagecolor: string;
    percentagesize: string;
    progresscolor: string;
    stats: stats;
    rewardStats: any;
    progressMessage: string;
    rewardComplete: boolean;
    loading: boolean;
    LoadingState(): JSX.Element;
    componentWillLoad(): Promise<void>;
    componentDidLoad(): Promise<void>;
    getProgress(): void;
    render(): JSX.Element;
}
export {};
