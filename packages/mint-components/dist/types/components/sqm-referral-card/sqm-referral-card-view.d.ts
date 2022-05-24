import { VNode } from "../../stencil-public-runtime";
import { Spacing } from "../../global/mixins";
export interface ReferralCardViewProps {
  header: string;
  description: string;
  padding: Spacing;
  verticalAlignment: "start" | "center" | "end";
  slots: {
    left: VNode;
    right: VNode;
  };
}
export declare function ReferralCardView(props: ReferralCardViewProps): any;
