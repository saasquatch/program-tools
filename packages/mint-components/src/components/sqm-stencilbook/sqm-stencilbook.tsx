import { h, Component, Host, State } from "@stencil/core";
import { useStencilbook } from "@saasquatch/stencilbook";
import { useState, withHooks } from "@saasquatch/stencil-hooks";

import * as ShareButton from "../sqm-share-button/ShareButton.stories";
import * as ShareLink from "../sqm-share-link/ShareLink.stories";
import * as BigStat from "../sqm-big-stat/BigStat.stories";
import * as Leaderboard from "../sqm-leaderboard/Leaderboard.stories";
import * as Router from "../sqm-router/Router.stories";
import * as LeaderboardRank from "../sqm-leaderboard-rank/LeaderboardRank.stories";
import * as PortalFrame from "../sqm-portal-frame/PortalFrame.stories";
import * as EditProfile from "../sqm-edit-profile/EditProfileForm.stories";
import * as UseShareLink from "../sqm-share-link/UseShareLink.stories";
import * as UseShareButton from "../sqm-share-button/UseShareButton.stories";
import * as UseBigStat from "../sqm-big-stat/UseBigStat.stories";
import * as UseEditProfile from "../sqm-edit-profile/UseEditProfile.stories";
import * as UseLeaderboard from "../sqm-leaderboard/UseLeaderboard.stories";
import * as FormMessage from "../sqm-form-message/FormMessage.stories";
import * as UseRewardExchangeList from "../sqm-reward-exchange-list/UseRewardExchangeList.stories";
import * as UseRewardsTable from "../sqm-rewards-table/UseRewardsTable.stories";
import * as UseTaskCard from "../sqm-task-card/UseTaskCard.stories";
import * as NewPortal from "../../stories/NewPortal.stories";
import * as SidebarItem from "../sqm-navigation-sidebar-item/SidebarItem.stories";
import * as NavigationSidebar from "../sqm-navigation-sidebar/NavigationSidebar.stories";
import * as PortalLogin from "../sqm-portal-login/PortalLogin.stories";
import * as PortalRegister from "../sqm-portal-register/PortalRegister.stories";
import * as PortalForgotPassword from "../sqm-portal-forgot-password/PortalForgotPassword.stories";
import * as PortalEmailVerification from "../sqm-portal-email-verification/PortalEmailVerification.stories";
import * as PortalResetPassword from "../sqm-portal-reset-password/PortalResetPassword.stories";
import * as PortalVerifyEmail from "../sqm-portal-verify-email/PortalVerifyEmail.stories";
import * as AssetCard from "../sqm-asset-card/AssetCard.stories";
import * as DividedLayout from "../sqm-divided-layout/DividedLayout.stories";
import * as ChangePassword from "../sqm-portal-change-password/ChangePassword.stories";
import * as PortalProfile from "../sqm-portal-profile/PortalProfile.stories";
import * as ReferralTable from "../sqm-referral-table/ReferralTable.stories";
import * as ReferralTableCell from "../sqm-referral-table/ReferralTableCell.stories";
import * as ReferralTableRewardsCell from "../sqm-referral-table/ReferralTableRewardsCell.stories";
import * as UserName from "../sqm-user-name/UserName.stories";
import * as PasswordField from "../sqm-password-field/PasswordField.stories";
import * as TaskCard from "../sqm-task-card/TaskCard.stories";
import * as PortalTemplates from "../../stories/PortalTemplates.stories";
import * as ProgramMenu from "../sqm-program-menu/ProgramMenu.stories";
import * as PoweredByImg from "../../stories/PoweredByImg.stories";
import * as PortalFooter from "../sqm-portal-footer/PortalFooter.stories";
import * as Hero from "../sqm-hero/Hero.stories";
import * as ReferralIframe from "../sqm-referral-iframe/ReferralIframe.stories";
import * as NameFields from "../sqm-name-fields/NameFields.stories";
import * as RewardExchangeList from "../sqm-reward-exchange-list/RewardExchangeList.stories";

import * as Themes from "./Themes";
import { CucumberAddon } from "./CucumberAddon";
import { HookStoryAddon } from "./HookStoryAddon";
import { ShadowViewAddon } from "../../ShadowViewAddon";

const stories = [
  ShareButton,
  ShareLink,
  BigStat,
  Leaderboard,
  LeaderboardRank,
  UseShareLink,
  UseShareButton,
  UseBigStat,
  UseEditProfile,
  UseLeaderboard,
  Router,
  PortalFrame,
  EditProfile,
  FormMessage,
  NewPortal,
  SidebarItem,
  NavigationSidebar,
  PortalLogin,
  PortalRegister,
  PortalForgotPassword,
  PortalEmailVerification,
  PortalResetPassword,
  PortalVerifyEmail,
  AssetCard,
  DividedLayout,
  ChangePassword,
  PortalProfile,
  ReferralTable,
  ReferralTableCell,
  ReferralTableRewardsCell,
  UserName,
  PasswordField,
  TaskCard,
  PortalTemplates,
  ProgramMenu,
  PoweredByImg,
  PortalFooter,
  Hero,
  ReferralIframe,
  NameFields,
  RewardExchangeList,
  UseRewardExchangeList,
  UseTaskCard,
  UseRewardsTable
];

/**
 * For internal documentation
 *
 * @undocumented
 */
@Component({
  tag: "sqm-stencilbook",
})
export class StencilStorybook {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() { }
  render() {
    const { class: Style, children } = useStencilbook(stories, {
      h,
      title: "Mint Components",
      addons: [CucumberAddon, ShadowViewAddon, HookStoryAddon],
    });

    const [selectedTheme, setSelected] = useState("Default");
    const themes = Object.keys(Themes);
    const theme = Themes[selectedTheme]
    return (
      <Host class={Style} onClick={{}}>
        <div style={{ position: "absolute", top: "0", right: "0", zIndex: "999999" }}>
          Branding:
          <select onChange={(e) => setSelected((e.target as HTMLSelectElement).value)}>
            {themes.map(t => <option selected={t===selectedTheme}>{t}</option>)}
          </select>
        </div>
        <style>{theme}</style>
        {children}

      </Host>
    );
  }
}
