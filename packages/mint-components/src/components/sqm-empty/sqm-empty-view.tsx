import { h } from "@stencil/core";

export interface EmptyStateViewProps {
  emptyStateImage: string;
  emptyStateHeader: string;
  emptyStateText: string;
  table: boolean;
}

export function EmptyStateView(props: EmptyStateViewProps) {
  const { emptyStateHeader, emptyStateImage, emptyStateText, table } = props;

  function emptyBase() {
    return (
      <sqm-portal-container padding="xxxx-large" gap="medium">
        <sqm-image image-url={emptyStateImage} max-width="100px"></sqm-image>
        <sqm-titled-section label-margin="xxx-small" text-align="center">
          <sqm-text slot="label">
            <h3>{emptyStateHeader}</h3>
          </sqm-text>
          <sqm-text slot="content">{emptyStateText}</sqm-text>
        </sqm-titled-section>
      </sqm-portal-container>
    );
  }

  if (table) {
    return (
      <div style={{ display: "contents" }}>
        <sqm-table-row>
          <sqm-table-cell colspan={1000} style={{ textAlign: "center" }}>
            {emptyBase()}
          </sqm-table-cell>
        </sqm-table-row>
      </div>
    );
  }
  return <div>{emptyBase()}</div>;
}
