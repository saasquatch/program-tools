import { useMemo } from "@saasquatch/universal-hooks";
import deepmerge from "deepmerge";
import { BigStat } from "./sqm-big-stat";
import { BigStatHook, queries, StatPaths, StatPatterns } from "./useBigStat";

export function useDemoBigStat(props: BigStat): BigStatHook {
  const { statType } = props;
  const re = useMemo(
    () => StatPatterns.find((re) => re.exec(statType)),
    [statType]
  );

  if (!re?.exec(statType)) {
    return {
      props: {
        value: 0,
        statvalue: "!!!",
        loading:false,
        flexReverse: false,
        alignment: "center" as const,
      },
      label: "BAD PROP TYPE",
    };
  }

  const result = re.exec(statType);
  const queryName = result[1];
  const label = queries[queryName].label;

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
