import '../../stencil.core';
export declare class StatsContainer {
    container: HTMLElement;
    ishidden: boolean;
    paddingtop: string;
    paddingbottom: string;
    loading: boolean;
    stats: object;
    constructor();
    componentWillLoad(): any;
    statTypeUpdatedHandler(event: CustomEvent): void;
    statAddedHandler(event: CustomEvent): void;
    statPaths: string[];
    statPathRegexp: {
        regexp: RegExp;
        keys: any[];
    }[];
    setStatValue(child: HTMLElement): HTMLElement;
    getStatFromPath(path: any): any;
    getStatValue(statVariables: any): any;
    getRewardBalance(statVariables: any): any;
    onError(e: Error): void;
    render(): JSX.Element;
}
