import React, { useState } from "react"
import { TextButton } from "../Button"

export default {
  title: "Components / Button / TextButton",
  component: TextButton,
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
    <TextButton critical={states[1]} success={states[2]} onClick={() => setCount((count + 1) % 3)}>
      Text Button
    </TextButton>
  )
}

// Text Button

export const textSmall = () => <TextButton size="small">Text Button</TextButton>
export const textMedium = () => <TextButton size="medium">Text Button</TextButton>
export const textLarge = () => <TextButton size="large">Text Button</TextButton>

export const textDisabledSmall = () => (
  <TextButton disabled size="small">
    Disabled
  </TextButton>
)
export const textDisabledMedium = () => (
  <TextButton disabled size="medium">
    Disabled
  </TextButton>
)
export const textDisabledLarge = () => (
  <TextButton disabled size="large">
    Disabled
  </TextButton>
)

// Critical

export const textCriticalSmall = () => (
  <TextButton size="small" critical>
    Critical
  </TextButton>
)
export const textCriticalMedium = () => (
  <TextButton size="medium" critical>
    Critical
  </TextButton>
)
export const textCriticalLarge = () => (
  <TextButton size="large" critical>
    Critical
  </TextButton>
)

// Success

export const textSuccessSmall = () => (
  <TextButton size="small" success>
    Success
  </TextButton>
)
export const textSuccessMedium = () => (
  <TextButton size="medium" success>
    Success
  </TextButton>
)
export const textSuccessLarge = () => (
  <TextButton size="large" success>
    Success
  </TextButton>
)

// Icon Text Button

export const textIconSmall = () => (
  <TextButton size="small" icon="block">
    Icon Text Button
  </TextButton>
)
export const textIconMedium = () => (
  <TextButton size="medium" icon="block">
    Icon Text Button
  </TextButton>
)
export const textIconLarge = () => (
  <TextButton size="large" icon="block">
    Icon Text Button
  </TextButton>
)

export const textIconSmallCritical = () => (
  <TextButton size="small" icon="block" critical>
    Critical Text Button
  </TextButton>
)
export const textIconMediumCritical = () => (
  <TextButton size="medium" icon="block" critical>
    Critical Text Button
  </TextButton>
)
export const textIconLargeCritical = () => (
  <TextButton size="large" icon="block" critical>
    Critical Text Button
  </TextButton>
)

export const textIconSmallSuccess = () => (
  <TextButton size="small" icon="block" success>
    Success Text Button
  </TextButton>
)
export const textIconMediumSuccess = () => (
  <TextButton size="medium" icon="block" success>
    Success Text Button
  </TextButton>
)
export const textIconLargeSuccess = () => (
  <TextButton size="large" icon="block" success>
    Success Text Button
  </TextButton>
)

export const textIconDisabledSmall = () => (
  <TextButton size="small" icon="block" disabled>
    Icon Text
  </TextButton>
)
export const textIconDisabledMedium = () => (
  <TextButton size="medium" icon="block" disabled>
    Icon Text
  </TextButton>
)
export const textIconDisabledLarge = () => (
  <TextButton size="large" icon="block" disabled>
    Icon Text
  </TextButton>
)

// Icon Only
export const textIconOnlySmall = () => <TextButton size="small" icon="checkmark" />
export const textIconOnlyMedium = () => <TextButton size="medium" icon="checkmark" />
export const textIconOnlyLarge = () => <TextButton size="large" icon="checkmark" />

export const textIconOnlyDisabledSmall = () => <TextButton disabled size="small" icon="checkmark" />
export const textIconOnlyDisabledMedium = () => <TextButton disabled size="medium" icon="checkmark" />
export const textIconOnlyDisabledLarge = () => <TextButton disabled size="large" icon="checkmark" />

// Icon Text
export const textIconSmallLeft = () => (
  <TextButton size="small" icon="block" left>
    Icon Text
  </TextButton>
)
export const textIconMediumLeft = () => (
  <TextButton size="medium" icon="block" left>
    Icon Text
  </TextButton>
)
export const textIconLargeLeft = () => (
  <TextButton size="large" icon="block" left>
    Icon Text
  </TextButton>
)
export const textIconSmallRight = () => (
  <TextButton size="small" icon="block" right>
    Icon Text
  </TextButton>
)
export const textIconMediumRight = () => (
  <TextButton size="medium" icon="block" right>
    Icon Text
  </TextButton>
)
export const textIconLargeRight = () => (
  <TextButton size="large" icon="block" right>
    Icon Text
  </TextButton>
)
