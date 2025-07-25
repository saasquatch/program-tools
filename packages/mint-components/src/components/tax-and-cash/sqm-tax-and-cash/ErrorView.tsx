import { h } from "@stencil/core";

interface ErrorProps {
  loadingErrorAlertHeader: string;
  loadingErrorAlertDescription: string;
}

export const ErrorView = (props: ErrorProps) => {
  return (
    <sqm-form-message type="error">
      <p part="alert-title">{props.loadingErrorAlertHeader}</p>
      <p part="alert-description">{props.loadingErrorAlertDescription}</p>
    </sqm-form-message>
  );
};
