import { h, Host } from "@stencil/core";

export interface UserAttributeViewProps {
  loadingText: string;
  loading: boolean;
  value: string;
}

export function UserAttributeView(props: UserAttributeViewProps) {
  return (
    props.value && (
      <Host>
        <p exportparts="sqm-base">
          {props.loading ? props.loadingText : props.value}
        </p>
      </Host>
    )
  );
}
