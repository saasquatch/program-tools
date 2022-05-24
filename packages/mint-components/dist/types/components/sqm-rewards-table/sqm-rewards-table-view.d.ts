import { VNode } from "../../stencil-public-runtime";
export interface RewardsTableViewProps {
  states: {
    hasPrev: boolean;
    hasNext: boolean;
    show: "loading" | "empty" | "rows";
    namespace: string;
  };
  data: {
    textOverrides: {
      showLabels: boolean;
      prevLabel: string;
      moreLabel: string;
    };
    hiddenColumns: string;
    mdBreakpoint: number;
    smBreakpoint: number;
  };
  callbacks: {
    prevPage: () => void;
    nextPage: () => void;
  };
  elements: {
    columns: VNode[];
    rows: VNode[][];
    loading?: boolean;
    emptyElement?: VNode;
    loadingElement?: VNode;
    page?: number;
  };
}
export declare function RewardsTableView(props: RewardsTableViewProps): any;
