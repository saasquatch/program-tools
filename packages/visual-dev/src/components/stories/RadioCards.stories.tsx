import { storiesOf } from "@storybook/react";
import React from "react";
import DetailedRadiosWidget from "../RadioCards";

storiesOf("UI Schema Widgets / DetailedRadiosWidget", module).add("Item selected", () => {
  const options = {
    cardFormat: true,
    radioOptions: [
      {
        key: "QUERY/USER",
        label: "User details",
        description:
          "Export a list of all users to keep your records up to date with SaaSquatch sharelinks and referral codes.",
        name: "action",
      },
      {
        key: "QUERY/REWARD",
        label: "Reward details",
        description:
          "A report of all earned rewards within your programs. Use this information to create balance sheets, track reward status at a specific point in time, and more.",
        name: "action",
      },
      {
        key: "QUERY/USER_REWARD_BALANCE",
        label: "Reward balances by user",
        description:
          "A list of all rewards with key information for fulfilling rewards manually, or in a system like Tango Card.",
        name: "action",
      },
      {
        key: "QUERY/REDEEMABLE_REWARD_BALANCE",
        label: "Available reward balances by user",
        description:
          "A list of available rewards to help with your bulk reward redemption process.",
        name: "action",
      },
      {
        key: "QUERY/USER_REFERRAL",
        label: "Referral activity",
        description:
          "A record of all referral connections made in your referral programs to analyse their rate of success and track new users being brought in.",
        name: "action",
      },
    ],
    currentLink: "the link",
    currentCode: "thecode"
  }

  

  return (
    <div style={{ margin: "100px" }}>
      <DetailedRadiosWidget options={options} value={"QUERY/USER"} onChange={(v)=>console.log('change', v)}></DetailedRadiosWidget>
    </div>
  );
});