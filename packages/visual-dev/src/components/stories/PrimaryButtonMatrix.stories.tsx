import { addDecorator } from "@storybook/react";
import { withMatrix } from "storybook-addon-matrix";

addDecorator(withMatrix);

import * as React from "react";
import { Button } from "../Button";

export default {
  title: "Components / Button / ButtonMatrix",
  component: Button,
  parameters: {
    matrix: {
      pattern: {
        buttontype: ["primary", "secondary"],
        size: ["small", "medium", "large"],
        pill: [true, false],
      },
      // backgroundColor: "rgba(0,0,0,0.7)", // Optional: If you want to change backgournd color
      // showOriginal: true, // Optional: If you want to show original component set to true
    },
  },
};

export const primary = () => <Button>Primary</Button>;
export const primaryDisabled = () => (
  <Button disabled>Primary</Button>
);
export const primaryIcon = () => <Button icon="checkmark" />;
export const primaryIconDisabled = () => (
  <Button disabled icon="checkmark" />
);
export const primaryCritical = () => (
  <Button critical>Critical</Button>
);
export const primaryLoading = () => (
  <Button loading>Loading</Button>
);
export const primarySuccess = () => (
  <Button success>Success</Button>
);
export const primaryLoadingIcon = () => <Button loading />;
export const primarySuccessIcon = () => <Button success />;

// export const primaryPill = () => <Button pill >Primary</Button>
// export const primaryPillDisabled = () => <Button pill disabled>Primary</Button>
// export const primaryPillIcon = () => <Button pill icon="checkmark" />
// export const primaryPillIconDisabled = () => <Button pill disabled icon="checkmark" />
// export const primaryPillCritical = () => <Button pill critical>Critical</Button>
// export const primaryPillLoading = () => <Button pill loading>Loading</Button>
// export const primaryPillSuccess = () => <Button pill success>Success</Button>
// export const primaryPillLoadingIcon = () => <Button pill loading />
// export const primaryPillSuccessIcon = () => <Button pill success />
