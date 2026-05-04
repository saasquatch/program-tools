import { h, Host } from "@stencil/core";
export interface UserAttributeViewProps {
  loading: boolean;
  value: string;
  fontsize?: string;
  color?: string;
  fontweight?: string;
}

export function UserAttributeView(props: UserAttributeViewProps) {
  const vanillaStyle = `
    p {
    margin: 0;
    padding: 0;
    ${props.fontsize && `font-size: ${props.fontsize};`}
    ${props.fontweight && `font-weight: ${props.fontweight};`}
    color: ${props.color ? props.color : "var(--sqm-text)"};
  }`;

  const loadingSkeleton = (
    <sqm-skeleton width="200px" height="20px"></sqm-skeleton>
  );
  return (
    props.value && (
      <Host>
        <style>{vanillaStyle}</style>
        <p part="sqm-base">{props.loading ? loadingSkeleton : props.value}</p>
      </Host>
    )
  );
}
