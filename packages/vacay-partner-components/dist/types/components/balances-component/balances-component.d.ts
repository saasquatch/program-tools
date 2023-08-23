import '../../stencil.core';
import '../../stencil.core';
interface stats {
    CREDIT: Array<JSX.Element>;
    POINTS: Array<JSX.Element>;
    PCT_DISCOUNT: Array<JSX.Element>;
    FUELTANK: Array<JSX.Element>;
    GIFTCARD: Array<JSX.Element>;
}
export declare class BalancesComponent {
    ishidden: boolean;
    background: string;
    tablewidth: string;
    tablebackgroundcolor: string;
    borderradius: number;
    bordercolor: string;
    borderwidth: number;
    headerbackgroundcolor: string;
    headertextsize: string;
    headertextcolor: string;
    textsize: string;
    textcolor: string;
    fontfamily: string;
    cellpadding: number;
    headerpadding: number;
    flagwidth: number;
    showflag: boolean;
    showavailable: boolean;
    showearned: boolean;
    showclaimed: boolean;
    showdropdown: boolean;
    currencytext: string;
    currencytextcolor: string;
    availabletext: string;
    availabletextcolor: string;
    earnedtext: string;
    earnedtextcolor: string;
    redeemedtext: string;
    redeemedtextcolor: string;
    stats: stats;
    loading: boolean;
    selected: string;
    textEl: HTMLElement;
    componentWillLoad(): Promise<void>;
    changeBalance(event: any): void;
    render(): JSX.Element;
}
export {};
