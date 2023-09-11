import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
export declare class ReferralComponent {
    referral: Referral | ReferredByReferral;
    referraltype: "converted" | "pending" | "referrer";
    referralvariables: ReferralVariables;
    unknownuser: String;
    getName(): String;
    getIcon(): "icon-ok-circled" | "icon-attention";
    getContent(formatVariables: any): string;
    rewardIsExpired(): boolean;
    rewardIsCancelled(): boolean;
    getValue(): string;
    getValueContent(formatVariables: any): string;
    render(): JSX.Element;
}
