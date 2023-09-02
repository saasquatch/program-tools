import { ApolloClient } from "apollo-client";
export interface WidgetIdent {
    tenantAlias: string;
    appDomain: string;
    token: string;
    userId: string;
    accountId: string;
    engagementMedium: "POPUP" | "EMBED" | string;
    programId: string;
}
/**
 * Links up to Squatch.js running in the parent frame, and exposes an API for trigger things outside of the scope of a single widget.
 */
export interface SquatchJSApi {
    open(): any;
    close(): any;
}
export declare function widgetIdent(): WidgetIdent;
declare const API: {
    version: string;
    analytics: {
        shareEvent(shareMedium: string): Promise<any>;
        loadEvent(): Promise<{
            event: string;
        }>;
    };
    graphql: {
        getClient(): ApolloClient<import("../../../../../../../../../Users/Sam/Documents/GitHub/program-tools/packages/vanilla-components/node_modules/apollo-cache-inmemory/lib/types").NormalizedCacheObject>;
        getUserFragment(userFragment: any, fragmentVariables: any): any;
        getShareLink(): any;
        getReferrals(offset?: number, limit?: number): any;
        getStats(): any;
        getReferralCode(): Promise<string>;
        getFueltankCode(rewardKey: any): Promise<SimpleObject>;
        getMessageLinks(mediums: string[]): any;
    };
    ui: any;
};
export { API };
/**
 * Key-value simple object
 */
export interface SimpleObject {
    [key: string]: any;
}
