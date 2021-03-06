/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface SqhCloseButton {
        "text": string;
    }
    interface SqhCopyButton {
        "backgroundcolor": string;
        "borderradius": number;
        "codefontcolor": string;
        "codefontsize": number;
        "copyfailure": string;
        "copysuccess": string;
        "fontsize": number;
        "ishidden": boolean;
        "rewardkey": string;
        "text": string;
        "textcolor": string;
        "width": number;
    }
    interface SqhCopyLinkButton {
        "buttoncolor": string;
        "copyfailure": string;
        "copysuccess": string;
        "ishidden": boolean;
        "text": string;
        "textcolor": string;
    }
    interface SqhGlobalContainer {
        "background": string;
        "fontfamily": string;
        "loadingcolor": string;
        "maxwidth": string;
        "poweredby": boolean;
    }
    interface SqhImageComponent {
        "alignment": string;
        "borderradius": number;
        "css": string;
        "ishidden": boolean;
        "url": string;
        "width": number;
    }
    interface SqhPartnerStatComponent {
        "ishidden": boolean;
        "statcolor": string;
        "statdescription": string;
        "stattype": string;
        "statvalue": string;
    }
    interface SqhReferralCode {
    }
    interface SqhReferralComponent {
        "referral": Referral | ReferredByReferral;
        "referraltype": "converted" | "pending" | "referrer";
        "referralvariables": ReferralVariables;
        "unknownuser": String;
    }
    interface SqhReferralList {
        "cancelledcolor": string;
        "cancelledcontent": string;
        "cancelledvalue": string;
        "convertedcontent": string;
        "customernotecolor": string;
        "expiredcolor": string;
        "expiredcontent": string;
        "expiredvalue": string;
        "ishidden": boolean;
        "noreferralsyet": string;
        "paginateless": string;
        "paginatemore": string;
        "pendingcolor": string;
        "pendingcontent": string;
        "pendingvalue": string;
        "redeemedvalue": string;
        "referralnamecolor": string;
        "referraltextcolor": string;
        "referrercontent": string;
        "referrervalue": string;
        "rewardcolor": string;
        "showexpiry": boolean;
        "shownotes": boolean;
        "showreferrer": boolean;
        "unknownuser": string;
        "usefirstreward": boolean;
        "valuecontent": string;
    }
    interface SqhRewardsActions {
        "hidetext": string;
        "nexttext": string;
        "previoustext": string;
    }
    interface SqhShareButton {
        "backgroundcolor": string;
        "buttonClassName": string;
        "displayrule": string;
        "icon": string;
        "iconhorizontal": number;
        "iconsize": number;
        "iconvertical": number;
        "text": string;
        "textcolor": string;
        "type": string;
        "url": string;
    }
    interface SqhShareButtonContainer {
        "emailbackgroundcolor": string;
        "emailclassName": string;
        "emaildisplayrule": string;
        "emailicon": string;
        "emailiconhorizontal": number;
        "emailiconsize": number;
        "emailiconvertical": number;
        "emailtext": string;
        "emailtextcolor": string;
        "facebookbackgroundcolor": string;
        "facebookclassName": string;
        "facebookdisplayrule": string;
        "facebookicon": string;
        "facebookiconhorizontal": number;
        "facebookiconsize": number;
        "facebookiconvertical": number;
        "facebooktext": string;
        "facebooktextcolor": string;
        "ishidden": boolean;
        "linebackgroundcolor": string;
        "lineclassName": string;
        "linedisplayrule": string;
        "lineicon": string;
        "lineiconhorizontal": number;
        "lineiconsize": number;
        "lineiconvertical": number;
        "linetext": string;
        "linetextcolor": string;
        "linkedinbackgroundcolor": string;
        "linkedinclassName": string;
        "linkedindisplayrule": string;
        "linkedinicon": string;
        "linkediniconhorizontal": number;
        "linkediniconsize": number;
        "linkediniconvertical": number;
        "linkedintext": string;
        "linkedintextcolor": string;
        "messengerbackgroundcolor": string;
        "messengerclassName": string;
        "messengerdisplayrule": string;
        "messengericon": string;
        "messengericonhorizontal": number;
        "messengericonsize": number;
        "messengericonvertical": number;
        "messengertext": string;
        "messengertextcolor": string;
        "pinterestbackgroundcolor": string;
        "pinterestclassName": string;
        "pinterestdisplayrule": string;
        "pinteresticon": string;
        "pinteresticonhorizontal": number;
        "pinteresticonsize": number;
        "pinteresticonvertical": number;
        "pinteresttext": string;
        "pinteresttextcolor": string;
        "smsbackgroundcolor": string;
        "smsclassName": string;
        "smsdisplayrule": string;
        "smsicon": string;
        "smsiconhorizontal": number;
        "smsiconsize": number;
        "smsiconvertical": number;
        "smstext": string;
        "smstextcolor": string;
        "twitterbackgroundcolor": string;
        "twitterclassName": string;
        "twitterdisplayrule": string;
        "twittericon": string;
        "twittericonhorizontal": number;
        "twittericonsize": number;
        "twittericonvertical": number;
        "twittertext": string;
        "twittertextcolor": string;
        "whatsappbackgroundcolor": string;
        "whatsappclassName": string;
        "whatsappdisplayrule": string;
        "whatsappicon": string;
        "whatsappiconhorizontal": number;
        "whatsappiconsize": number;
        "whatsappiconvertical": number;
        "whatsapptext": string;
        "whatsapptextcolor": string;
    }
    interface SqhStatComponent {
        "ishidden": boolean;
        "statcolor": string;
        "statdescription": string;
        "stattype": string;
        "statvalue": string;
    }
    interface SqhStatsContainer {
        "ishidden": boolean;
        "paddingbottom": string;
        "paddingtop": string;
    }
    interface SqhTextComponent {
        "background": string;
        "color": string;
        "fontfamily": string;
        "fontsize": string;
        "height": string;
        "ishidden": boolean;
        "ismarkdown": boolean;
        "padding": string;
        "paddingbottom": string;
        "paddingtop": string;
        "text": string;
        "textalign": string;
    }
}
declare global {
    interface HTMLSqhCloseButtonElement extends Components.SqhCloseButton, HTMLStencilElement {
    }
    var HTMLSqhCloseButtonElement: {
        prototype: HTMLSqhCloseButtonElement;
        new (): HTMLSqhCloseButtonElement;
    };
    interface HTMLSqhCopyButtonElement extends Components.SqhCopyButton, HTMLStencilElement {
    }
    var HTMLSqhCopyButtonElement: {
        prototype: HTMLSqhCopyButtonElement;
        new (): HTMLSqhCopyButtonElement;
    };
    interface HTMLSqhCopyLinkButtonElement extends Components.SqhCopyLinkButton, HTMLStencilElement {
    }
    var HTMLSqhCopyLinkButtonElement: {
        prototype: HTMLSqhCopyLinkButtonElement;
        new (): HTMLSqhCopyLinkButtonElement;
    };
    interface HTMLSqhGlobalContainerElement extends Components.SqhGlobalContainer, HTMLStencilElement {
    }
    var HTMLSqhGlobalContainerElement: {
        prototype: HTMLSqhGlobalContainerElement;
        new (): HTMLSqhGlobalContainerElement;
    };
    interface HTMLSqhImageComponentElement extends Components.SqhImageComponent, HTMLStencilElement {
    }
    var HTMLSqhImageComponentElement: {
        prototype: HTMLSqhImageComponentElement;
        new (): HTMLSqhImageComponentElement;
    };
    interface HTMLSqhPartnerStatComponentElement extends Components.SqhPartnerStatComponent, HTMLStencilElement {
    }
    var HTMLSqhPartnerStatComponentElement: {
        prototype: HTMLSqhPartnerStatComponentElement;
        new (): HTMLSqhPartnerStatComponentElement;
    };
    interface HTMLSqhReferralCodeElement extends Components.SqhReferralCode, HTMLStencilElement {
    }
    var HTMLSqhReferralCodeElement: {
        prototype: HTMLSqhReferralCodeElement;
        new (): HTMLSqhReferralCodeElement;
    };
    interface HTMLSqhReferralComponentElement extends Components.SqhReferralComponent, HTMLStencilElement {
    }
    var HTMLSqhReferralComponentElement: {
        prototype: HTMLSqhReferralComponentElement;
        new (): HTMLSqhReferralComponentElement;
    };
    interface HTMLSqhReferralListElement extends Components.SqhReferralList, HTMLStencilElement {
    }
    var HTMLSqhReferralListElement: {
        prototype: HTMLSqhReferralListElement;
        new (): HTMLSqhReferralListElement;
    };
    interface HTMLSqhRewardsActionsElement extends Components.SqhRewardsActions, HTMLStencilElement {
    }
    var HTMLSqhRewardsActionsElement: {
        prototype: HTMLSqhRewardsActionsElement;
        new (): HTMLSqhRewardsActionsElement;
    };
    interface HTMLSqhShareButtonElement extends Components.SqhShareButton, HTMLStencilElement {
    }
    var HTMLSqhShareButtonElement: {
        prototype: HTMLSqhShareButtonElement;
        new (): HTMLSqhShareButtonElement;
    };
    interface HTMLSqhShareButtonContainerElement extends Components.SqhShareButtonContainer, HTMLStencilElement {
    }
    var HTMLSqhShareButtonContainerElement: {
        prototype: HTMLSqhShareButtonContainerElement;
        new (): HTMLSqhShareButtonContainerElement;
    };
    interface HTMLSqhStatComponentElement extends Components.SqhStatComponent, HTMLStencilElement {
    }
    var HTMLSqhStatComponentElement: {
        prototype: HTMLSqhStatComponentElement;
        new (): HTMLSqhStatComponentElement;
    };
    interface HTMLSqhStatsContainerElement extends Components.SqhStatsContainer, HTMLStencilElement {
    }
    var HTMLSqhStatsContainerElement: {
        prototype: HTMLSqhStatsContainerElement;
        new (): HTMLSqhStatsContainerElement;
    };
    interface HTMLSqhTextComponentElement extends Components.SqhTextComponent, HTMLStencilElement {
    }
    var HTMLSqhTextComponentElement: {
        prototype: HTMLSqhTextComponentElement;
        new (): HTMLSqhTextComponentElement;
    };
    interface HTMLElementTagNameMap {
        "sqh-close-button": HTMLSqhCloseButtonElement;
        "sqh-copy-button": HTMLSqhCopyButtonElement;
        "sqh-copy-link-button": HTMLSqhCopyLinkButtonElement;
        "sqh-global-container": HTMLSqhGlobalContainerElement;
        "sqh-image-component": HTMLSqhImageComponentElement;
        "sqh-partner-stat-component": HTMLSqhPartnerStatComponentElement;
        "sqh-referral-code": HTMLSqhReferralCodeElement;
        "sqh-referral-component": HTMLSqhReferralComponentElement;
        "sqh-referral-list": HTMLSqhReferralListElement;
        "sqh-rewards-actions": HTMLSqhRewardsActionsElement;
        "sqh-share-button": HTMLSqhShareButtonElement;
        "sqh-share-button-container": HTMLSqhShareButtonContainerElement;
        "sqh-stat-component": HTMLSqhStatComponentElement;
        "sqh-stats-container": HTMLSqhStatsContainerElement;
        "sqh-text-component": HTMLSqhTextComponentElement;
    }
}
declare namespace LocalJSX {
    interface SqhCloseButton {
        "text"?: string;
    }
    interface SqhCopyButton {
        "backgroundcolor"?: string;
        "borderradius"?: number;
        "codefontcolor"?: string;
        "codefontsize"?: number;
        "copyfailure"?: string;
        "copysuccess"?: string;
        "fontsize"?: number;
        "ishidden"?: boolean;
        "rewardkey"?: string;
        "text"?: string;
        "textcolor"?: string;
        "width"?: number;
    }
    interface SqhCopyLinkButton {
        "buttoncolor"?: string;
        "copyfailure"?: string;
        "copysuccess"?: string;
        "ishidden"?: boolean;
        "text"?: string;
        "textcolor"?: string;
    }
    interface SqhGlobalContainer {
        "background"?: string;
        "fontfamily"?: string;
        "loadingcolor"?: string;
        "maxwidth"?: string;
        "poweredby"?: boolean;
    }
    interface SqhImageComponent {
        "alignment"?: string;
        "borderradius"?: number;
        "css"?: string;
        "ishidden"?: boolean;
        "url"?: string;
        "width"?: number;
    }
    interface SqhPartnerStatComponent {
        "ishidden"?: boolean;
        "onStatAdded"?: (event: CustomEvent<any>) => void;
        "onStatTypeUpdated"?: (event: CustomEvent<any>) => void;
        "statcolor"?: string;
        "statdescription"?: string;
        "stattype"?: string;
        "statvalue"?: string;
    }
    interface SqhReferralCode {
    }
    interface SqhReferralComponent {
        "referral"?: Referral | ReferredByReferral;
        "referraltype"?: "converted" | "pending" | "referrer";
        "referralvariables"?: ReferralVariables;
        "unknownuser"?: String;
    }
    interface SqhReferralList {
        "cancelledcolor"?: string;
        "cancelledcontent"?: string;
        "cancelledvalue"?: string;
        "convertedcontent"?: string;
        "customernotecolor"?: string;
        "expiredcolor"?: string;
        "expiredcontent"?: string;
        "expiredvalue"?: string;
        "ishidden"?: boolean;
        "noreferralsyet"?: string;
        "paginateless"?: string;
        "paginatemore"?: string;
        "pendingcolor"?: string;
        "pendingcontent"?: string;
        "pendingvalue"?: string;
        "redeemedvalue"?: string;
        "referralnamecolor"?: string;
        "referraltextcolor"?: string;
        "referrercontent"?: string;
        "referrervalue"?: string;
        "rewardcolor"?: string;
        "showexpiry"?: boolean;
        "shownotes"?: boolean;
        "showreferrer"?: boolean;
        "unknownuser"?: string;
        "usefirstreward"?: boolean;
        "valuecontent"?: string;
    }
    interface SqhRewardsActions {
        "hidetext"?: string;
        "nexttext"?: string;
        "previoustext"?: string;
    }
    interface SqhShareButton {
        "backgroundcolor"?: string;
        "buttonClassName"?: string;
        "displayrule"?: string;
        "icon"?: string;
        "iconhorizontal"?: number;
        "iconsize"?: number;
        "iconvertical"?: number;
        "text"?: string;
        "textcolor"?: string;
        "type"?: string;
        "url"?: string;
    }
    interface SqhShareButtonContainer {
        "emailbackgroundcolor"?: string;
        "emailclassName"?: string;
        "emaildisplayrule"?: string;
        "emailicon"?: string;
        "emailiconhorizontal"?: number;
        "emailiconsize"?: number;
        "emailiconvertical"?: number;
        "emailtext"?: string;
        "emailtextcolor"?: string;
        "facebookbackgroundcolor"?: string;
        "facebookclassName"?: string;
        "facebookdisplayrule"?: string;
        "facebookicon"?: string;
        "facebookiconhorizontal"?: number;
        "facebookiconsize"?: number;
        "facebookiconvertical"?: number;
        "facebooktext"?: string;
        "facebooktextcolor"?: string;
        "ishidden"?: boolean;
        "linebackgroundcolor"?: string;
        "lineclassName"?: string;
        "linedisplayrule"?: string;
        "lineicon"?: string;
        "lineiconhorizontal"?: number;
        "lineiconsize"?: number;
        "lineiconvertical"?: number;
        "linetext"?: string;
        "linetextcolor"?: string;
        "linkedinbackgroundcolor"?: string;
        "linkedinclassName"?: string;
        "linkedindisplayrule"?: string;
        "linkedinicon"?: string;
        "linkediniconhorizontal"?: number;
        "linkediniconsize"?: number;
        "linkediniconvertical"?: number;
        "linkedintext"?: string;
        "linkedintextcolor"?: string;
        "messengerbackgroundcolor"?: string;
        "messengerclassName"?: string;
        "messengerdisplayrule"?: string;
        "messengericon"?: string;
        "messengericonhorizontal"?: number;
        "messengericonsize"?: number;
        "messengericonvertical"?: number;
        "messengertext"?: string;
        "messengertextcolor"?: string;
        "pinterestbackgroundcolor"?: string;
        "pinterestclassName"?: string;
        "pinterestdisplayrule"?: string;
        "pinteresticon"?: string;
        "pinteresticonhorizontal"?: number;
        "pinteresticonsize"?: number;
        "pinteresticonvertical"?: number;
        "pinteresttext"?: string;
        "pinteresttextcolor"?: string;
        "smsbackgroundcolor"?: string;
        "smsclassName"?: string;
        "smsdisplayrule"?: string;
        "smsicon"?: string;
        "smsiconhorizontal"?: number;
        "smsiconsize"?: number;
        "smsiconvertical"?: number;
        "smstext"?: string;
        "smstextcolor"?: string;
        "twitterbackgroundcolor"?: string;
        "twitterclassName"?: string;
        "twitterdisplayrule"?: string;
        "twittericon"?: string;
        "twittericonhorizontal"?: number;
        "twittericonsize"?: number;
        "twittericonvertical"?: number;
        "twittertext"?: string;
        "twittertextcolor"?: string;
        "whatsappbackgroundcolor"?: string;
        "whatsappclassName"?: string;
        "whatsappdisplayrule"?: string;
        "whatsappicon"?: string;
        "whatsappiconhorizontal"?: number;
        "whatsappiconsize"?: number;
        "whatsappiconvertical"?: number;
        "whatsapptext"?: string;
        "whatsapptextcolor"?: string;
    }
    interface SqhStatComponent {
        "ishidden"?: boolean;
        "onStatAdded"?: (event: CustomEvent<any>) => void;
        "onStatTypeUpdated"?: (event: CustomEvent<any>) => void;
        "statcolor"?: string;
        "statdescription"?: string;
        "stattype"?: string;
        "statvalue"?: string;
    }
    interface SqhStatsContainer {
        "ishidden"?: boolean;
        "paddingbottom"?: string;
        "paddingtop"?: string;
    }
    interface SqhTextComponent {
        "background"?: string;
        "color"?: string;
        "fontfamily"?: string;
        "fontsize"?: string;
        "height"?: string;
        "ishidden"?: boolean;
        "ismarkdown"?: boolean;
        "padding"?: string;
        "paddingbottom"?: string;
        "paddingtop"?: string;
        "text"?: string;
        "textalign"?: string;
    }
    interface IntrinsicElements {
        "sqh-close-button": SqhCloseButton;
        "sqh-copy-button": SqhCopyButton;
        "sqh-copy-link-button": SqhCopyLinkButton;
        "sqh-global-container": SqhGlobalContainer;
        "sqh-image-component": SqhImageComponent;
        "sqh-partner-stat-component": SqhPartnerStatComponent;
        "sqh-referral-code": SqhReferralCode;
        "sqh-referral-component": SqhReferralComponent;
        "sqh-referral-list": SqhReferralList;
        "sqh-rewards-actions": SqhRewardsActions;
        "sqh-share-button": SqhShareButton;
        "sqh-share-button-container": SqhShareButtonContainer;
        "sqh-stat-component": SqhStatComponent;
        "sqh-stats-container": SqhStatsContainer;
        "sqh-text-component": SqhTextComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "sqh-close-button": LocalJSX.SqhCloseButton & JSXBase.HTMLAttributes<HTMLSqhCloseButtonElement>;
            "sqh-copy-button": LocalJSX.SqhCopyButton & JSXBase.HTMLAttributes<HTMLSqhCopyButtonElement>;
            "sqh-copy-link-button": LocalJSX.SqhCopyLinkButton & JSXBase.HTMLAttributes<HTMLSqhCopyLinkButtonElement>;
            "sqh-global-container": LocalJSX.SqhGlobalContainer & JSXBase.HTMLAttributes<HTMLSqhGlobalContainerElement>;
            "sqh-image-component": LocalJSX.SqhImageComponent & JSXBase.HTMLAttributes<HTMLSqhImageComponentElement>;
            "sqh-partner-stat-component": LocalJSX.SqhPartnerStatComponent & JSXBase.HTMLAttributes<HTMLSqhPartnerStatComponentElement>;
            "sqh-referral-code": LocalJSX.SqhReferralCode & JSXBase.HTMLAttributes<HTMLSqhReferralCodeElement>;
            "sqh-referral-component": LocalJSX.SqhReferralComponent & JSXBase.HTMLAttributes<HTMLSqhReferralComponentElement>;
            "sqh-referral-list": LocalJSX.SqhReferralList & JSXBase.HTMLAttributes<HTMLSqhReferralListElement>;
            "sqh-rewards-actions": LocalJSX.SqhRewardsActions & JSXBase.HTMLAttributes<HTMLSqhRewardsActionsElement>;
            "sqh-share-button": LocalJSX.SqhShareButton & JSXBase.HTMLAttributes<HTMLSqhShareButtonElement>;
            "sqh-share-button-container": LocalJSX.SqhShareButtonContainer & JSXBase.HTMLAttributes<HTMLSqhShareButtonContainerElement>;
            "sqh-stat-component": LocalJSX.SqhStatComponent & JSXBase.HTMLAttributes<HTMLSqhStatComponentElement>;
            "sqh-stats-container": LocalJSX.SqhStatsContainer & JSXBase.HTMLAttributes<HTMLSqhStatsContainerElement>;
            "sqh-text-component": LocalJSX.SqhTextComponent & JSXBase.HTMLAttributes<HTMLSqhTextComponentElement>;
        }
    }
}
