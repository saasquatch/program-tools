import { h } from "@stencil/core";
import { BigStatView } from "../components/sqm-big-stat/sqm-big-stat-view";
import { ShareButtonView } from "../components/sqm-share-button/sqm-share-button-view";
import { ShareLinkView } from "../components/sqm-share-link/sqm-share-link-view";
import jss from "jss";
import preset from "jss-preset-default";
import { NavigationSidebarView } from "../components/sqm-navigation-sidebar/sqm-navigation-sidebar-view";
import { NavigationSidebarItemView } from "../components/sqm-navigation-sidebar-item/sqm-navigation-sidebar-item-view";
import { PortalSectionView } from "../components/sqm-titled-section/sqm-portal-section-view";
import { PortalContainerView } from "../components/sqm-portal-container/sqm-portal-container-view";
import { StatContainerView } from "../components/sqm-stat-container/sqm-stat-container-view";
import { PortalProfileView } from "../components/sqm-portal-profile/sqm-portal-profile-view";
import { PortalChangePasswordView } from "../components/sqm-portal-change-password/sqm-portal-change-password-view";

export default {
  title: "New Portal",
};

const style = {
  HeaderSubtitleBold: {
    "font-weight": 500,
    "text-decoration": "underline",
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
    path: "/",
  },
};

const item2Props = {
  states: {
    active: true,
  },
  data: {
    label: "Activity",
    icon: "bar-chart",
    path: "/",
  },
};

const Sidebar = () => {
  return (
    <NavigationSidebarView {...barProps}>
      <NavigationSidebarItemView {...item1Props} />
      <NavigationSidebarItemView {...item2Props} />
    </NavigationSidebarView>
  );
};

export const Dashboard = () => {
  const sharelinkProps = {
    shareString: "https://ssqt.co/johnsmithrox",
    open: false,
    disabled: false,
    tooltiptext: "Share link copied",
    onClick: () => console.log("Share link copied"),
  };

  const sharecodeProps = {
    shareString: "JOHNSMITH1",
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
    <sqm-divided-layout direction="row">
      <style type="text/css">{styleString}</style>
      <Sidebar />
      <sqm-divided-layout direction="column">
        <PortalContainerView
          {...{ direction: "column", padding: "xxx-large", gap: "xxx-large" }}
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
          <StatContainerView {...{ space: "64px" }}>
            <BigStatView {...{ statvalue: "2,345" }}>Clicks</BigStatView>
            <BigStatView {...{ statvalue: "58" }}>Referrals</BigStatView>
            <BigStatView {...{ statvalue: "$10,540" }}>Earned</BigStatView>
            <BigStatView {...{ statvalue: "$2,305" }}>
              Awaiting Payout
            </BigStatView>
          </StatContainerView>
        </PortalContainerView>
        <PortalContainerView
          {...{ direction: "column", padding: "xxx-large", gap: "xxx-large" }}
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
                    gap: "xxx-large",
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
      </sqm-divided-layout>
    </sqm-divided-layout>
  );
};

export const EditProfile = () => {
  return (
    <sqm-divided-layout direction="row">
      <style type="text/css">{styleString}</style>
      <Sidebar />
      <sqm-divided-layout direction="column">
        <PortalProfileView
          {...{
            states: {
              success: false,
              loading: false,
              submitDisabled: false,
              showCountry: false,
              user: {
                id: "01",
                accountId: "111100000",
                firstName: "Joe",
                lastName: "Smith",
                email: "jsmith@gmail.com",
                countryCode: "5000",
              },
              text: {
                firstnametext: "First Name",
                lastnametext: "Last Name",
                emailtext: "Email",
                countrytext: "Country",
              },
              formState: {
                country: "Canada",
                firstName: "Joe",
                lastName: "Smith",
                errors: null,
                error: "",
              },
            },
            callbacks: {
              onSubmit: (e) => console.log(e),
              onChange: (e) => console.log(e),
            },
          }}
        />
        <PortalChangePasswordView
          {...{
            states: {
              open: true,
              error: "",
              loading: false,
              success: false,
              content: {
                modalChangePasswordHeader: "Change Password",
                cancelText: "Cancel",
                changePasswordButtonText: "Change Password",
                passwordFieldLabel: "Password",
                confirmPasswordFieldLabel: "Confirm new password",
                successMessage: "Your password has been updated.",
                portalChangePasswordHeader: "Password",
                portalChangePasswordButtonText: "Change your password...",
              },
            },
            callbacks: {
              setOpen: () => console.log("open"),
              submit: () => console.log("submit"),
            },
          }}
        />
      </sqm-divided-layout>
    </sqm-divided-layout>
  );
};

export const Commissions = () => {
  return (
    <sqm-divided-layout direction="row">
      <style type="text/css">{styleString}</style>
      <Sidebar />
      <sqm-divided-layout direction="column">
        <PortalContainerView
          {...{ direction: "column", padding: "xxx-large", gap: "xxx-large" }}
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
      </sqm-divided-layout>
    </sqm-divided-layout>
  );
};

export const Activity = () => {
  return (
    <sqm-divided-layout direction="row">
      <style type="text/css">{styleString}</style>
      <Sidebar />
      <sqm-divided-layout direction="column">
        <PortalContainerView
          {...{ direction: "column", padding: "xxx-large", gap: "xxx-large" }}
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
      </sqm-divided-layout>
    </sqm-divided-layout>
  );
};
