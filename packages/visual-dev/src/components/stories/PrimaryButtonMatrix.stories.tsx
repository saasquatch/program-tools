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
        size: ["small", "medium", "large"],
        pill: [true, false],
        buttonType: ["primary", "secondary"],
      },
      // backgroundColor: "rgba(0,0,0,0.7)", // Optional: If you want to change backgournd color
      // showOriginal: true, // Optional: If you want to show original component set to true
    },
  },
};

export const button = () => <Button>Button</Button>;
export const buttonDisabled = () => <Button disabled>Button</Button>;
export const buttonIcon = () => <Button icon="checkmark" />;
export const buttonIconDisabled = () => <Button disabled icon="checkmark" />;
export const buttonCritical = () => <Button critical>Critical</Button>;
export const buttonLoading = () => <Button loading>Loading</Button>;
export const buttonSuccess = () => <Button success>Success</Button>;
export const buttonLoadingIcon = () => <Button loading />;
export const buttonSuccessIcon = () => <Button success />;

export const buttonIconLeft = () => (
  <Button icon="add" iconLocation="left">
    Icon Text
  </Button>
);
export const buttonIconRight = () => (
  <Button icon="add" iconLocation="right">
    Icon Text
  </Button>
);

