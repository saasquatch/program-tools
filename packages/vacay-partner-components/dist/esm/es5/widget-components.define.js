// WidgetComponents: Custom Elements Define Library, ES Module/ES5 Target
import { defineCustomElement } from './widget-components.core.js';
import {
  CopyButton,
  CopyLinkButton,
  GlobalContainer,
  ImageComponent,
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
    CopyButton,
    CopyLinkButton,
    GlobalContainer,
    ImageComponent,
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