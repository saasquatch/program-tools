import { addDecorator } from "@storybook/react";
import { withMatrix } from "storybook-addon-matrix";

addDecorator(withMatrix);

import * as React from "react";
import { Button } from "../Button";

export default {
  title: "Components / Button / PrimaryButtonMatrix",
  component: Button,
  parameters: {
    matrix: {
      pattern: {
        size: ["small", "medium", "large"],
        pill: [true, false],
        buttonType: ["primary", "secondary"],
      },
      // backgroundColor: "rgba(0,0,0,0.7)", // Optional: If you want to change backgournd color
      // showOriginal: true, // Optional: If you want to show original component set to true
    },
  },
};

export const primary = () => <Button buttonType="primary">Primary</Button>;
export const primaryDisabled = () => (
  <Button buttonType="primary" disabled>Primary</Button>
);
export const primaryIcon = () => <Button buttonType="primary" icon="checkmark" />;
export const primaryIconDisabled = () => (
  <Button buttonType="primary" disabled icon="checkmark" />
);
export const primaryCritical = () => (
  <Button buttonType="primary" critical>Critical</Button>
);
export const primaryLoading = () => (
  <Button buttonType="primary" loading>Loading</Button>
);
export const primarySuccess = () => (
  <Button buttonType="primary" success>Success</Button>
);
export const primaryLoadingIcon = () => <Button buttonType="primary" loading />;
export const primarySuccessIcon = () => <Button buttonType="primary" success />;

// export const primaryPill = () => <Button buttonType="primary" pill >Primary</Button>
// export const primaryPillDisabled = () => <Button buttonType="primary" pill disabled>Primary</Button>
// export const primaryPillIcon = () => <Button buttonType="primary" pill icon="checkmark" />
// export const primaryPillIconDisabled = () => <Button buttonType="primary" pill disabled icon="checkmark" />
// export const primaryPillCritical = () => <Button buttonType="primary" pill critical>Critical</Button>
// export const primaryPillLoading = () => <Button buttonType="primary" pill loading>Loading</Button>
// export const primaryPillSuccess = () => <Button buttonType="primary" pill success>Success</Button>
// export const primaryPillLoadingIcon = () => <Button buttonType="primary" pill loading />
// export const primaryPillSuccessIcon = () => <Button buttonType="primary" pill success />
