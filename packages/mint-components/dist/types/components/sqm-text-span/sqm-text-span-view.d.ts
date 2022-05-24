import { VNode } from "../../stencil-public-runtime";
export interface TextSpanView {
  type: "p" | "subtext" | "h1" | "h2" | "h3" | "h4";
}
export declare function TextSpanView(props: TextSpanView, children: VNode): any;
