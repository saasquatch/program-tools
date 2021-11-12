import React, { useState } from "react";
import { Button } from "../Button";

export default {
  title: "Components / Button / Primary Button",
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
      buttonType="primary"
      loading={states[1]}
      success={states[2]}
      onClick={() => setCount((count + 1) % 3)}
    >
      Primary
    </Button>
  );
};

// Primary

export const primarySmall = () => (
  <Button buttonType="primary" size="small">
    Primary
  </Button>
);
export const primaryMedium = () => (
  <Button buttonType="primary" size="medium">
    Primary
  </Button>
);
export const primaryLarge = () => (
  <Button buttonType="primary" size="large">
    Primary
  </Button>
);

export const primaryDisabledSmall = () => (
  <Button buttonType="primary" disabled size="small">
    Disabled
  </Button>
);
export const primaryDisabledMedium = () => (
  <Button buttonType="primary" disabled size="medium">
    Disabled
  </Button>
);
export const primaryDisabledLarge = () => (
  <Button buttonType="primary" disabled size="large">
    Disabled
  </Button>
);

// Icon
export const primaryIconSmall = () => (
  <Button buttonType="primary" size="small" icon="checkmark" />
);
export const primaryIconMedium = () => (
  <Button buttonType="primary" size="medium" icon="checkmark" />
);
export const primaryIconLarge = () => (
  <Button buttonType="primary" size="large" icon="checkmark" />
);

export const primaryIconDisabledSmall = () => (
  <Button buttonType="primary" disabled size="small" icon="checkmark" />
);
export const primaryIconDisabledMedium = () => (
  <Button buttonType="primary" disabled size="medium" icon="checkmark" />
);
export const primaryIconDisabledLarge = () => (
  <Button buttonType="primary" disabled size="large" icon="checkmark" />
);

// Critical

export const primaryCriticalSmall = () => (
  <Button buttonType="primary" size="small" critical>
    Critical
  </Button>
);
export const primaryCriticalMedium = () => (
  <Button buttonType="primary" size="medium" critical>
    Critical
  </Button>
);
export const primaryCriticalLarge = () => (
  <Button buttonType="primary" size="large" critical>
    Critical
  </Button>
);

// Success and Loading with text

export const primarySuccessSmall = () => (
  <Button buttonType="primary" size="small" success>
    Success
  </Button>
);
export const primarySuccessMedium = () => (
  <Button buttonType="primary" size="medium" success>
    Success
  </Button>
);
export const primarySuccessLarge = () => (
  <Button buttonType="primary" size="large" success>
    Success
  </Button>
);
export const primaryLoadingSmall = () => (
  <Button buttonType="primary" size="small" loading>
    Loading
  </Button>
);
export const primaryLoadingMedium = () => (
  <Button buttonType="primary" size="medium" loading>
    Loading
  </Button>
);
export const primaryLoadingLarge = () => (
  <Button buttonType="primary" size="large" loading>
    Loading
  </Button>
);

// Success and Loading icon only

export const primarySuccessIconSmall = () => (
  <Button buttonType="primary" size="small" success />
);
export const primarySuccessIconMedium = () => (
  <Button buttonType="primary" size="medium" success />
);
export const primarySuccessIconLarge = () => (
  <Button buttonType="primary" size="large" success />
);

export const primaryLoadingIconSmall = () => (
  <Button buttonType="primary" size="small" loading />
);
export const primaryLoadingIconMedium = () => (
  <Button buttonType="primary" size="medium" loading />
);
export const primaryLoadingIconLarge = () => (
  <Button buttonType="primary" size="large" loading />
);

// Icon Text
export const primaryIconSmallLeft = () => (
  <Button buttonType="primary" size="small" icon="add" iconLocation="left">
    Icon Text
  </Button>
);
export const primaryIconMediumLeft = () => (
  <Button buttonType="primary" size="medium" icon="add" iconLocation="left">
    Icon Text
  </Button>
);
export const primaryIconLargeLeft = () => (
  <Button buttonType="primary" size="large" icon="add" iconLocation="left">
    Icon Text
  </Button>
);
export const primaryIconSmallRight = () => (
  <Button buttonType="primary" size="small" icon="add" iconLocation="right">
    Icon Text
  </Button>
);
export const primaryIconMediumRight = () => (
  <Button buttonType="primary" size="medium" icon="add" iconLocation="right">
    Icon Text
  </Button>
);
export const primaryIconLargeRight = () => (
  <Button buttonType="primary" size="large" icon="add" iconLocation="right">
    Icon Text
  </Button>
);

