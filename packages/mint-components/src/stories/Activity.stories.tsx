import { h } from "@stencil/core";
import { BigStatView } from "../components/sqm-big-stat/sqm-big-stat-view";
import jss from "jss";
import preset from "jss-preset-default";
import { gap } from "../global/mixins";

export default {
  title: "Activity",
};

const style = {
  HeaderContainer: {
    display: "flex",
    "flex-direction": "column",
    "margin-bottom": "40px",
  },

  Header: {
    "margin-bottom": 0,
    color: "#555555",
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

  StatContainer: {
    display: "flex",
    "margin-bottom": "32px",
    ...gap({ direction: "row", size: "32px" }),
  },
};

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export const Default = () => {
  return (
    <div>
      <style type="text/css">{styleString}</style>
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
        <BigStatView {...{ statvalue: "180" }}>From share mediums</BigStatView>
      </div>
    </div>
  );
};
