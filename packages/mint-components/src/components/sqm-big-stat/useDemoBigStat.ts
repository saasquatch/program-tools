import { useMemo } from "@saasquatch/universal-hooks";
import deepmerge from "deepmerge";
import { useChildElements } from "../../tables/useChildElements";
import { BigStat } from "./sqm-big-stat";
import { BigStatHook, queries, StatPatterns } from "./useBigStat";

export function useDemoBigStat(props: BigStat): BigStatHook {
  const { statType } = props;
  const re = useMemo(
    () => StatPatterns.find((re) => re.exec(statType)),
    [statType]
  );
  // triggers a re-render if the label is manually changed
  useChildElements();

  if (!re?.exec(statType)) {
    return {
      props: {
        value: 0,
        statvalue: "!!!",
        loading: false,
        flexReverse: false,
        alignment: "center" as const,
        statColor: "var(--sl-color-gray-800)" as const,
        statDescriptionColor: "var(--sl-color-gray-600)" as const,
        statFontSize: "x-large",
        statDescriptionFontSize: "small",
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
        value: 0,
        flexReverse: props.flexReverse,
        alignment: props.alignment,
        statColor: props.statColor,
        statDescriptionColor: props.statDescriptionColor,
        statFontSize: props.statFontSize,
        statDescriptionFontSize: props.statDescriptionFontSize,
      },
      props.demoData || {},
      { arrayMerge: (_, a) => a }
    ),
    label: label ?? "Demo Label",
  };
}
