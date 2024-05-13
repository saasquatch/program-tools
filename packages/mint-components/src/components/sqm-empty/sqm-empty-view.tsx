import { h } from "@stencil/core";

export interface EmptyStateViewProps {
  emptyStateImage: string;
  emptyStateHeader: string;
  emptyStateText: string;
}

export function EmptyStateView(props: EmptyStateViewProps) {
  const { emptyStateHeader, emptyStateImage, emptyStateText } = props;

  return (
    <sqm-portal-container padding="large" gap="medium" part="sqm-base">
      <img style={{ height: "100px", margin: "auto" }} src={emptyStateImage} />
      <sqm-titled-section
        style={{ maxHeight: "400px" }}
        label-margin="xxx-small"
        text-align="center"
      >
        <sqm-text slot="label">
          <p>{emptyStateHeader}</p>
        </sqm-text>
        <sqm-text slot="content">
          <p
            innerHTML={emptyStateText}
            style={{ color: "var(--sl-color-gray-500)" }}
          ></p>
        </sqm-text>
      </sqm-titled-section>
    </sqm-portal-container>
  );
}
