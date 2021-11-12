import React, { useState } from "react";
import { Button } from "../Button";

export default {
  title: "Components / Button / TextButton",
  component: Button,
};

export const Functional = () => {
  const [count, setCount] = useState(0);

  const states = {
    0: false,
    1: false,
    2: false,
  };

  states[count] = true;

  return (
    <Button
      buttonType="text"
      critical={states[1]}
      success={states[2]}
      onClick={() => setCount((count + 1) % 3)}
    >
      Text Button
    </Button>
  );
};

// Text Button

export const textSmall = () => (
  <Button buttonType="text" size="small">
    Text Button
  </Button>
);
export const textMedium = () => (
  <Button buttonType="text" size="medium">
    Text Button
  </Button>
);
export const textLarge = () => (
  <Button buttonType="text" size="large">
    Text Button
  </Button>
);

export const textDisabledSmall = () => (
  <Button buttonType="text" disabled size="small">
    Disabled
  </Button>
);
export const textDisabledMedium = () => (
  <Button buttonType="text" disabled size="medium">
    Disabled
  </Button>
);
export const textDisabledLarge = () => (
  <Button buttonType="text" disabled size="large">
    Disabled
  </Button>
);

// Critical

export const textCriticalSmall = () => (
  <Button buttonType="text" size="small" critical>
    Critical
  </Button>
);
export const textCriticalMedium = () => (
  <Button buttonType="text" size="medium" critical>
    Critical
  </Button>
);
export const textCriticalLarge = () => (
  <Button buttonType="text" size="large" critical>
    Critical
  </Button>
);

// Success

export const textSuccessSmall = () => (
  <Button buttonType="text" size="small" success>
    Success
  </Button>
);
export const textSuccessMedium = () => (
  <Button buttonType="text" size="medium" success>
    Success
  </Button>
);
export const textSuccessLarge = () => (
  <Button buttonType="text" size="large" success>
    Success
  </Button>
);

// Icon Text Button

export const textIconSmall = () => (
  <Button buttonType="text" size="small" icon="block">
    Icon Text Button
  </Button>
);
export const textIconMedium = () => (
  <Button buttonType="text" size="medium" icon="block">
    Icon Text Button
  </Button>
);
export const textIconLarge = () => (
  <Button buttonType="text" size="large" icon="block">
    Icon Text Button
  </Button>
);

export const textIconSmallCritical = () => (
  <Button buttonType="text" size="small" icon="block" critical>
    Critical Text Button
  </Button>
);
export const textIconMediumCritical = () => (
  <Button buttonType="text" size="medium" icon="block" critical>
    Critical Text Button
  </Button>
);
export const textIconLargeCritical = () => (
  <Button buttonType="text" size="large" icon="block" critical>
    Critical Text Button
  </Button>
);

export const textIconSmallSuccess = () => (
  <Button buttonType="text" size="small" icon="block" success>
    Success Text Button
  </Button>
);
export const textIconMediumSuccess = () => (
  <Button buttonType="text" size="medium" icon="block" success>
    Success Text Button
  </Button>
);
export const textIconLargeSuccess = () => (
  <Button buttonType="text" size="large" icon="block" success>
    Success Text Button
  </Button>
);

export const textIconDisabledSmall = () => (
  <Button buttonType="text" size="small" icon="block" disabled>
    Icon Text
  </Button>
);
export const textIconDisabledMedium = () => (
  <Button buttonType="text" size="medium" icon="block" disabled>
    Icon Text
  </Button>
);
export const textIconDisabledLarge = () => (
  <Button buttonType="text" size="large" icon="block" disabled>
    Icon Text
  </Button>
);

// Icon Only
export const textIconOnlySmall = () => (
  <Button buttonType="text" size="small" icon="checkmark" />
);
export const textIconOnlyMedium = () => (
  <Button buttonType="text" size="medium" icon="checkmark" />
);
export const textIconOnlyLarge = () => (
  <Button buttonType="text" size="large" icon="checkmark" />
);

export const textIconOnlyDisabledSmall = () => (
  <Button buttonType="text" disabled size="small" icon="checkmark" />
);
export const textIconOnlyDisabledMedium = () => (
  <Button buttonType="text" disabled size="medium" icon="checkmark" />
);
export const textIconOnlyDisabledLarge = () => (
  <Button buttonType="text" disabled size="large" icon="checkmark" />
);

// Icon Text
export const textIconSmallLeft = () => (
  <Button buttonType="text" size="small" icon="block" iconLocation="left">
    Icon Text
  </Button>
);
export const textIconMediumLeft = () => (
  <Button buttonType="text" size="medium" icon="block" iconLocation="left">
    Icon Text
  </Button>
);
export const textIconLargeLeft = () => (
  <Button buttonType="text" size="large" icon="block" iconLocation="left">
    Icon Text
  </Button>
);
export const textIconSmallRight = () => (
  <Button buttonType="text" size="small" icon="block" iconLocation="right">
    Icon Text
  </Button>
);
export const textIconMediumRight = () => (
  <Button buttonType="text" size="medium" icon="block" iconLocation="right">
    Icon Text
  </Button>
);
export const textIconLargeRight = () => (
  <Button buttonType="text" size="large" icon="block" iconLocation="right">
    Icon Text
  </Button>
);
