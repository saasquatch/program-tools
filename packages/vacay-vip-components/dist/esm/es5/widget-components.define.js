// WidgetComponents: Custom Elements Define Library, ES Module/ES5 Target
import { defineCustomElement } from './widget-components.core.js';
import {
  CTAComponent,
  CopyButton,
  CopyLinkButton,
  GlobalContainer,
  ImageComponent,
  ProgressIndicator,
  ReferralCode,
  ReferralComponent,
  ReferralList,
  RewardsActions,
  ShareButton,
  ShareButtonContainer,
  StatComponent,
  StatComponent,
  StatsContainer,
  TextComponent,
  TwitterShareButton
} from './widget-components.components.js';

export function defineCustomElements(window, opts) {
  defineCustomElement(window, [
    CTAComponent,
    CopyButton,
    CopyLinkButton,
    GlobalContainer,
    ImageComponent,
    ProgressIndicator,
    ReferralCode,
    ReferralComponent,
    ReferralList,
    RewardsActions,
    ShareButton,
    ShareButtonContainer,
    StatComponent,
    StatComponent,
    StatsContainer,
    TextComponent,
    TwitterShareButton
  ], opts);
}