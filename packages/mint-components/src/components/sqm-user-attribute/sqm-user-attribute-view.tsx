import { h, Host } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
export interface UserAttributeViewProps {
  loading: boolean;
  value: string;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
}

export function UserAttributeView(props: UserAttributeViewProps) {
  const style = {
    P: {
      margin: "0",
      padding: "0",
      fontSize: props.fontSize ? `${props.fontSize}px` : "inherit",
      fontWeight: props.fontWeight || "inherit",
      color: props.color || "var(--sqm-text)",
    },
  };
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  const loadingSkeleton = (
    <sqm-skeleton width="200px" height="20px"></sqm-skeleton>
  );
  const hasValue =
    props.value !== null && props.value !== undefined && props.value !== "";
  return (
    hasValue && (
      <Host>
        <style>{styleString}</style>
        <p class={sheet.classes.P} part="sqm-base">
          {props.loading ? loadingSkeleton : props.value}
        </p>
      </Host>
    )
  );
}
