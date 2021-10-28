import React, { useState } from "react"
import { SecondaryButton } from "../Button"

export default {
  title: "Components / Button / SecondaryButton",
  component: SecondaryButton,
}

export const Functional = () => {
  const [count, setCount] = useState(0)

  const states = {
    0: false,
    1: false,
    2: false,
  }

  states[count] = true

  return (
    <SecondaryButton loading={states[1]} success={states[2]} onClick={() => setCount((count + 1) % 3)}>
      Secondary
    </SecondaryButton>
  )
}

// Secondary

export const secondarySmall = () => <SecondaryButton size="small">Secondary</SecondaryButton>
export const secondaryMedium = () => <SecondaryButton size="medium">Secondary</SecondaryButton>
export const secondaryLarge = () => <SecondaryButton size="large">Secondary</SecondaryButton>

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

// Success

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

// Loading icon only

export const secondaryLoadingIconSmall = () => <SecondaryButton size="small" loading />
export const secondaryLoadingIconMedium = () => <SecondaryButton size="medium" loading />
export const secondaryLoadingIconLarge = () => <SecondaryButton size="large" loading />

// Loading with text

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

//
//			PILL
//

// Secondary

export const secondaryPillSmall = () => (
  <SecondaryButton pill size="small">
    Secondary
  </SecondaryButton>
)
export const secondaryPillMedium = () => (
  <SecondaryButton pill size="medium">
    Secondary
  </SecondaryButton>
)
export const secondaryPillLarge = () => (
  <SecondaryButton pill size="large">
    Secondary
  </SecondaryButton>
)

export const secondaryPillDisabledSmall = () => (
  <SecondaryButton pill disabled size="small">
    Disabled
  </SecondaryButton>
)
export const secondaryPillDisabledMedium = () => (
  <SecondaryButton pill disabled size="medium">
    Disabled
  </SecondaryButton>
)
export const secondaryPillDisabledLarge = () => (
  <SecondaryButton pill disabled size="large">
    Disabled
  </SecondaryButton>
)

// Icon
export const secondaryPillIconSmall = () => <SecondaryButton pill size="small" icon="checkmark" />
export const secondaryPillIconMedium = () => <SecondaryButton pill size="medium" icon="checkmark" />
export const secondaryPillIconLarge = () => <SecondaryButton pill size="large" icon="checkmark" />

export const secondaryPillIconDisabledSmall = () => <SecondaryButton pill disabled size="small" icon="checkmark" />
export const secondaryPillIconDisabledMedium = () => <SecondaryButton pill disabled size="medium" icon="checkmark" />
export const secondaryPillIconDisabledLarge = () => <SecondaryButton pill disabled size="large" icon="checkmark" />

// Critical

export const secondaryPillCriticalSmall = () => (
  <SecondaryButton pill size="small" critical>
    Critical
  </SecondaryButton>
)
export const secondaryPillCriticalMedium = () => (
  <SecondaryButton pill size="medium" critical>
    Critical
  </SecondaryButton>
)
export const secondaryPillCriticalLarge = () => (
  <SecondaryButton pill size="large" critical>
    Critical
  </SecondaryButton>
)

// Loading icon only

export const secondaryPillLoadingIconSmall = () => <SecondaryButton pill size="small" loading />
export const secondaryPillLoadingIconMedium = () => <SecondaryButton pill size="medium" loading />
export const secondaryPillLoadingIconLarge = () => <SecondaryButton pill size="large" loading />

// Loading with text

export const secondaryPillLoadingSmall = () => (
  <SecondaryButton pill size="small" loading>
    Loading
  </SecondaryButton>
)
export const secondaryPillLoadingMedium = () => (
  <SecondaryButton pill size="medium" loading>
    Loading
  </SecondaryButton>
)
export const secondaryPillLoadingLarge = () => (
  <SecondaryButton pill size="large" loading>
    Loading
  </SecondaryButton>
)

// Icon Text
export const secondaryPillIconSmallLeft = () => (
  <SecondaryButton pill size="small" icon="add" left>
    Icon Text
  </SecondaryButton>
)
export const secondaryPillIconMediumLeft = () => (
  <SecondaryButton pill size="medium" icon="add" left>
    Icon Text
  </SecondaryButton>
)
export const secondaryPillIconLargeLeft = () => (
  <SecondaryButton pill size="large" icon="add" left>
    Icon Text
  </SecondaryButton>
)
export const secondaryPillIconSmallRight = () => (
  <SecondaryButton pill size="small" icon="add" right>
    Icon Text
  </SecondaryButton>
)
export const secondaryPillIconMediumRight = () => (
  <SecondaryButton pill size="medium" icon="add" right>
    Icon Text
  </SecondaryButton>
)
export const secondaryPillIconLargeRight = () => (
  <SecondaryButton pill size="large" icon="add" right>
    Icon Text
  </SecondaryButton>
)
