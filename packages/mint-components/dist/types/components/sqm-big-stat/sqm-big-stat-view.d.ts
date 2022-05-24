import { VNode } from "../../stencil-public-runtime";
export interface BigStatViewProps {
  value: number;
  statvalue: string;
  loading: boolean;
  flexReverse?: boolean;
  alignment?: "left" | "right" | "center";
}
export declare function BigStatView(props: BigStatViewProps, children: VNode): any;
