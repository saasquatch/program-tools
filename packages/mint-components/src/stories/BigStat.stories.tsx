import { h } from "@stencil/core";
import { BigStatView } from "../components/sqm-big-stat/sqm-big-stat-view";

export default {
  title: "Big Stat",
};

export const Default = () => {
  const props = { statvalue: "9.900,00" };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const LeftAlign = () => {
  const props = {
    statvalue: "500",
    alignment: "left" as const,
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const RightAlign = () => {
  const props = {
    statvalue: "500",
    alignment: "right" as const,
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const FlexReverse = () => {
  const props = {
    statvalue: "500",
    flexReverse: true,
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const FlexReverseRight = () => {
  const props = {
    statvalue: "500",
    flexReverse: true,
    alignment: "right" as const,
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const FlexReverseLeft = () => {
  const props = {
    statvalue: "500",
    flexReverse: true,
    alignment: "left" as const,
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const NoStatValue = () => {
  return (
    <sqm-big-stat
      stat-type="/rewardsCount"
      demoData={{
        alignment: "center",
      }}
    >
      <sqm-text>
        <p>Big stat</p>
      </sqm-text>
    </sqm-big-stat>
  );
};
