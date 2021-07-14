import { h } from "@stencil/core";
import { BigStatView } from "../components/sqm-big-stat/sqm-big-stat-view";
import { ShareButtonView } from "../components/sqm-share-button/sqm-share-button-view";
import { ShareLinkView } from "../components/sqm-share-link/sqm-share-link-view";
import jss from "jss";
import preset from "jss-preset-default";
import { gap } from "../global/mixins";
import { NavigationSidebarView } from "../components/sqm-navigation-sidebar/sqm-navigation-sidebar-view";
import { SidebarItemView } from "../components/sqm-sidebar-item/sqm-sidebar-item-view";

export default {
  title: "New Portal",
};

const style = {
  HeaderContainer: {
    display: "flex",
    "flex-direction": "column",
  },
  StatContainer: {
    display: "flex",
    "margin-bottom": "25px",
    "& > :not(:last-child)": {
      "border-right": "1px solid #EAEAEA",
      "padding-right": "32px",
      "margin-right": "32px",
    },
  },
  InfoContainer: {},
  ShareItemContainer: {
    "& > h3": {
      margin: "0 0 12px",
    },
  },
  ShareContainer: {
    "& > div": {
      "margin-bottom": "48px",
    },
    padding: "50px",
    "border-top": "1px solid #EAEAEA",
  },
  ShareButtonContainer: {
    display: "flex",
    ...gap({ direction: "row", size: "32px" }),
  },
  FullPageContainer: {
    display: "flex",
    "background-color": "#fff",
  },
  SidebarContainer: {
    padding: "20px 15px",
    "border-right": "1px solid #EAEAEA",
    width: "100%",
    "max-width": "320px",
  },
  MainContainer: {
    "& >*": {
      "padding-left": "50px",
    },
  },
  Header: {
    "margin-bottom": "50px",
    color: "#555555",
  },

  FormHeader: {
    "margin-bottom": "34px",
    color: "#555555",
  },
  NameContainer: {
    display: "flex",
    "margin-bottom": "32px",
    "& > :not(:last-child)": {
      "margin-right": "32px",
    },
  },
  InputStyle: {
    "max-width": "510px",
    "margin-bottom": "32px",
  },
  HeaderSubtitle: {
    color: "#777777",
    margin: "0",
  },
  HeaderSubtitleBold: {
    "font-weight": 500,
    "text-decoration": "underline",
  },
  StatHeader: {
    "margin-bottom": "24px",
    color: "#555555",
  },
};

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

const barProps = {
  data: {
    programs: [
      {
        key: "program1",
        label: "My Referral Program",
      },
      {
        key: "program2",
        label: "My Rewards Program",
      },
    ],
  },
};

const item1Props = {
  states: {
    active: false,
  },
  data: {
    label: "Dashboard",
    icon: "house",
  },
  callbacks: {
    onClick: (e: MouseEvent) => console.log(e),
  },
};

const item2Props = {
  states: {
    active: true,
  },
  data: {
    label: "Activity",
    icon: "bar-chart",
  },
  callbacks: {
    onClick: (e: MouseEvent) => console.log(e),
  },
};

const Sidebar = () => {
  return (
    <div class={sheet.classes.SidebarContainer}>
      <NavigationSidebarView {...barProps}>
        <SidebarItemView {...item1Props} />
        <SidebarItemView {...item2Props} />
      </NavigationSidebarView>
    </div>
  );
};

