import { Host, h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";

interface ErrorProps {
  loadingErrorAlertHeader: string;
  loadingErrorAlertDescription: string;
}

const styles = {
  Alert: {
    "&::part(base)": {
      backgroundColor: "var(--sl-color-danger-100)",
      border: "1px solid var(--sl-color-danger-200)",
      padding: "0 16px",
    },
    "& sl-icon": {
      margin: 0,
    },

    "& sl-icon::part(base)": {
      color: "var(--sl-color-danger-500)",
      margin: 0,
    },
  },
};

export const ErrorView = (props: ErrorProps) => {
  const sheet = createStyleSheet(styles);
  const styleString = sheet.toString();
  const { classes } = sheet;
  return (
    <div>
      <style>{styleString}</style>
      <sl-alert
        exportparts="base: alert-base, icon:alert-icon"
        type="danger"
        open
        class={classes.Alert}
      >
        <sl-icon slot="icon" name="exclamation-octagon" class="Error"></sl-icon>
        <strong>{props.loadingErrorAlertHeader}</strong>
        <br />
        {props.loadingErrorAlertDescription}
      </sl-alert>
    </div>
  );
};
