import React, { useState } from "react"
import { SecondaryButton } from "../Button"

export default {
  title: "Components / Button / SecondaryButton",
  component: SecondaryButton,
}

export const functional = () => "placeholder"

// Primary

export const secondarySmall = () => <SecondaryButton size="small">Primary</SecondaryButton>
export const secondaryMedium = () => <SecondaryButton size="medium">Primary</SecondaryButton>
export const secondaryLarge = () => <SecondaryButton size="large">Primary</SecondaryButton>

export const secondaryDisabledSmall = () => (
  <SecondaryButton disabled size="small">
    Disabled
  </SecondaryButton>
)
export const secondaryDisabledMedium = () => (
  <SecondaryButton disabled size="medium">
    Disabled
  </SecondaryButton>
)
export const secondaryDisabledLarge = () => (
  <SecondaryButton disabled size="large">
    Disabled
  </SecondaryButton>
)

// Icon
export const secondaryIconSmall = () => <SecondaryButton size="small" icon="checkmark" />
export const secondaryIconMedium = () => <SecondaryButton size="medium" icon="checkmark" />
export const secondaryIconLarge = () => <SecondaryButton size="large" icon="checkmark" />

export const secondaryIconDisabledSmall = () => <SecondaryButton disabled size="small" icon="checkmark" />
export const secondaryIconDisabledMedium = () => <SecondaryButton disabled size="medium" icon="checkmark" />
export const secondaryIconDisabledLarge = () => <SecondaryButton disabled size="large" icon="checkmark" />

// Critical

export const secondaryCriticalSmall = () => (
  <SecondaryButton size="small" critical>
    Critical
  </SecondaryButton>
)
export const secondaryCriticalMedium = () => (
  <SecondaryButton size="medium" critical>
    Critical
  </SecondaryButton>
)
export const secondaryCriticalLarge = () => (
  <SecondaryButton size="large" critical>
    Critical
  </SecondaryButton>
)

// Success and Loading icon only

export const secondarySuccessIconSmall = () => <SecondaryButton size="small" success />
export const secondarySuccessconMedium = () => <SecondaryButton size="medium" success />
export const secondarySuccessIconLarge = () => <SecondaryButton size="large" success />

export const secondaryLoadingIconSmall = () => <SecondaryButton size="small" loading />
export const secondaryLoadingIconMedium = () => <SecondaryButton size="medium" loading />
export const secondaryLoadingIconLarge = () => <SecondaryButton size="large" loading />

// Success and Loading with text

export const secondarySuccessSmall = () => (
  <SecondaryButton size="small" success>
    Success
  </SecondaryButton>
)
export const secondarySuccessMedium = () => (
  <SecondaryButton size="medium" success>
    Success
  </SecondaryButton>
)
export const secondarySuccessLarge = () => (
  <SecondaryButton size="large" success>
    Success
  </SecondaryButton>
)
export const secondaryLoadingSmall = () => (
  <SecondaryButton size="small" loading>
    Loading
  </SecondaryButton>
)
export const secondaryLoadingMedium = () => (
  <SecondaryButton size="medium" loading>
    Loading
  </SecondaryButton>
)
export const secondaryLoadingLarge = () => (
  <SecondaryButton size="large" loading>
    Loading
  </SecondaryButton>
)

// Icon Text
export const secondaryIconSmallLeft = () => (
  <SecondaryButton size="small" icon="add" left>
    Icon Text
  </SecondaryButton>
)
export const secondaryIconMediumLeft = () => (
  <SecondaryButton size="medium" icon="add" left>
    Icon Text
  </SecondaryButton>
)
export const secondaryIconLargeLeft = () => (
  <SecondaryButton size="large" icon="add" left>
    Icon Text
  </SecondaryButton>
)
export const secondaryIconSmallRight = () => (
  <SecondaryButton size="small" icon="add" right>
    Icon Text
  </SecondaryButton>
)
export const secondaryIconMediumRight = () => (
  <SecondaryButton size="medium" icon="add" right>
    Icon Text
  </SecondaryButton>
)
export const secondaryIconLargeRight = () => (
  <SecondaryButton size="large" icon="add" right>
    Icon Text
  </SecondaryButton>
)
