import { h } from "@stencil/core";
import { BigStatView } from "../components/sqm-big-stat/sqm-big-stat-view";
import { ShareButtonView } from "../components/sqm-share-button/sqm-share-button-view";
import { ShareLinkView } from "../components/sqm-share-link/sqm-share-link-view";
import jss from "jss";
import preset from "jss-preset-default";
import { gap } from "../global/mixins";
import { NavigationSidebarView } from "../components/sqm-navigation-sidebar/sqm-navigation-sidebar-view";
import { NavigationSidebarItemView } from "../components/sqm-navigation-sidebar-item/sqm-navigation-sidebar-item-view";
import { PresetText } from "../functional-components/PresetText";
import { PortalSectionView } from "../components/sqm-titled-section/sqm-portal-section-view";
import { PortalContainerView } from "../components/sqm-portal-container/sqm-portal-container-view";
import { DividedLayoutView } from "../components/sqm-divided-layout/sqm-divided-layout-view";
import { StatContainerView } from "../components/sqm-stat-container/sqm-stat-container-view";
import { PortalProfileView } from "../components/sqm-portal-profile/sqm-portal-profile-view";
import { PortalChangePasswordView } from "../components/sqm-portal-change-password/sqm-portal-change-password-view";

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
        <NavigationSidebarItemView {...item1Props} />
        <NavigationSidebarItemView {...item2Props} />
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
    <DividedLayoutView {...{ direction: "row" }}>
      <style type="text/css">{styleString}</style>
      <Sidebar />
      <DividedLayoutView {...{ direction: "column" }}>
        <PortalContainerView
          {...{ direction: "column", padding: "xxx-large", gap: "48px" }}
        >
          <PortalSectionView
            {...{
              labelMargin: "xx-small",
              padding: "none",
              label: (
                <sqm-text>
                  <p>Welcome back,</p>
                </sqm-text>
              ),
              content: (
                <sqm-text>
                  <h1>John Smith</h1>
                </sqm-text>
              ),
            }}
          ></PortalSectionView>
          {/* <StatContainerView {...{ space: "64px" }}>
            <BigStatView {...{ statvalue: "2,345" }}>Clicks</BigStatView>
            <BigStatView {...{ statvalue: "58" }}>Referrals</BigStatView>
            <BigStatView {...{ statvalue: "$10,540" }}>Earned</BigStatView>
            <BigStatView {...{ statvalue: "$2,305" }}>
              Awaiting Payout
            </BigStatView>
          </StatContainerView> */}
        </PortalContainerView>
        <PortalContainerView
          {...{ direction: "column", padding: "xxx-large", gap: "48px" }}
        >
          <PortalSectionView
            {...{
              labelMargin: "x-large",
              padding: "none",
              label: (
                <sqm-text>
                  <h2>Partner and Profit</h2>
                </sqm-text>
              ),
              content: (
                <sqm-text>
                  <p>
                    Get rewarded for referring potential customers to MyCompany.
                    Earn commission for each successful lead you send our way
                  </p>
                </sqm-text>
              ),
            }}
          ></PortalSectionView>
          <PortalSectionView
            {...{
              labelMargin: "small",
              padding: "none",
              label: (
                <sqm-text>
                  <h3>Share your referral link</h3>
                </sqm-text>
              ),
              content: <ShareLinkView {...sharelinkProps} />,
            }}
          ></PortalSectionView>
          <PortalSectionView
            {...{
              labelMargin: "small",
              padding: "none",
              label: (
                <sqm-text>
                  <h3>Share your referral code</h3>
                </sqm-text>
              ),
              content: <ShareLinkView {...sharecodeProps} />,
            }}
          ></PortalSectionView>
          <PortalSectionView
            {...{
              labelMargin: "small",
              padding: "none",
              label: (
                <sqm-text>
                  <h3>Share via social media</h3>
                </sqm-text>
              ),
              content: (
                <PortalContainerView
                  {...{
                    direction: "row",
                    padding: "large",
                    gap: "48px",
                    minWidth: "150px",
                  }}
                >
                  <ShareButtonView {...twitterButtonProps}>
                    Tweet about us
                  </ShareButtonView>
                  <ShareButtonView {...facebookButtonProps}>
                    Share on Facebook
                  </ShareButtonView>
                  <ShareButtonView {...linkedinButtonProps}>
                    Post on Linkedin
                  </ShareButtonView>
                </PortalContainerView>
              ),
            }}
          ></PortalSectionView>
        </PortalContainerView>
      </DividedLayoutView>
    </DividedLayoutView>
  );
};

