import { h } from "@stencil/core";
import { intl } from "../../global/global";

export interface EmptyStateViewProps {
  emptyStateImage: string;
  emptyStateHeader: string;
  emptyStateText: string;
  supportText?: string;
  missingFeature?: string;
}

export function EmptyStateView(props: EmptyStateViewProps) {
  const {
    emptyStateHeader,
    emptyStateImage,
    emptyStateText,
    supportText,
    missingFeature = "",
  } = props;

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
          <p innerHTML="" style={{ color: "var(--sl-color-gray-500)" }}>
            {intl.formatMessage(
              {
                id: "emptyStateText",
                defaultMessage: emptyStateText,
              },
              {
                supportText: (
                  <a
                    target="_blank"
                    href={`mailto:saasquatch-support@impact.com?subject=Next steps for ${missingFeature} feature&body=Hi Support Team, %0D%0A
                  %0D%0A  
                  I am interested to learn more about the ${missingFeature} feature. Please let me know the next steps to access this feature, including any necessary plan upgrades.%0D%0A
                  %0D%0A 
                  - Feature Interested In: ${missingFeature}%0D%0A
                  - Company Name: [Please fill out your company name here]%0D%0A
                  %0D%0A
                  Thank you`}
                  >
                    {supportText}
                  </a>
                ),
              }
            )}
          </p>
        </sqm-text>
      </sqm-titled-section>
    </sqm-portal-container>
  );
}
