import { h } from "@stencil/core";
import { BigStatView } from "./sqm-big-stat-view";

export default {
  title: "Components/Big Stat",
};

export const Default = () => {
  const props = { value:990000, statvalue: "9.900,00" };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const LeftAlign = () => {
  const props = {
    value:500,
    statvalue: "500",
    alignment: "left" as const,
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const RightAlign = () => {
  const props = {
    value:500,
    statvalue: "500",
    alignment: "right" as const,
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const FlexReverse = () => {
  const props = {
    value:500,
    statvalue: "500",
    flexReverse: true,
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const FlexReverseRight = () => {
  const props = {
    value:500,
    statvalue: "500",
    flexReverse: true,
    alignment: "right" as const,
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const FlexReverseLeft = () => {
  const props = {
    value:500,
    statvalue: "500",
    flexReverse: true,
    alignment: "left" as const,
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const NoStatValue = () => {
  const props = {
    value:0,
    statvalue: "...",
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};

export const InvalidStatValue = () => {
  const props = {
    value:0,
    statvalue: "!!!",
  };
  return <BigStatView {...props}>Big stat</BigStatView>;
};
