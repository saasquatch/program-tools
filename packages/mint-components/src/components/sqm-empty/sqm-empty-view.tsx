import { h } from "@stencil/core";

export interface EmptyStateViewProps {
  emptyStateImage: string;
  emptyStateHeader: string;
  emptyStateText: string;
}

export function EmptyStateView(props: EmptyStateViewProps) {
  const { emptyStateHeader, emptyStateImage, emptyStateText } = props;

  return (
    <sqm-portal-container padding="xxxx-large" gap="medium">
      <sqm-image image-url={emptyStateImage}></sqm-image>
      <sqm-titled-section label-margin="xxx-small" text-align="center">
        <sqm-text slot="label">
          <h4>{emptyStateHeader}</h4>
        </sqm-text>
        <sqm-text slot="content">{emptyStateText}</sqm-text>
      </sqm-titled-section>
    </sqm-portal-container>
  );
}
