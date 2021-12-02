import React, { useState } from "react"
import { Button } from "../Button"

export default {
  title: "Components / Button / SecondaryButton",
  component: Button,
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
    <Button buttonType="secondary" loading={states[1]} success={states[2]} onClick={() => setCount((count + 1) % 3)}>
      Secondary
    </Button>
  )
}

// Secondary

export const secondarySmall = () => <Button buttonType="secondary" size="small">Secondary</Button>
export const secondaryMedium = () => <Button buttonType="secondary" size="medium">Secondary</Button>
export const secondaryLarge = () => <Button buttonType="secondary" size="large">Secondary</Button>

export const secondaryDisabledSmall = () => (
  <Button buttonType="secondary" disabled size="small">
    Disabled
  </Button>
)
export const secondaryDisabledMedium = () => (
  <Button buttonType="secondary" disabled size="medium">
    Disabled
  </Button>
)
export const secondaryDisabledLarge = () => (
  <Button buttonType="secondary" disabled size="large">
    Disabled
  </Button>
)

// Icon
export const secondaryIconSmall = () => <Button buttonType="secondary" size="small" icon="checkmark" />
export const secondaryIconMedium = () => <Button buttonType="secondary" size="medium" icon="checkmark" />
export const secondaryIconLarge = () => <Button buttonType="secondary" size="large" icon="checkmark" />

export const secondaryIconDisabledSmall = () => <Button buttonType="secondary" disabled size="small" icon="checkmark" />
export const secondaryIconDisabledMedium = () => <Button buttonType="secondary" disabled size="medium" icon="checkmark" />
export const secondaryIconDisabledLarge = () => <Button buttonType="secondary" disabled size="large" icon="checkmark" />

// Critical

export const secondaryCriticalSmall = () => (
  <Button buttonType="secondary" size="small" critical>
    Critical
  </Button>
)
export const secondaryCriticalMedium = () => (
  <Button buttonType="secondary" size="medium" critical>
    Critical
  </Button>
)
export const secondaryCriticalLarge = () => (
  <Button buttonType="secondary" size="large" critical>
    Critical
  </Button>
)

// Success

export const secondarySuccessSmall = () => (
  <Button buttonType="secondary" size="small" success>
    Success
  </Button>
)
export const secondarySuccessMedium = () => (
  <Button buttonType="secondary" size="medium" success>
    Success
  </Button>
)
export const secondarySuccessLarge = () => (
  <Button buttonType="secondary" size="large" success>
    Success
  </Button>
)

// Loading icon only

export const secondaryLoadingIconSmall = () => <Button buttonType="secondary" size="small" loading />
export const secondaryLoadingIconMedium = () => <Button buttonType="secondary" size="medium" loading />
export const secondaryLoadingIconLarge = () => <Button buttonType="secondary" size="large" loading />

// Loading with text

export const secondaryLoadingSmall = () => (
  <Button buttonType="secondary" size="small" loading>
    Loading
  </Button>
)
export const secondaryLoadingMedium = () => (
  <Button buttonType="secondary" size="medium" loading>
    Loading
  </Button>
)
export const secondaryLoadingLarge = () => (
  <Button buttonType="secondary" size="large" loading>
    Loading
  </Button>
)

// Icon Text
export const secondaryIconSmallLeft = () => (
  <Button buttonType="secondary" size="small" icon="add" iconLocation="left">
    Icon Text
  </Button>
)
export const secondaryIconMediumLeft = () => (
  <Button buttonType="secondary" size="medium" icon="add" iconLocation="left">
    Icon Text
  </Button>
)
export const secondaryIconLargeLeft = () => (
  <Button buttonType="secondary" size="large" icon="add" iconLocation="left">
    Icon Text
  </Button>
)
export const secondaryIconSmallRight = () => (
  <Button buttonType="secondary" size="small" icon="add" iconLocation="right">
    Icon Text
  </Button>
)
export const secondaryIconMediumRight = () => (
  <Button buttonType="secondary" size="medium" icon="add" iconLocation="right">
    Icon Text
  </Button>
)
export const secondaryIconLargeRight = () => (
  <Button buttonType="secondary" size="large" icon="add" iconLocation="right">
    Icon Text
  </Button>
)

