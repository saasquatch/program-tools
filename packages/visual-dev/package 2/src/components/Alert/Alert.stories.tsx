import React from "react";
import { AlertView } from ".";

export default {
  title: "Components / Alert",
  component: AlertView,
};

export const critical = () => (
  <AlertView type="critical" title="A critical alert">
    An explanation of what this alert is.
  </AlertView>
);
export const warning = () => (
  <AlertView type="warning" title="A warning alert">
    An explanation of what this alert is.
  </AlertView>
);
export const success = () => (
  <AlertView type="success" title="A success alert">
    An explanation of what this alert is.
  </AlertView>
);
export const info = () => (
  <AlertView type="info" title="An info alert">
    An explanation of what this alert is in multiple lines.
  </AlertView>
);
export const customCSS = () => (
  <AlertView
    type="success"
    title="An info alert"
    customCSS="background:red !important;"
  >
    An explanation of what this alert is in multiple lines.
  </AlertView>
);
