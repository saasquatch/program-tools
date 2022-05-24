import { VNode } from "../../stencil-public-runtime";
import { Spacing } from "../../global/mixins";
interface PortalContainerViewProps {
  direction: "row" | "column";
  padding: Spacing;
  gap: string;
  display?: string;
  minWidth?: string;
  maxWidth?: string;
}
export declare function PortalContainerView(props: PortalContainerViewProps, children: VNode): any;
export {};
