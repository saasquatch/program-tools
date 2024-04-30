import { h, Component, Host, State } from "@stencil/core";
import { useStencilbook } from "@saasquatch/stencilbook";
import { useState, withHooks } from "@saasquatch/stencil-hooks";

import * as ShareButton from "../sqm-share-button/ShareButton.stories";
import * as EmptyState from "../sqm-empty/EmptyState.stories";
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
import * as Widget from "../../stories/Widget.stories";
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
import * as CheckboxField from "../sqm-checkbox-field/CheckboxField.stories";
import * as UseCheckboxField from "../sqm-checkbox-field/UseCheckboxField.stories";
import * as DropdownField from "../sqm-dropdown-field/DropdownField.stories";
import * as UseDropdownField from "../sqm-dropdown-field/UseDropdownField.stories";
import * as InputField from "../sqm-input-field/InputField.stories";
import * as UseInputField from "../sqm-input-field/UseInputField.stories";
import * as RewardExchangeList from "../sqm-reward-exchange-list/RewardExchangeList.stories";
import * as ProgramExplainer from "../sqm-program-explainer/ProgramExplainer.stories";
import * as ProgramExplainerStep from "../sqm-program-explainer-step/ProgramExplainerStep.stories";
import * as BrandStories from "../sqm-brand/SqmBrand.stories";
import * as CardFeed from "../sqm-card-feed/CardFeed.stories";
import * as PortalContainer from "../sqm-portal-container/PortalContainer.stories";
import * as RewardsTableCell from "../sqm-rewards-table/RewardsTableCell.stories";
import * as RewardsTable from "../sqm-rewards-table/RewardsTable.stories";
import * as UseReferralTable from "../sqm-referral-table/UseReferralTable.stories";
import * as HeroImage from "../sqm-hero-image/HeroImage.stories";
import * as ReferralCard from "../sqm-referral-card/ReferralCard.stories";
import * as Timeline from "../sqm-timeline/Timeline.stories";
import * as Image from "../sqm-image/Image.stories";
import * as TitledSection from "../sqm-titled-section/TitledSection.stories";
import * as Scroll from "../sqm-scroll/Scroll.stories";
import * as Tabs from "../sqm-tabs/Tabs.stories";
import * as ShareCode from "../sqm-share-code/ShareCode.stories";
import * as EmailRegistration from "../views/EmailRegistration.stories";
import * as CouponCode from "../sqm-coupon-code/CouponCode.stories";
import * as LogoutCurrentUser from "../sqm-logout-current-user/LogoutCurrentUser.stories";
import * as LinkButton from "../sqm-link-button/LinkButton.stories";
import * as CloseButton from "../sqm-close-button/CloseButton.stories";
import * as TaxForm from "../tax-and-cash/TaxForm.stories";
import * as TaxFormSlots from "../tax-and-cash/sqm-user-info-form/small-views/SlotViews.stories";
import * as RadioCard from "../sqm-radio-card/RadioCard.stories";
import * as ProgressBar from "../sqm-task-card/progress-bar/ProgressBar.stories";
import * as PayoutDetailsCard from "../tax-and-cash/sqm-payout-details-card/PayoutDetailsCard.stories";
import * as BankingInfoForm from "../tax-and-cash/BankingForm.stories";
import * as InvoiceTable from "../sqm-invoice-table/InvoiceTable.stories";
import * as InvoiceTableCells from "../sqm-invoice-table/InvoiceTableCell.stories";
import * as UseInvoiceTableCells from "../sqm-invoice-table/UseInvoiceTable.stories";

import * as Themes from "./Themes";
import { CucumberAddon } from "./CucumberAddon";
import { HookStoryAddon } from "./HookStoryAddon";
import { ShadowViewAddon } from "../../ShadowViewAddon";
import { ResizerStylesheet } from "./Resizer";

const stories = [
  InvoiceTable,
  InvoiceTableCells,
  UseInvoiceTableCells,
  ShareButton,
  ShareLink,
  BigStat,
  Leaderboard,
  EmptyState,
  LeaderboardRank,
  UseShareLink,
  UseShareButton,
  UseBigStat,
  UseEditProfile,
  UseLeaderboard,
  UseCheckboxField,
  UseDropdownField,
  UseInputField,
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
  Widget,
  ProgramMenu,
  PoweredByImg,
  PortalFooter,
  Hero,
  ReferralIframe,
  NameFields,
  CheckboxField,
  DropdownField,
  InputField,
  RewardExchangeList,
  UseRewardExchangeList,
  UseTaskCard,
  UseRewardsTable,
  ProgramExplainer,
  ProgramExplainerStep,
  BrandStories,
  CardFeed,
  PortalContainer,
  RewardsTableCell,
  RewardsTable,
  UseReferralTable,
  HeroImage,
  ReferralCard,
  Timeline,
  Image,
  TitledSection,
  Scroll,
  Tabs,
  ShareCode,
  CouponCode,
  LogoutCurrentUser,
  LinkButton,
  EmailRegistration,
  CloseButton,
  TaxForm,
  RadioCard,
  ProgressBar,
  TaxFormSlots,
  PayoutDetailsCard,
  BankingInfoForm,
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
      addons: [HookStoryAddon, ShadowViewAddon, CucumberAddon],
    });

    const [selectedTheme, setSelected] = useState("Default");
    const [checkerboard, setCheckerboard] = useState(true);
    const themes = Object.keys(Themes);
    const theme = Themes[selectedTheme];
    return (
      <Host class={Style} onClick={{}}>
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            zIndex: "999999",
          }}
        >
          Branding:
          <select
            onChange={(e) => setSelected((e.target as HTMLSelectElement).value)}
          >
            {themes.map((t) => (
              <option selected={t === selectedTheme}>{t}</option>
            ))}
          </select>
          <div>
            <div></div>
          </div>
          <ColorScale />
          <br />
          <input
            type="checkbox"
            id="checkerboard"
            onClick={() => setCheckerboard(!checkerboard)}
            onChange={() =>
              document.documentElement.style.setProperty(
                "--checker-color-1",
                checkerboard ? "#ebebeb" : "#ffffff00"
              )
            }
          ></input>
          <label htmlFor="checkerboard">Checkerboard?</label>
        </div>
        <style>{theme}</style>
        <style>{ResizerStylesheet}</style>

        {children}
      </Host>
    );
  }
}

function ColorScale() {
  return (
    <span>
      <ColorToken />
      <ColorToken type="success" />
      <ColorToken type="warning" />
      <ColorToken type="danger" />
      <ColorToken type="neutral" />
    </span>
  );
}
function ColorToken({ type = "primary" }: { type?: string }) {
  return (
    <span
      style={{
        background: `var(--sl-color-${type}-500)`,
        width: "1em",
        marginRight: "2px",
        padding: "0 4px",
      }}
      title={type}
    >
      {type.charAt(0)}
    </span>
  );
}
