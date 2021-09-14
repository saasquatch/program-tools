import { useMemo } from "@saasquatch/universal-hooks";
import deepmerge from "deepmerge";
import { BigStat } from "./sqm-big-stat";
import { BigStatHook, StatPaths, StatPatterns } from "./useBigStat";

export function useDemoBigStat(props: BigStat): BigStatHook {
  // create label from first part of path only using formatting
  // "/rewardBalance/CREDIT/CASH_USD/prettyValue" => "Reward Balance"
  let label = /^\/(\w+)/
    .exec(props.statType)?.[1]
    ?.replace(/^([a-z])/, (_, c) => c.toUpperCase());

  // we don't have replaceAll :(
  while (label) {
    const old = label;
    label = label.replace(/([a-z])([A-Z])/, "$1 $2");
    if (old === label) break;
  }
  const { statType } = props;
  const re = useMemo(
    () => StatPatterns.find((re) => re.exec(statType)),
    [statType]
  );

  if (!re?.exec(statType)) {
    return {
      props: {
        statvalue: "!!!",
        flexReverse: false,
        alignment: "center" as const,
      },
      label: "BAD PROP TYPE",
    };
  }

  return {
    props: deepmerge(
      {
        statvalue: "12345",
        flexReverse: false,
        alignment: "center" as const,
      },
      props.demoData || {},
      { arrayMerge: (_, a) => a }
    ),
    label: label ?? "Demo Label",
  };
}
