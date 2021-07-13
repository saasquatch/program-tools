import { h } from "@stencil/core";
import { BigStatView } from "../components/sqm-big-stat/sqm-big-stat-view";
import jss from "jss";
import preset from "jss-preset-default";
import { gap } from "../global/mixins";

export default {
  title: "Commissions",
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
  );
};
