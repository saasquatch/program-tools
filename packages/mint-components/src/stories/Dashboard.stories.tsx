import { h } from "@stencil/core";
import { BigStatView } from "../components/sqm-big-stat/sqm-big-stat-view";
import { ShareButtonView } from "../components/sqm-share-button/sqm-share-button-view";
import { ShareLinkView } from "../components/sqm-share-link/sqm-share-link-view";
import jss from "jss";
import preset from "jss-preset-default";
import { gap } from "../global/mixins";

export default {
  title: "Dashboard",
};

const style = {
  HeaderContainer: {
    display: "flex",
    "flex-direction": "column",
  },
  StatContainer: {
    display: "flex",
    ...gap({ direction: "row", size: "32px" }),
  },
  InfoContainer: {},
  ShareItemContainer: {
    "& > h3": {
      margin: "0 0 12px",
    },
  },
  ShareContainer: {
    padding: "54px",
    "& > div": {
      "margin-bottom": "48px",
    },
  },
  ShareButtonContainer: {
    display: "flex",
    ...gap({ direction: "row", size: "32px" }),
  },
};

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export const Default = () => {
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
    <div>
      <style type="text/css">{styleString}</style>
      <div>
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