//
//			PILL
//

// Secondary

export const secondaryPillSmall = () => (
  <Button buttonType="secondary" pill size="small">
    Secondary
  </Button>
)
export const secondaryPillMedium = () => (
  <Button buttonType="secondary" pill size="medium">
    Secondary
  </Button>
)
export const secondaryPillLarge = () => (
  <Button buttonType="secondary" pill size="large">
    Secondary
  </Button>
)

export const secondaryPillDisabledSmall = () => (
  <Button buttonType="secondary" pill disabled size="small">
    Disabled
  </Button>
)
export const secondaryPillDisabledMedium = () => (
  <Button buttonType="secondary" pill disabled size="medium">
    Disabled
  </Button>
)
export const secondaryPillDisabledLarge = () => (
  <Button buttonType="secondary" pill disabled size="large">
    Disabled
  </Button>
)

// Icon
export const secondaryPillIconSmall = () => <Button buttonType="secondary" pill size="small" icon="checkmark" />
export const secondaryPillIconMedium = () => <Button buttonType="secondary" pill size="medium" icon="checkmark" />
export const secondaryPillIconLarge = () => <Button buttonType="secondary" pill size="large" icon="checkmark" />

export const secondaryPillIconDisabledSmall = () => <Button buttonType="secondary" pill disabled size="small" icon="checkmark" />
export const secondaryPillIconDisabledMedium = () => <Button buttonType="secondary" pill disabled size="medium" icon="checkmark" />
export const secondaryPillIconDisabledLarge = () => <Button buttonType="secondary" pill disabled size="large" icon="checkmark" />

// Critical

export const secondaryPillCriticalSmall = () => (
  <Button buttonType="secondary" pill size="small" critical>
    Critical
  </Button>
)
export const secondaryPillCriticalMedium = () => (
  <Button buttonType="secondary" pill size="medium" critical>
    Critical
  </Button>
)
export const secondaryPillCriticalLarge = () => (
  <Button buttonType="secondary" pill size="large" critical>
    Critical
  </Button>
)

// Loading icon only

export const secondaryPillLoadingIconSmall = () => <Button buttonType="secondary" pill size="small" loading />
export const secondaryPillLoadingIconMedium = () => <Button buttonType="secondary" pill size="medium" loading />
export const secondaryPillLoadingIconLarge = () => <Button buttonType="secondary" pill size="large" loading />

// Loading with text

export const secondaryPillLoadingSmall = () => (
  <Button buttonType="secondary" pill size="small" loading>
    Loading
  </Button>
)
export const secondaryPillLoadingMedium = () => (
  <Button buttonType="secondary" pill size="medium" loading>
    Loading
  </Button>
)
export const secondaryPillLoadingLarge = () => (
  <Button buttonType="secondary" pill size="large" loading>
    Loading
  </Button>
)

// Icon Text
export const secondaryPillIconSmallLeft = () => (
  <Button buttonType="secondary" pill size="small" icon="add" iconLocation="left">
    Icon Text
  </Button>
)
export const secondaryPillIconMediumLeft = () => (
  <Button buttonType="secondary" pill size="medium" icon="add" iconLocation="left">
    Icon Text
  </Button>
)
export const secondaryPillIconLargeLeft = () => (
  <Button buttonType="secondary" pill size="large" icon="add" iconLocation="left">
    Icon Text
  </Button>
)
export const secondaryPillIconSmallRight = () => (
  <Button buttonType="secondary" pill size="small" icon="add" iconLocation="right">
    Icon Text
  </Button>
)
export const secondaryPillIconMediumRight = () => (
  <Button buttonType="secondary" pill size="medium" icon="add" iconLocation="right">
    Icon Text
  </Button>
)
export const secondaryPillIconLargeRight = () => (
  <Button buttonType="secondary" pill size="large" icon="add" iconLocation="right">
    Icon Text
  </Button>
)
