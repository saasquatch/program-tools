import './stencil.core';
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */

import './stencil.core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLElement {
    componentOnReady?: () => Promise<this | null>;
  }

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}


declare global {

  namespace StencilComponents {
    interface SqhCloseButton {
      'text': string;
    }
  }

  interface HTMLSqhCloseButtonElement extends StencilComponents.SqhCloseButton, HTMLStencilElement {}

  var HTMLSqhCloseButtonElement: {
    prototype: HTMLSqhCloseButtonElement;
    new (): HTMLSqhCloseButtonElement;
  };
  interface HTMLElementTagNameMap {
    'sqh-close-button': HTMLSqhCloseButtonElement;
  }
  interface ElementTagNameMap {
    'sqh-close-button': HTMLSqhCloseButtonElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'sqh-close-button': JSXElements.SqhCloseButtonAttributes;
    }
  }
  namespace JSXElements {
    export interface SqhCloseButtonAttributes extends HTMLAttributes {
      'text'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface SqhCopyButton {
      'backgroundcolor': string;
      'borderradius': number;
      'codefontcolor': string;
      'codefontsize': number;
      'copyfailure': string;
      'copysuccess': string;
      'fontsize': number;
      'ishidden': boolean;
      'rewardkey': string;
      'text': string;
      'textcolor': string;
      'width': number;
    }
  }

  interface HTMLSqhCopyButtonElement extends StencilComponents.SqhCopyButton, HTMLStencilElement {}

  var HTMLSqhCopyButtonElement: {
    prototype: HTMLSqhCopyButtonElement;
    new (): HTMLSqhCopyButtonElement;
  };
  interface HTMLElementTagNameMap {
    'sqh-copy-button': HTMLSqhCopyButtonElement;
  }
  interface ElementTagNameMap {
    'sqh-copy-button': HTMLSqhCopyButtonElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'sqh-copy-button': JSXElements.SqhCopyButtonAttributes;
    }
  }
  namespace JSXElements {
    export interface SqhCopyButtonAttributes extends HTMLAttributes {
      'backgroundcolor'?: string;
      'borderradius'?: number;
      'codefontcolor'?: string;
      'codefontsize'?: number;
      'copyfailure'?: string;
      'copysuccess'?: string;
      'fontsize'?: number;
      'ishidden'?: boolean;
      'rewardkey'?: string;
      'text'?: string;
      'textcolor'?: string;
      'width'?: number;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface SqhCopyLinkButton {
      'buttoncolor': string;
      'copyfailure': string;
      'copysuccess': string;
      'ishidden': boolean;
      'text': string;
      'textcolor': string;
    }
  }

  interface HTMLSqhCopyLinkButtonElement extends StencilComponents.SqhCopyLinkButton, HTMLStencilElement {}

  var HTMLSqhCopyLinkButtonElement: {
    prototype: HTMLSqhCopyLinkButtonElement;
    new (): HTMLSqhCopyLinkButtonElement;
  };
  interface HTMLElementTagNameMap {
    'sqh-copy-link-button': HTMLSqhCopyLinkButtonElement;
  }
  interface ElementTagNameMap {
    'sqh-copy-link-button': HTMLSqhCopyLinkButtonElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'sqh-copy-link-button': JSXElements.SqhCopyLinkButtonAttributes;
    }
  }
  namespace JSXElements {
    export interface SqhCopyLinkButtonAttributes extends HTMLAttributes {
      'buttoncolor'?: string;
      'copyfailure'?: string;
      'copysuccess'?: string;
      'ishidden'?: boolean;
      'text'?: string;
      'textcolor'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface SqhGlobalContainer {
      'background': string;
      'fontfamily': string;
      'maxwidth': string;
      'poweredby': boolean;
    }
  }

  interface HTMLSqhGlobalContainerElement extends StencilComponents.SqhGlobalContainer, HTMLStencilElement {}

  var HTMLSqhGlobalContainerElement: {
    prototype: HTMLSqhGlobalContainerElement;
    new (): HTMLSqhGlobalContainerElement;
  };
  interface HTMLElementTagNameMap {
    'sqh-global-container': HTMLSqhGlobalContainerElement;
  }
  interface ElementTagNameMap {
    'sqh-global-container': HTMLSqhGlobalContainerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'sqh-global-container': JSXElements.SqhGlobalContainerAttributes;
    }
  }
  namespace JSXElements {
    export interface SqhGlobalContainerAttributes extends HTMLAttributes {
      'background'?: string;
      'fontfamily'?: string;
      'maxwidth'?: string;
      'poweredby'?: boolean;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface SqhImageComponent {
      'alignment': string;
      'borderradius': number;
      'css': string;
      'ishidden': boolean;
      'url': string;
      'width': number;
    }
  }

  interface HTMLSqhImageComponentElement extends StencilComponents.SqhImageComponent, HTMLStencilElement {}

  var HTMLSqhImageComponentElement: {
    prototype: HTMLSqhImageComponentElement;
    new (): HTMLSqhImageComponentElement;
  };
  interface HTMLElementTagNameMap {
    'sqh-image-component': HTMLSqhImageComponentElement;
  }
  interface ElementTagNameMap {
    'sqh-image-component': HTMLSqhImageComponentElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'sqh-image-component': JSXElements.SqhImageComponentAttributes;
    }
  }
  namespace JSXElements {
    export interface SqhImageComponentAttributes extends HTMLAttributes {
      'alignment'?: string;
      'borderradius'?: number;
      'css'?: string;
      'ishidden'?: boolean;
      'url'?: string;
      'width'?: number;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface SqhPartnerStatComponent {
      'ishidden': boolean;
      'statcolor': string;
      'statdescription': string;
      'stattype': string;
      'statvalue': string;
    }
  }

  interface HTMLSqhPartnerStatComponentElement extends StencilComponents.SqhPartnerStatComponent, HTMLStencilElement {}

  var HTMLSqhPartnerStatComponentElement: {
    prototype: HTMLSqhPartnerStatComponentElement;
    new (): HTMLSqhPartnerStatComponentElement;
  };
  interface HTMLElementTagNameMap {
    'sqh-partner-stat-component': HTMLSqhPartnerStatComponentElement;
  }
  interface ElementTagNameMap {
    'sqh-partner-stat-component': HTMLSqhPartnerStatComponentElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'sqh-partner-stat-component': JSXElements.SqhPartnerStatComponentAttributes;
    }
  }
  namespace JSXElements {
    export interface SqhPartnerStatComponentAttributes extends HTMLAttributes {
      'ishidden'?: boolean;
      'onStatAdded'?: (event: CustomEvent) => void;
      'onStatTypeUpdated'?: (event: CustomEvent) => void;
      'statcolor'?: string;
      'statdescription'?: string;
      'stattype'?: string;
      'statvalue'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface SqhReferralCode {

    }
  }

  interface HTMLSqhReferralCodeElement extends StencilComponents.SqhReferralCode, HTMLStencilElement {}

  var HTMLSqhReferralCodeElement: {
    prototype: HTMLSqhReferralCodeElement;
    new (): HTMLSqhReferralCodeElement;
  };
  interface HTMLElementTagNameMap {
    'sqh-referral-code': HTMLSqhReferralCodeElement;
  }
  interface ElementTagNameMap {
    'sqh-referral-code': HTMLSqhReferralCodeElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'sqh-referral-code': JSXElements.SqhReferralCodeAttributes;
    }
  }
  namespace JSXElements {
    export interface SqhReferralCodeAttributes extends HTMLAttributes {

    }
  }
}


