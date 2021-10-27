import { addDecorator } from "@storybook/react"
import { withMatrix } from "storybook-addon-matrix"

addDecorator(withMatrix)

import * as React from "react"
import { PrimaryButton, SecondaryButton } from "../Button"

export default {
  title: "Components / Button / PrimaryButtonMatrix",
  component: PrimaryButton,
  parameters: {
    matrix: {
      // Parameter name is matrix
      pattern: {
        size: ["small", "medium", "large"],
        // pill: [true, false],
      },
      //   backgroundColor: "rgba(0,0,0,0.7)", // Optional: If you want to change backgournd color
      //   showOriginal: true, // Optional: If you want to show original component set to true
    },
  },
}

export const primary = () => <PrimaryButton>Primary</PrimaryButton>
export const primaryDisabled = () => <PrimaryButton disabled>Primary</PrimaryButton>
export const primaryIcon = () => <PrimaryButton icon="checkmark" />
export const primaryIconDisabled = () => <PrimaryButton disabled icon="checkmark" />
export const primaryCritical = () => <PrimaryButton critical>Critical</PrimaryButton>
export const primaryLoading = () => <PrimaryButton loading>Loading</PrimaryButton>
export const primarySuccess = () => <PrimaryButton success>Success</PrimaryButton>
export const primaryLoadingIcon = () => <PrimaryButton loading />
export const primarySuccessIcon = () => <PrimaryButton success />
