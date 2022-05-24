import { VNode } from "../../stencil-public-runtime";
export interface HeroProps {
  states: {
    columns: 1 | 2;
    background?: string;
    secondaryBackground?: string;
    paddingSize: "none" | "small" | "medium" | "large";
    wrapDirection: "wrap" | "wrap-reverse";
  };
  content: {
    primaryColumn?: VNode | VNode[];
    secondaryColumn?: VNode;
  };
}
export declare function HeroView(props: HeroProps): any;
