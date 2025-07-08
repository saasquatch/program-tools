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
        flexReverse: props.flexReverse,
        alignment: props.alignment,
        statTextColor: props.statTextColor,
        statFontSize: props.statFontSize,
        descriptionTextColor: props.descriptionTextColor,
        descriptionFontSize: props.descriptionFontSize,
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
        statTextColor: props.statTextColor,
        statFontSize: props.statFontSize,
        descriptionTextColor: props.descriptionTextColor,
        descriptionFontSize: props.descriptionFontSize,
        statFontWeight: props.statFontWeight,
      },
      props.demoData || {},
      { arrayMerge: (_, a) => a }
    ),
    label: label ?? "Demo Label",
  };
}
