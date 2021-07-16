import { BigStat } from "./sqm-big-stat";
import { BigStatHook } from "./useBigStat";

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

  return {
    props: {
      statvalue: "12345",
      flexReverse: false,
      alignment: "center",
    },
    label: label ?? "Demo Label",
  };
}
