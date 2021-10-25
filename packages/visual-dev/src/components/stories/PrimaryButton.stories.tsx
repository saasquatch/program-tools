import React, { useState } from "react"
import { PrimaryButton } from "../Button"

export default {
  title: "Components / Button / PrimaryButton",
  component: PrimaryButton,
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
    <PrimaryButton loading={states[1]} success={states[2]} onClick={() => setCount((count + 1) % 3)}>
      Primary
    </PrimaryButton>
  )
}

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

//
//			PILL
//

// Primary

export const primaryPillSmall = () => (
  <PrimaryButton pill size="small">
    Primary
  </PrimaryButton>
)
export const primaryPillMedium = () => (
  <PrimaryButton pill size="medium">
    Primary
  </PrimaryButton>
)
export const primaryPillLarge = () => (
  <PrimaryButton pill size="large">
    Primary
  </PrimaryButton>
)

export const primaryPillDisabledSmall = () => (
  <PrimaryButton pill disabled size="small">
    Disabled
  </PrimaryButton>
)
export const primaryPillDisabledMedium = () => (
  <PrimaryButton pill disabled size="medium">
    Disabled
  </PrimaryButton>
)
export const primaryPillDisabledLarge = () => (
  <PrimaryButton pill disabled size="large">
    Disabled
  </PrimaryButton>
)

// Icon
export const primaryPillIconSmall = () => <PrimaryButton pill size="small" icon="checkmark" />
export const primaryPillIconMedium = () => <PrimaryButton pill size="medium" icon="checkmark" />
export const primaryPillIconLarge = () => <PrimaryButton pill size="large" icon="checkmark" />

export const primaryPillIconDisabledSmall = () => <PrimaryButton pill disabled size="small" icon="checkmark" />
export const primaryPillIconDisabledMedium = () => <PrimaryButton pill disabled size="medium" icon="checkmark" />
export const primaryPillIconDisabledLarge = () => <PrimaryButton pill disabled size="large" icon="checkmark" />

// Critical

export const primaryPillCriticalSmall = () => (
  <PrimaryButton pill size="small" critical>
    Critical
  </PrimaryButton>
)
export const primaryPillCriticalMedium = () => (
  <PrimaryButton pill size="medium" critical>
    Critical
  </PrimaryButton>
)
export const primaryPillCriticalLarge = () => (
  <PrimaryButton pill size="large" critical>
    Critical
  </PrimaryButton>
)

// Success and Loading icon only

export const primaryPillSuccessIconSmall = () => <PrimaryButton pill size="small" success />
export const primaryPillSuccessconMedium = () => <PrimaryButton pill size="medium" success />
export const primaryPillSuccessIconLarge = () => <PrimaryButton pill size="large" success />

export const primaryPillLoadingIconSmall = () => <PrimaryButton pill size="small" loading />
export const primaryPillLoadingIconMedium = () => <PrimaryButton pill size="medium" loading />
export const primaryPillLoadingIconLarge = () => <PrimaryButton pill size="large" loading />

// Success and Loading with text

export const primaryPillSuccessSmall = () => (
  <PrimaryButton pill size="small" success>
    Success
  </PrimaryButton>
)
export const primaryPillSuccessMedium = () => (
  <PrimaryButton pill size="medium" success>
    Success
  </PrimaryButton>
)
export const primaryPillSuccessLarge = () => (
  <PrimaryButton pill size="large" success>
    Success
  </PrimaryButton>
)
export const primaryPillLoadingSmall = () => (
  <PrimaryButton pill size="small" loading>
    Loading
  </PrimaryButton>
)
export const primaryPillLoadingMedium = () => (
  <PrimaryButton pill size="medium" loading>
    Loading
  </PrimaryButton>
)
export const primaryPillLoadingLarge = () => (
  <PrimaryButton pill size="large" loading>
    Loading
  </PrimaryButton>
)

// Icon Text
export const primaryPillIconSmallLeft = () => (
  <PrimaryButton pill size="small" icon="add" left>
    Icon Text
  </PrimaryButton>
)
export const primaryPillIconMediumLeft = () => (
  <PrimaryButton pill size="medium" icon="add" left>
    Icon Text
  </PrimaryButton>
)
export const primaryPillIconLargeLeft = () => (
  <PrimaryButton pill size="large" icon="add" left>
    Icon Text
  </PrimaryButton>
)
export const primaryPillIconSmallRight = () => (
  <PrimaryButton pill size="small" icon="add" right>
    Icon Text
  </PrimaryButton>
)
export const primaryPillIconMediumRight = () => (
  <PrimaryButton pill size="medium" icon="add" right>
    Icon Text
  </PrimaryButton>
)
export const primaryPillIconLargeRight = () => (
  <PrimaryButton pill size="large" icon="add" right>
    Icon Text
  </PrimaryButton>
)