declare global {

  namespace StencilComponents {
    interface SqhReferralComponent {
      'referral': Referral | ReferredByReferral;
      'referraltype': "converted" | "pending" | "referrer";
      'referralvariables': ReferralVariables;
      'unknownuser': String;
    }
  }

  interface HTMLSqhReferralComponentElement extends StencilComponents.SqhReferralComponent, HTMLStencilElement {}

  var HTMLSqhReferralComponentElement: {
    prototype: HTMLSqhReferralComponentElement;
    new (): HTMLSqhReferralComponentElement;
  };
  interface HTMLElementTagNameMap {
    'sqh-referral-component': HTMLSqhReferralComponentElement;
  }
  interface ElementTagNameMap {
    'sqh-referral-component': HTMLSqhReferralComponentElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'sqh-referral-component': JSXElements.SqhReferralComponentAttributes;
    }
  }
  namespace JSXElements {
    export interface SqhReferralComponentAttributes extends HTMLAttributes {
      'referral'?: Referral | ReferredByReferral;
      'referraltype'?: "converted" | "pending" | "referrer";
      'referralvariables'?: ReferralVariables;
      'unknownuser'?: String;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface SqhReferralList {
      'cancelledcolor': string;
      'cancelledcontent': string;
      'cancelledvalue': string;
      'convertedcontent': string;
      'expiredcolor': string;
      'expiredcontent': string;
      'expiredvalue': string;
      'ishidden': boolean;
      'noreferralsyet': string;
      'paginateless': string;
      'paginatemore': string;
      'pendingcolor': string;
      'pendingcontent': string;
      'pendingvalue': string;
      'referralnamecolor': string;
      'referraltextcolor': string;
      'referrercontent': string;
      'referrervalue': string;
      'rewardcolor': string;
      'showreferrer': boolean;
      'unknownuser': string;
      'usefirstreward': boolean;
      'valuecontent': string;
    }
  }

  interface HTMLSqhReferralListElement extends StencilComponents.SqhReferralList, HTMLStencilElement {}

  var HTMLSqhReferralListElement: {
    prototype: HTMLSqhReferralListElement;
    new (): HTMLSqhReferralListElement;
  };
  interface HTMLElementTagNameMap {
    'sqh-referral-list': HTMLSqhReferralListElement;
  }
  interface ElementTagNameMap {
    'sqh-referral-list': HTMLSqhReferralListElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'sqh-referral-list': JSXElements.SqhReferralListAttributes;
    }
  }
  namespace JSXElements {
    export interface SqhReferralListAttributes extends HTMLAttributes {
      'cancelledcolor'?: string;
      'cancelledcontent'?: string;
      'cancelledvalue'?: string;
      'convertedcontent'?: string;
      'expiredcolor'?: string;
      'expiredcontent'?: string;
      'expiredvalue'?: string;
      'ishidden'?: boolean;
      'noreferralsyet'?: string;
      'paginateless'?: string;
      'paginatemore'?: string;
      'pendingcolor'?: string;
      'pendingcontent'?: string;
      'pendingvalue'?: string;
      'referralnamecolor'?: string;
      'referraltextcolor'?: string;
      'referrercontent'?: string;
      'referrervalue'?: string;
      'rewardcolor'?: string;
      'showreferrer'?: boolean;
      'unknownuser'?: string;
      'usefirstreward'?: boolean;
      'valuecontent'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface SqhRewardsActions {
      'hidetext': string;
      'nexttext': string;
      'previoustext': string;
    }
  }

  interface HTMLSqhRewardsActionsElement extends StencilComponents.SqhRewardsActions, HTMLStencilElement {}

  var HTMLSqhRewardsActionsElement: {
    prototype: HTMLSqhRewardsActionsElement;
    new (): HTMLSqhRewardsActionsElement;
  };
  interface HTMLElementTagNameMap {
    'sqh-rewards-actions': HTMLSqhRewardsActionsElement;
  }
  interface ElementTagNameMap {
    'sqh-rewards-actions': HTMLSqhRewardsActionsElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'sqh-rewards-actions': JSXElements.SqhRewardsActionsAttributes;
    }
  }
  namespace JSXElements {
    export interface SqhRewardsActionsAttributes extends HTMLAttributes {
      'hidetext'?: string;
      'nexttext'?: string;
      'previoustext'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface SqhShareButtonContainer {
      'emailbackgroundcolor': string;
      'emailclassName': string;
      'emaildisplayrule': string;
      'emailicon': string;
      'emailiconhorizontal': number;
      'emailiconsize': number;
      'emailiconvertical': number;
      'emailtext': string;
      'emailtextcolor': string;
      'facebookbackgroundcolor': string;
      'facebookclassName': string;
      'facebookdisplayrule': string;
      'facebookicon': string;
      'facebookiconhorizontal': number;
      'facebookiconsize': number;
      'facebookiconvertical': number;
      'facebooktext': string;
      'facebooktextcolor': string;
      'ishidden': boolean;
      'linebackgroundcolor': string;
      'lineclassName': string;
      'linedisplayrule': string;
      'lineicon': string;
      'lineiconhorizontal': number;
      'lineiconsize': number;
      'lineiconvertical': number;
      'linetext': string;
      'linetextcolor': string;
      'linkedinbackgroundcolor': string;
      'linkedinclassName': string;
      'linkedindisplayrule': string;
      'linkedinicon': string;
      'linkediniconhorizontal': number;
      'linkediniconsize': number;
      'linkediniconvertical': number;
      'linkedintext': string;
      'linkedintextcolor': string;
      'messengerbackgroundcolor': string;
      'messengerclassName': string;
      'messengerdisplayrule': string;
      'messengericon': string;
      'messengericonhorizontal': number;
      'messengericonsize': number;
      'messengericonvertical': number;
      'messengertext': string;
      'messengertextcolor': string;
      'pinterestbackgroundcolor': string;
      'pinterestclassName': string;
      'pinterestdisplayrule': string;
      'pinteresticon': string;
      'pinteresticonhorizontal': number;
      'pinteresticonsize': number;
      'pinteresticonvertical': number;
      'pinteresttext': string;
      'pinteresttextcolor': string;
      'smsbackgroundcolor': string;
      'smsclassName': string;
      'smsdisplayrule': string;
      'smsicon': string;
      'smsiconhorizontal': number;
      'smsiconsize': number;
      'smsiconvertical': number;
      'smstext': string;
      'smstextcolor': string;
      'twitterbackgroundcolor': string;
      'twitterclassName': string;
      'twitterdisplayrule': string;
      'twittericon': string;
      'twittericonhorizontal': number;
      'twittericonsize': number;
      'twittericonvertical': number;
      'twittertext': string;
      'twittertextcolor': string;
      'whatsappbackgroundcolor': string;
      'whatsappclassName': string;
      'whatsappdisplayrule': string;
      'whatsappicon': string;
      'whatsappiconhorizontal': number;
      'whatsappiconsize': number;
      'whatsappiconvertical': number;
      'whatsapptext': string;
      'whatsapptextcolor': string;
    }
  }

  interface HTMLSqhShareButtonContainerElement extends StencilComponents.SqhShareButtonContainer, HTMLStencilElement {}

  var HTMLSqhShareButtonContainerElement: {
    prototype: HTMLSqhShareButtonContainerElement;
    new (): HTMLSqhShareButtonContainerElement;
  };
  interface HTMLElementTagNameMap {
    'sqh-share-button-container': HTMLSqhShareButtonContainerElement;
  }
  interface ElementTagNameMap {
    'sqh-share-button-container': HTMLSqhShareButtonContainerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'sqh-share-button-container': JSXElements.SqhShareButtonContainerAttributes;
    }
  }
  namespace JSXElements {
    export interface SqhShareButtonContainerAttributes extends HTMLAttributes {
      'emailbackgroundcolor'?: string;
      'emailclassName'?: string;
      'emaildisplayrule'?: string;
      'emailicon'?: string;
      'emailiconhorizontal'?: number;
      'emailiconsize'?: number;
      'emailiconvertical'?: number;
      'emailtext'?: string;
      'emailtextcolor'?: string;
      'facebookbackgroundcolor'?: string;
      'facebookclassName'?: string;
      'facebookdisplayrule'?: string;
      'facebookicon'?: string;
      'facebookiconhorizontal'?: number;
      'facebookiconsize'?: number;
      'facebookiconvertical'?: number;
      'facebooktext'?: string;
      'facebooktextcolor'?: string;
      'ishidden'?: boolean;
      'linebackgroundcolor'?: string;
      'lineclassName'?: string;
      'linedisplayrule'?: string;
      'lineicon'?: string;
      'lineiconhorizontal'?: number;
      'lineiconsize'?: number;
      'lineiconvertical'?: number;
      'linetext'?: string;
      'linetextcolor'?: string;
      'linkedinbackgroundcolor'?: string;
      'linkedinclassName'?: string;
      'linkedindisplayrule'?: string;
      'linkedinicon'?: string;
      'linkediniconhorizontal'?: number;
      'linkediniconsize'?: number;
      'linkediniconvertical'?: number;
      'linkedintext'?: string;
      'linkedintextcolor'?: string;
      'messengerbackgroundcolor'?: string;
      'messengerclassName'?: string;
      'messengerdisplayrule'?: string;
      'messengericon'?: string;
      'messengericonhorizontal'?: number;
      'messengericonsize'?: number;
      'messengericonvertical'?: number;
      'messengertext'?: string;
      'messengertextcolor'?: string;
      'pinterestbackgroundcolor'?: string;
      'pinterestclassName'?: string;
      'pinterestdisplayrule'?: string;
      'pinteresticon'?: string;
      'pinteresticonhorizontal'?: number;
      'pinteresticonsize'?: number;
      'pinteresticonvertical'?: number;
      'pinteresttext'?: string;
      'pinteresttextcolor'?: string;
      'smsbackgroundcolor'?: string;
      'smsclassName'?: string;
      'smsdisplayrule'?: string;
      'smsicon'?: string;
      'smsiconhorizontal'?: number;
      'smsiconsize'?: number;
      'smsiconvertical'?: number;
      'smstext'?: string;
      'smstextcolor'?: string;
      'twitterbackgroundcolor'?: string;
      'twitterclassName'?: string;
      'twitterdisplayrule'?: string;
      'twittericon'?: string;
      'twittericonhorizontal'?: number;
      'twittericonsize'?: number;
      'twittericonvertical'?: number;
      'twittertext'?: string;
      'twittertextcolor'?: string;
      'whatsappbackgroundcolor'?: string;
      'whatsappclassName'?: string;
      'whatsappdisplayrule'?: string;
      'whatsappicon'?: string;
      'whatsappiconhorizontal'?: number;
      'whatsappiconsize'?: number;
      'whatsappiconvertical'?: number;
      'whatsapptext'?: string;
      'whatsapptextcolor'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface SqhShareButton {
      'backgroundcolor': string;
      'className': string;
      'displayrule': string;
      'icon': string;
      'iconhorizontal': number;
      'iconsize': number;
      'iconvertical': number;
      'text': string;
      'textcolor': string;
      'type': string;
      'url': string;
    }
  }

  interface HTMLSqhShareButtonElement extends StencilComponents.SqhShareButton, HTMLStencilElement {}

  var HTMLSqhShareButtonElement: {
    prototype: HTMLSqhShareButtonElement;
    new (): HTMLSqhShareButtonElement;
  };
  interface HTMLElementTagNameMap {
    'sqh-share-button': HTMLSqhShareButtonElement;
  }
  interface ElementTagNameMap {
    'sqh-share-button': HTMLSqhShareButtonElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'sqh-share-button': JSXElements.SqhShareButtonAttributes;
    }
  }
  namespace JSXElements {
    export interface SqhShareButtonAttributes extends HTMLAttributes {
      'backgroundcolor'?: string;
      'className'?: string;
      'displayrule'?: string;
      'icon'?: string;
      'iconhorizontal'?: number;
      'iconsize'?: number;
      'iconvertical'?: number;
      'text'?: string;
      'textcolor'?: string;
      'type'?: string;
      'url'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface SqhStatComponent {
      'ishidden': boolean;
      'statcolor': string;
      'statdescription': string;
      'stattype': string;
      'statvalue': string;
    }
  }

  interface HTMLSqhStatComponentElement extends StencilComponents.SqhStatComponent, HTMLStencilElement {}

  var HTMLSqhStatComponentElement: {
    prototype: HTMLSqhStatComponentElement;
    new (): HTMLSqhStatComponentElement;
  };
  interface HTMLElementTagNameMap {
    'sqh-stat-component': HTMLSqhStatComponentElement;
  }
  interface ElementTagNameMap {
    'sqh-stat-component': HTMLSqhStatComponentElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'sqh-stat-component': JSXElements.SqhStatComponentAttributes;
    }
  }
  namespace JSXElements {
    export interface SqhStatComponentAttributes extends HTMLAttributes {
      'ishidden'?: boolean;
      'onStatAdded'?: (event: CustomEvent) => void;
      'onStatTypeUpdated'?: (event: CustomEvent) => void;
      'statcolor'?: string;
      'statdescription'?: string;
      'stattype'?: string;
      'statvalue'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface SqhStatsContainer {
      'ishidden': boolean;
      'paddingbottom': string;
      'paddingtop': string;
    }
  }

  interface HTMLSqhStatsContainerElement extends StencilComponents.SqhStatsContainer, HTMLStencilElement {}

  var HTMLSqhStatsContainerElement: {
    prototype: HTMLSqhStatsContainerElement;
    new (): HTMLSqhStatsContainerElement;
  };
  interface HTMLElementTagNameMap {
    'sqh-stats-container': HTMLSqhStatsContainerElement;
  }
  interface ElementTagNameMap {
    'sqh-stats-container': HTMLSqhStatsContainerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'sqh-stats-container': JSXElements.SqhStatsContainerAttributes;
    }
  }
  namespace JSXElements {
    export interface SqhStatsContainerAttributes extends HTMLAttributes {
      'ishidden'?: boolean;
      'paddingbottom'?: string;
      'paddingtop'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface SqhTextComponent {
      'background': string;
      'color': string;
      'fontfamily': string;
      'fontsize': string;
      'height': string;
      'ishidden': boolean;
      'ismarkdown': boolean;
      'padding': string;
      'paddingbottom': string;
      'paddingtop': string;
      'text': string;
      'textalign': string;
    }
  }

  interface HTMLSqhTextComponentElement extends StencilComponents.SqhTextComponent, HTMLStencilElement {}

  var HTMLSqhTextComponentElement: {
    prototype: HTMLSqhTextComponentElement;
    new (): HTMLSqhTextComponentElement;
  };
  interface HTMLElementTagNameMap {
    'sqh-text-component': HTMLSqhTextComponentElement;
  }
  interface ElementTagNameMap {
    'sqh-text-component': HTMLSqhTextComponentElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'sqh-text-component': JSXElements.SqhTextComponentAttributes;
    }
  }
  namespace JSXElements {
    export interface SqhTextComponentAttributes extends HTMLAttributes {
      'background'?: string;
      'color'?: string;
      'fontfamily'?: string;
      'fontsize'?: string;
      'height'?: string;
      'ishidden'?: boolean;
      'ismarkdown'?: boolean;
      'padding'?: string;
      'paddingbottom'?: string;
      'paddingtop'?: string;
      'text'?: string;
      'textalign'?: string;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;