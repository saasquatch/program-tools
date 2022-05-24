import { BigStat } from "./sqm-big-stat";
import { BigStatViewProps } from "./sqm-big-stat-view";
export declare const queries: {
  [key: string]: {
    label: string;
    query: (programId: string, ...args: string[]) => {
      value: number;
      statvalue: string;
      loading: boolean;
    };
  };
};
export declare const StatPaths: {
  name: string;
  route: string;
}[];
export declare const StatPatterns: RegExp[];
export declare function useBigStat(props: BigStat): BigStatHook;
export declare type BigStatHook = {
  props: BigStatViewProps;
  label: string;
};
