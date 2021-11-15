import { h } from "@stencil/core";
import { BigStatView } from "./sqm-big-stat-view";

export default {
  title: "Components/Big Stat",
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
  const props = {
    statvalue: "...",
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const InvalidStatValue = () => {
  const props = {
    statvalue: "!!!",
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};
