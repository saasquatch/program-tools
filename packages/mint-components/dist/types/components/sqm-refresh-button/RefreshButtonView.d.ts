import { VNode } from "../../stencil-public-runtime";
export interface RefreshButtonViewProps {
  loading?: boolean;
  disabled?: boolean;
  pill?: boolean;
  type?: "primary" | "success" | "info" | "warning" | "danger" | "default" | "text";
  size?: "small" | "medium" | "large";
  icon?: string;
  hideicon?: boolean;
  hidetext?: boolean;
  iconslot?: "prefix" | "suffix";
  onClick?: () => void;
  hide?: boolean;
}
export declare function RefreshButtonView(props: RefreshButtonViewProps, children: VNode): any;
