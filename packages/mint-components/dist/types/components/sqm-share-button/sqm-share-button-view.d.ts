import { VNode } from "../../stencil-public-runtime";
export interface ShareButtonViewProps {
  medium: "facebook" | "twitter" | "email" | "direct" | "linkedin" | "sms" | "fbmessenger" | "whatsapp" | "linemessenger" | "pinterest" | "reminder" | "unknown";
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
  borderradius?: number;
  backgroundcolor?: string;
  textcolor?: string;
}
export declare function ShareButtonView(props: ShareButtonViewProps, children: VNode): any;
