import { h } from "@stencil/core";
import { BigStatView } from "./sqm-big-stat-view";
import scenario from "./BigStat.feature";

export default {
  title: "Components/Big Stat",
  parameters: {
    scenario,
  },
};

export const Default = () => {
  const props = { value: 990000, statvalue: "9.900,00", loading: false };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const LeftAlign = () => {
  const props = {
    value: 500,
    statvalue: "500",
    alignment: "left" as const,
    loading: false,
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const RightAlign = () => {
  const props = {
    value: 500,
    statvalue: "500",
    alignment: "right" as const,
    loading: false,
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const FlexReverse = () => {
  const props = {
    value: 500,
    statvalue: "500",
    flexReverse: true,
    loading: false,
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const FlexReverseRight = () => {
  const props = {
    value: 500,
    statvalue: "500",
    flexReverse: true,
    alignment: "right" as const,
    loading: false,
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const FlexReverseLeft = () => {
  const props = {
    value: 500,
    statvalue: "500",
    flexReverse: true,
    alignment: "left" as const,
    loading: false,
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const NoStatValue = () => {
  const props = {
    value: 0,
    statvalue: "...",
    loading: false,
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const InvalidStatValue = () => {
  const props = {
    value: 0,
    statvalue: "!!!",
    loading: false,
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const MultipleStats = () => {
  return (
    <sqm-stat-container space="xxx-large" display="flex">
      <sqm-big-stat
        flex-reverse="true"
        alignment="left"
        stat-type="/referralsCount"
      >
        <sqm-text>
          <p>Rewards Redeemed</p>
        </sqm-text>
      </sqm-big-stat>
      <sqm-big-stat
        flex-reverse="true"
        alignment="left"
        stat-type="/rewardsRedeemed/CREDIT/global"
      >
        <sqm-text>
          <p>Rewards Redeemed</p>
        </sqm-text>
      </sqm-big-stat>
      <sqm-big-stat
        flex-reverse="true"
        alignment="left"
        stat-type="/rewardBalance/CREDIT/POINT/value/global"
      >
        <sqm-text>
          <p>Points Balance</p>
        </sqm-text>
      </sqm-big-stat>
    </sqm-stat-container>
  )
}
