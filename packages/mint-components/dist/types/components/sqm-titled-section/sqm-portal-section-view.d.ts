import { VNode } from "../../stencil-public-runtime";
import { Spacing } from "../../global/mixins";
export interface PortalSectionProps {
  labelMargin: Spacing;
  padding: Spacing;
  label: VNode;
  content: VNode;
  align?: "left" | "center" | "right";
}
export declare function PortalSectionView(props: PortalSectionProps): any;
