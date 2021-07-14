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
import * as FormMessage from "../../stories/FormMessage.stories";
import * as Dashboard from "../../stories/Dashboard.stories";
import * as SidebarItem from "../../stories/SidebarItem.stories";
import * as NavigationSidebar from "../../stories/NavigationSidebar.stories";

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
  Router,
  PortalFrame,
  EditProfile,
  FormMessage,
  Dashboard,
  SidebarItem,
  NavigationSidebar,
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
    return <Host class={Style}>{children}</Host>;
  }
}
