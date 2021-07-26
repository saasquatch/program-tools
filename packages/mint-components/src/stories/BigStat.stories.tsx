import { h } from "@stencil/core";
import { BigStatView } from "../components/sqm-big-stat/sqm-big-stat-view";

export default {
  title: "Big Stat",
};

export const Default = () => {
  const props = { statvalue: "9.900,00" };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const FullStack = () => {
  return (
    <sqm-big-stat
      flex-reverse="true"
      alignment="left"
      stat-type="/rewardsCount"
      demoData={{
        statvalue: "123",
        flexReverse: true,
        alignment: "left",
      }}
    >
      <sqm-text>
        <p>Rewards</p>
      </sqm-text>
    </sqm-big-stat>
  );
};

export const FullStackDefaults = () => {
  return (
    <sqm-big-stat
      flex-reverse="true"
      alignment="left"
      stat-type="/rewardsCount"
    >
      <sqm-text>
        <p>Rewards</p>
      </sqm-text>
    </sqm-big-stat>
  );
};
