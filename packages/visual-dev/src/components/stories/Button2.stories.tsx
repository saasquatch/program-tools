import React, { useState } from "react"
import { PrimaryButton } from "../Button"
import { Icon } from "../Icon"

export default {
  title: "Components / PrimaryButton",
  component: PrimaryButton,
}

export const functional = () => "placeholder"

// Primary

export const primarySmall = () => <PrimaryButton size="small">Primary</PrimaryButton>
export const primaryMedium = () => <PrimaryButton size="medium">Primary</PrimaryButton>
export const primaryLarge = () => <PrimaryButton size="large">Primary</PrimaryButton>

export const primaryDisabledSmall = () => (
  <PrimaryButton disabled size="small">
    Disabled
  </PrimaryButton>
)
export const primaryDisabledMedium = () => (
  <PrimaryButton disabled size="medium">
    Disabled
  </PrimaryButton>
)
export const primaryDisabledLarge = () => (
  <PrimaryButton disabled size="large">
    Disabled
  </PrimaryButton>
)

// Icon
export const primaryIconSmall = () => <PrimaryButton size="small" icon="checkmark" />
export const primaryIconMedium = () => <PrimaryButton size="medium" icon="checkmark" />
export const primaryIconLarge = () => <PrimaryButton size="large" icon="checkmark" />

export const primaryIconDisabledSmall = () => <PrimaryButton disabled size="small" icon="checkmark" />
export const primaryIconDisabledMedium = () => <PrimaryButton disabled size="medium" icon="checkmark" />
export const primaryIconDisabledLarge = () => <PrimaryButton disabled size="large" icon="checkmark" />

// Critical

export const primaryCriticalSmall = () => (
  <PrimaryButton size="small" critical>
    Critical
  </PrimaryButton>
)
export const primaryCriticalMedium = () => (
  <PrimaryButton size="medium" critical>
    Critical
  </PrimaryButton>
)
export const primaryCriticalLarge = () => (
  <PrimaryButton size="large" critical>
    Critical
  </PrimaryButton>
)

// Success and Loading icon only

export const primarySuccessIconSmall = () => <PrimaryButton size="small" success />
export const primarySuccessconMedium = () => <PrimaryButton size="medium" success />
export const primarySuccessIconLarge = () => <PrimaryButton size="large" success />

export const primaryLoadingIconSmall = () => <PrimaryButton size="small" loading />
export const primaryLoadingIconMedium = () => <PrimaryButton size="medium" loading />
export const primaryLoadingIconLarge = () => <PrimaryButton size="large" loading />

// Success and Loading with text

export const primarySuccessSmall = () => (
  <PrimaryButton size="small" success>
    Success
  </PrimaryButton>
)
export const primarySuccessMedium = () => (
  <PrimaryButton size="medium" success>
    Success
  </PrimaryButton>
)
export const primarySuccessLarge = () => (
  <PrimaryButton size="large" success>
    Success
  </PrimaryButton>
)
export const primaryLoadingSmall = () => (
  <PrimaryButton size="small" loading>
    Loading
  </PrimaryButton>
)
export const primaryLoadingMedium = () => (
  <PrimaryButton size="medium" loading>
    Loading
  </PrimaryButton>
)
export const primaryLoadingLarge = () => (
  <PrimaryButton size="large" loading>
    Loading
  </PrimaryButton>
)

// Icon Text
export const primaryIconSmallLeft = () => (
  <PrimaryButton size="small" icon="add" left>
    Icon Text
  </PrimaryButton>
)
export const primaryIconMediumLeft = () => (
  <PrimaryButton size="medium" icon="add" left>
    Icon Text
  </PrimaryButton>
)
export const primaryIconLargeLeft = () => (
  <PrimaryButton size="large" icon="add" left>
    Icon Text
  </PrimaryButton>
)
export const primaryIconSmallRight = () => (
  <PrimaryButton size="small" icon="add" right>
    Icon Text
  </PrimaryButton>
)
export const primaryIconMediumRight = () => (
  <PrimaryButton size="medium" icon="add" right>
    Icon Text
  </PrimaryButton>
)
export const primaryIconLargeRight = () => (
  <PrimaryButton size="large" icon="add" right>
    Icon Text
  </PrimaryButton>
)