export const Dashboard = () => {
  const sharelinkProps = {
    sharelink: "https://ssqt.co/johnsmithrox",
    open: false,
    disabled: false,
    tooltiptext: "Share link copied",
    onClick: () => console.log("Share link copied"),
  };

  const sharecodeProps = {
    sharelink: "JOHNSMITH1",
    open: false,
    disabled: false,
    tooltiptext: "Share code copied",
    onClick: () => console.log("Share code copied"),
  };

  const twitterButtonProps = {
    medium: "twitter" as const,
    loading: false,
    disabled: false,
    pill: true,
    type: "default" as const,
    size: "medium" as const,
    icon: "twitter",
    hideicon: false,
    iconslot: "prefix" as const,
    onClick: () => "Facebook share clicked",
    hide: false,
  };

  const facebookButtonProps = {
    medium: "facebook" as const,
    loading: false,
    disabled: false,
    pill: true,
    type: "default" as const,
    size: "medium" as const,
    icon: "facebook",
    hideicon: false,
    iconslot: "prefix" as const,
    onClick: () => "Facebook share clicked",
    hide: false,
  };

  const linkedinButtonProps = {
    medium: "linkedin" as const,
    loading: false,
    disabled: false,
    pill: true,
    type: "default" as const,
    size: "medium" as const,
    icon: "linkedin",
    hideicon: false,
    iconslot: "prefix" as const,
    onClick: () => "Facebook share clicked",
    hide: false,
  };

  return (
    <div class={sheet.classes.FullPageContainer}>
      <style type="text/css">{styleString}</style>
      <Sidebar />
      <div class={sheet.classes.MainContainer}>
        <div class={sheet.classes.HeaderContainer}>
          <p>Welcome back,</p>
          <h1>John Smith</h1>
        </div>
        <div class={sheet.classes.StatContainer}>
          <BigStatView {...{ statvalue: "2,345" }}>Clicks</BigStatView>
          <BigStatView {...{ statvalue: "58" }}>Referrals</BigStatView>
          <BigStatView {...{ statvalue: "$10,540" }}>Earned</BigStatView>
          <BigStatView {...{ statvalue: "$2,305" }}>
            Awaiting Payout
          </BigStatView>
        </div>
        <div class={sheet.classes.ShareContainer}>
          <h2>Partner and Profit</h2>
          <p>
            Get rewarded for referring potential customers to MyCompany. Earn
            commission for each successful lead you send our way{" "}
          </p>
          <div class={sheet.classes.ShareItemContainer}>
            <h3>Share your referral link</h3>
            <ShareLinkView {...sharelinkProps} />
          </div>
          <div class={sheet.classes.ShareItemContainer}>
            <h3>Share your referral code</h3>
            <ShareLinkView {...sharecodeProps} />
          </div>
          <div class={sheet.classes.ShareItemContainer}>
            <h3>Share via social medial</h3>
            <div class={sheet.classes.ShareButtonContainer}>
              <ShareButtonView {...twitterButtonProps}>
                Tweet about us
              </ShareButtonView>
              <ShareButtonView {...facebookButtonProps}>
                Share on Facebook
              </ShareButtonView>
              <ShareButtonView {...linkedinButtonProps}>
                Post on Linkedin
              </ShareButtonView>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditProfile = () => {
  return (
    <div class={sheet.classes.FullPageContainer}>
      <style type="text/css">{styleString}</style>
      <Sidebar />
      <div class={sheet.classes.MainContainer}>
        <h1 class={sheet.classes.Header}>Edit your profile</h1>
        <h2 class={sheet.classes.FormHeader}>Personal Information</h2>
        <form>
          <div class={sheet.classes.NameContainer}>
            <sl-input label="First Name"></sl-input>
            <sl-input label="Last Name"></sl-input>
          </div>
          <sl-input class={sheet.classes.InputStyle} label="Email"></sl-input>
          <sl-input class={sheet.classes.InputStyle} label="Country"></sl-input>
          <sl-button style={{ marginBottom: "54px" }}>Submit Changes</sl-button>
        </form>

        <hr />

        <h2 style={{ marginTop: "43px", marginBottom: "19px" }}>Password</h2>
        <sl-button>Change your password...</sl-button>
      </div>
    </div>
  );
};

export const Commissions = () => {
  return (
    <div class={sheet.classes.FullPageContainer}>
      <style type="text/css">{styleString}</style>
      <Sidebar />
      <div class={sheet.classes.MainContainer}>
        <div class={sheet.classes.HeaderContainer}>
          <h1 class={sheet.classes.Header}>Commissions</h1>
          <p class={sheet.classes.HeaderSubtitle}>
            for the{" "}
            <span class={sheet.classes.HeaderSubtitleBold}>
              Partner Program #1
            </span>{" "}
            program
          </p>
        </div>

        <div class={sheet.classes.StatContainer}>
          <BigStatView {...{ statvalue: "$ 1,000" }}>Total Earned</BigStatView>
          <BigStatView {...{ statvalue: "$ 800" }}>Available</BigStatView>
          <BigStatView {...{ statvalue: "$ 180" }}>Pending</BigStatView>
          <BigStatView {...{ statvalue: "$ 20" }}>Redeemed</BigStatView>
        </div>
      </div>
    </div>
  );
};

export const Activity = () => {
  return (
    <div class={sheet.classes.FullPageContainer}>
      <style type="text/css">{styleString}</style>
      <Sidebar />
      <div class={sheet.classes.MainContainer}>
        <div class={sheet.classes.HeaderContainer}>
          <h1 class={sheet.classes.Header}>Activity</h1>
          <p class={sheet.classes.HeaderSubtitle}>
            for the{" "}
            <span class={sheet.classes.HeaderSubtitleBold}>
              Partner Program #1
            </span>{" "}
            program
          </p>
        </div>
        <h2 class={sheet.classes.StatHeader}>Referral Activity</h2>
        <div class={sheet.classes.StatContainer}>
          <BigStatView {...{ statvalue: "1,000" }}>Total Referrals</BigStatView>
          <BigStatView {...{ statvalue: "800" }}>Converted</BigStatView>
          <BigStatView {...{ statvalue: "180" }}>Pending</BigStatView>
          <BigStatView {...{ statvalue: "20" }}>Disqualified</BigStatView>
        </div>

        <h2 class={sheet.classes.StatHeader}>Traffic Generated</h2>
        <div class={sheet.classes.StatContainer}>
          <BigStatView {...{ statvalue: "1,000" }}>Clicks</BigStatView>
          <BigStatView {...{ statvalue: "800" }}>From share link</BigStatView>
          <BigStatView {...{ statvalue: "180" }}>
            From share mediums
          </BigStatView>
        </div>
      </div>
    </div>
  );
};