export const EditProfile = () => {
  return (
    <DividedLayoutView {...{ direction: "row" }}>
      <style type="text/css">{styleString}</style>
      <Sidebar />
      <DividedLayoutView {...{ direction: "column" }}>
        <PortalProfileView />
        <PortalChangePasswordView {...{ states: { open: true } }} />
      </DividedLayoutView>
    </DividedLayoutView>
  );
};

export const Commissions = () => {
  return (
    <DividedLayoutView {...{ direction: "row" }}>
      <style type="text/css">{styleString}</style>
      <Sidebar />
      <DividedLayoutView {...{ direction: "column" }}>
        <PortalContainerView
          {...{ direction: "column", padding: "xxx-large", gap: "48px" }}
        >
          <PortalSectionView
            {...{
              labelMargin: "xx-small",
              padding: "none",
              label: (
                <sqm-text>
                  <h2>Commissions</h2>
                </sqm-text>
              ),
              content: (
                <sqm-text>
                  <p>
                    for the{" "}
                    <span class={sheet.classes.HeaderSubtitleBold}>
                      Partner Program #1
                    </span>{" "}
                    program
                  </p>
                </sqm-text>
              ),
            }}
          ></PortalSectionView>
          <StatContainerView {...{ space: "64px" }}>
            <BigStatView {...{ statvalue: "$ 1,000" }}>
              Total Earned
            </BigStatView>
            <BigStatView {...{ statvalue: "$ 800" }}>Available</BigStatView>
            <BigStatView {...{ statvalue: "$ 180" }}>Pending</BigStatView>
            <BigStatView {...{ statvalue: "$ 20" }}>Redeemed</BigStatView>
          </StatContainerView>
        </PortalContainerView>
      </DividedLayoutView>
    </DividedLayoutView>
  );
};

export const Activity = () => {
  return (
    <DividedLayoutView {...{ direction: "row" }}>
      <style type="text/css">{styleString}</style>
      <Sidebar />
      <DividedLayoutView {...{ direction: "column" }}>
        <PortalContainerView
          {...{ direction: "column", padding: "xxx-large", gap: "48px" }}
        >
          <PortalSectionView
            {...{
              labelMargin: "xx-small",
              padding: "none",
              label: (
                <sqm-text>
                  <h2>Activity</h2>
                </sqm-text>
              ),
              content: (
                <sqm-text>
                  <p>
                    for the{" "}
                    <span class={sheet.classes.HeaderSubtitleBold}>
                      Partner Program #1
                    </span>{" "}
                    program
                  </p>
                </sqm-text>
              ),
            }}
          ></PortalSectionView>
          <PortalSectionView
            {...{
              labelMargin: "x-large",
              padding: "none",
              label: (
                <sqm-text>
                  <h3>Referral Activity</h3>
                </sqm-text>
              ),
              content: (
                <StatContainerView {...{ space: "64px" }}>
                  <BigStatView {...{ statvalue: "1,000" }}>
                    Total Referrals
                  </BigStatView>
                  <BigStatView {...{ statvalue: "800" }}>Converted</BigStatView>
                  <BigStatView {...{ statvalue: "180" }}>Pending</BigStatView>
                  <BigStatView {...{ statvalue: "20" }}>
                    Disqualified
                  </BigStatView>
                </StatContainerView>
              ),
            }}
          ></PortalSectionView>
        </PortalContainerView>
        <PortalSectionView
          {...{
            labelMargin: "x-large",
            padding: "xxx-large",
            label: (
              <sqm-text>
                <h3>Traffic Generated</h3>
              </sqm-text>
            ),
            content: (
              <StatContainerView {...{ space: "64px" }}>
                <BigStatView {...{ statvalue: "1,000" }}>Clicks</BigStatView>
                <BigStatView {...{ statvalue: "800" }}>
                  From share link
                </BigStatView>
                <BigStatView {...{ statvalue: "180" }}>
                  From share mediums
                </BigStatView>
              </StatContainerView>
            ),
          }}
        ></PortalSectionView>
      </DividedLayoutView>
    </DividedLayoutView>
  );
};