//
//			PILL
//

// Primary

export const primaryPillSmall = () => (
  <Button buttonType="primary" pill size="small">
    Primary
  </Button>
);
export const primaryPillMedium = () => (
  <Button buttonType="primary" pill size="medium">
    Primary
  </Button>
);
export const primaryPillLarge = () => (
  <Button buttonType="primary" pill size="large">
    Primary
  </Button>
);

export const primaryPillDisabledSmall = () => (
  <Button buttonType="primary" pill disabled size="small">
    Disabled
  </Button>
);
export const primaryPillDisabledMedium = () => (
  <Button buttonType="primary" pill disabled size="medium">
    Disabled
  </Button>
);
export const primaryPillDisabledLarge = () => (
  <Button buttonType="primary" pill disabled size="large">
    Disabled
  </Button>
);

// Icon
export const primaryPillIconSmall = () => (
  <Button buttonType="primary" pill size="small" icon="checkmark" />
);
export const primaryPillIconMedium = () => (
  <Button buttonType="primary" pill size="medium" icon="checkmark" />
);
export const primaryPillIconLarge = () => (
  <Button buttonType="primary" pill size="large" icon="checkmark" />
);

export const primaryPillIconDisabledSmall = () => (
  <Button buttonType="primary" pill disabled size="small" icon="checkmark" />
);
export const primaryPillIconDisabledMedium = () => (
  <Button buttonType="primary" pill disabled size="medium" icon="checkmark" />
);
export const primaryPillIconDisabledLarge = () => (
  <Button buttonType="primary" pill disabled size="large" icon="checkmark" />
);

// Critical

export const primaryPillCriticalSmall = () => (
  <Button buttonType="primary" pill size="small" critical>
    Critical
  </Button>
);
export const primaryPillCriticalMedium = () => (
  <Button buttonType="primary" pill size="medium" critical>
    Critical
  </Button>
);
export const primaryPillCriticalLarge = () => (
  <Button buttonType="primary" pill size="large" critical>
    Critical
  </Button>
);

// Success and Loading with text

export const primaryPillSuccessSmall = () => (
  <Button buttonType="primary" pill size="small" success>
    Success
  </Button>
);
export const primaryPillSuccessMedium = () => (
  <Button buttonType="primary" pill size="medium" success>
    Success
  </Button>
);
export const primaryPillSuccessLarge = () => (
  <Button buttonType="primary" pill size="large" success>
    Success
  </Button>
);
export const primaryPillLoadingSmall = () => (
  <Button buttonType="primary" pill size="small" loading>
    Loading
  </Button>
);
export const primaryPillLoadingMedium = () => (
  <Button buttonType="primary" pill size="medium" loading>
    Loading
  </Button>
);
export const primaryPillLoadingLarge = () => (
  <Button buttonType="primary" pill size="large" loading>
    Loading
  </Button>
);

// Success and Loading icon only

export const primaryPillSuccessIconSmall = () => (
  <Button buttonType="primary" pill size="small" success />
);
export const primaryPillSuccessIconMedium = () => (
  <Button buttonType="primary" pill size="medium" success />
);
export const primaryPillSuccessIconLarge = () => (
  <Button buttonType="primary" pill size="large" success />
);

export const primaryPillLoadingIconSmall = () => (
  <Button buttonType="primary" pill size="small" loading />
);
export const primaryPillLoadingIconMedium = () => (
  <Button buttonType="primary" pill size="medium" loading />
);
export const primaryPillLoadingIconLarge = () => (
  <Button buttonType="primary" pill size="large" loading />
);

// Icon Text
export const primaryPillIconSmallLeft = () => (
  <Button buttonType="primary" pill size="small" icon="add"iconLocation="left" >
    Icon Text
  </Button>
);
export const primaryPillIconMediumLeft = () => (
  <Button buttonType="primary" pill size="medium" icon="add"iconLocation="left">
    Icon Text
  </Button>
);
export const primaryPillIconLargeLeft = () => (
  <Button buttonType="primary" pill size="large" icon="add"iconLocation="left">
    Icon Text
  </Button>
);
export const primaryPillIconSmallRight = () => (
  <Button buttonType="primary" pill size="small" icon="add" iconLocation="right">
    Icon Text
  </Button>
);
export const primaryPillIconMediumRight = () => (
  <Button buttonType="primary" pill size="medium" icon="add" iconLocation="right">
    Icon Text
  </Button>
);
export const primaryPillIconLargeRight = () => (
  <Button buttonType="primary" pill size="large" icon="add" iconLocation="right">
    Icon Text
  </Button>
);
