import { h, Component, Host, State } from "@stencil/core";
import { useStencilbook } from "@saasquatch/stencilbook";
import { withHooks } from "@saasquatch/stencil-hooks";

import * as ShareButton from "../../stories/ShareButton.stories";
import * as ShareLink from "../../stories/ShareLink.stories";
import * as BigStat from "../../stories/BigStat.stories";
import * as Leaderboard from "../../stories/Leaderboard.stories";
import * as Router from "../../stories/Router.stories";
import * as LeaderboardRank from "../../stories/LeaderboardRank.stories";
import * as PortalFrame from "../../stories/PortalFrame.stories";
import * as EditProfile from "../../stories/EditProfileForm.stories";
import * as UseShareLink from "../../stories/UseShareLink.stories";
import * as UseShareButton from "../../stories/UseShareButton.stories";
import * as UseBigStat from "../../stories/UseBigStat.stories";
import * as UseEditProfile from "../../stories/UseEditProfile.stories";
import * as UseLeaderboard from "../../stories/UseLeaderboard.stories";
import * as FormMessage from "../../stories/FormMessage.stories";
import * as NewPortal from "../../stories/NewPortal.stories";
import * as SidebarItem from "../../stories/SidebarItem.stories";
import * as NavigationSidebar from "../../stories/NavigationSidebar.stories";
import * as PortalLogin from "../../stories/PortalLogin.stories";
import * as PortalRegister from "../../stories/PortalRegister.stories";
import * as PortalForgotPassword from "../../stories/PortalForgotPassword.stories";
import * as PortalEmailVerification from "../../stories/PortalEmailVerification.stories";
import * as PortalResetPassword from "../../stories/PortalResetPassword.stories";
import * as PortalVerifyEmail from "../../stories/PortalVerifyEmail.stories";
import * as AssetCard from "../../stories/AssetCard.stories";
import * as DividedLayout from "../../stories/DividedLayout.stories";
import * as ChangePassword from "../../stories/ChangePassword.stories";
import * as PortalProfile from "../../stories/PortalProfile.stories";
import * as ReferralTable from "../../stories/ReferralTable.stories";
import * as ReferralTableCell from "../../stories/ReferralTableCell.stories";
import * as ReferralTableRewardsCell from "../../stories/ReferralTableRewardsCell.stories";
import * as UserName from "../../stories/UserName.stories";
import * as PasswordField from "../../stories/PasswordField.stories";
import * as PortalTemplates from "../../stories/PortalTemplates.stories";
import * as ProgramMenu from "../../stories/ProgramMenu.stories";
import * as PoweredByImg from "../../stories/PoweredByImg.stories";
import * as PortalFooter from "../../stories/PortalFooter.stories";
import * as Hero from "../../stories/Hero.stories"

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
  PortalTemplates,
  ProgramMenu,
  PoweredByImg,
  PortalFooter,
  Hero
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
  disconnectedCallback() {}
  render() {
    const { class: Style, children } = useStencilbook(stories, {
      h,
      title: "Mint Components",
      addons: [CucumberAddon, ShadowViewAddon, HookStoryAddon],
    });
    return <Host class={Style} onClick={{}}>{children}</Host>;
  }
}
