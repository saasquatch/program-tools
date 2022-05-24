import { VNode } from "../../stencil-public-runtime";
export interface ReferralTableViewProps {
  states: {
    hasPrev: boolean;
    loading: boolean;
    hasNext: boolean;
  };
  data: {
    textOverrides: {
      showLabels: boolean;
      prevLabel: string;
      moreLabel: string;
    };
    referralData?: Referral[];
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
export declare function ReferralTableView(props: ReferralTableViewProps): any;
