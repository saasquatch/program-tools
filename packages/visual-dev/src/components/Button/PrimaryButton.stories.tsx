import React, { useState } from "react";
import { Button } from ".";

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

  states[count as keyof typeof states] = true;

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
primarySuccessSmall.parameters = {
  storyshots: { disable: true },
};

export const primarySuccessMedium = () => (
  <Button buttonType="primary" size="medium" success>
    Success
  </Button>
);
primarySuccessMedium.parameters = {
  storyshots: { disable: true },
};

export const primarySuccessLarge = () => (
  <Button buttonType="primary" size="large" success>
    Success
  </Button>
);
primarySuccessLarge.parameters = {
  storyshots: { disable: true },
};

export const primaryDisabledSuccess = () => (
  <Button buttonType="primary" size="large" success disabled>
    Success
  </Button>
);

export const primaryLoadingSmall = () => (
  <Button buttonType="primary" size="small" loading>
    Loading
  </Button>
);
primaryLoadingSmall.parameters = {
  storyshots: { disable: true },
};

export const primaryLoadingMedium = () => (
  <Button buttonType="primary" size="medium" loading>
    Loading
  </Button>
);
primaryLoadingMedium.parameters = {
  storyshots: { disable: true },
};

export const primaryLoadingLarge = () => (
  <Button buttonType="primary" size="large" loading>
    Loading
  </Button>
);
primaryLoadingLarge.parameters = {
  storyshots: { disable: true },
};

// Success and Loading icon only

export const primarySuccessIconSmall = () => (
  <Button buttonType="primary" size="small" success />
);
primarySuccessIconSmall.parameters = {
  storyshots: { disable: true },
};

export const primarySuccessIconMedium = () => (
  <Button buttonType="primary" size="medium" success />
);
primarySuccessIconMedium.parameters = {
  storyshots: { disable: true },
};

export const primarySuccessIconLarge = () => (
  <Button buttonType="primary" size="large" success />
);
primarySuccessIconLarge.parameters = {
  storyshots: { disable: true },
};

export const primaryLoadingIconSmall = () => (
  <Button buttonType="primary" size="small" loading />
);
primaryLoadingIconSmall.parameters = {
  storyshots: { disable: true },
};

export const primaryLoadingIconMedium = () => (
  <Button buttonType="primary" size="medium" loading />
);
primaryLoadingIconMedium.parameters = {
  storyshots: { disable: true },
};

export const primaryLoadingIconLarge = () => (
  <Button buttonType="primary" size="large" loading />
);
primaryLoadingIconLarge.parameters = {
  storyshots: { disable: true },
};

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
primaryPillSuccessSmall.parameters = {
  storyshots: { disable: true },
};

export const primaryPillSuccessMedium = () => (
  <Button buttonType="primary" pill size="medium" success>
    Success
  </Button>
);
primaryPillSuccessMedium.parameters = {
  storyshots: { disable: true },
};

export const primaryPillSuccessLarge = () => (
  <Button buttonType="primary" pill size="large" success>
    Success
  </Button>
);
primaryPillSuccessLarge.parameters = {
  storyshots: { disable: true },
};

export const primaryPillLoadingSmall = () => (
  <Button buttonType="primary" pill size="small" loading>
    Loading
  </Button>
);
primaryPillLoadingSmall.parameters = {
  storyshots: { disable: true },
};

export const primaryPillLoadingMedium = () => (
  <Button buttonType="primary" pill size="medium" loading>
    Loading
  </Button>
);
primaryPillLoadingMedium.parameters = {
  storyshots: { disable: true },
};

export const primaryPillLoadingLarge = () => (
  <Button buttonType="primary" pill size="large" loading>
    Loading
  </Button>
);
primaryPillLoadingLarge.parameters = {
  storyshots: { disable: true },
};

// Success and Loading icon only

export const primaryPillSuccessIconSmall = () => (
  <Button buttonType="primary" pill size="small" success />
);
primaryPillSuccessIconSmall.parameters = {
  storyshots: { disable: true },
};

export const primaryPillSuccessIconMedium = () => (
  <Button buttonType="primary" pill size="medium" success />
);
primaryPillSuccessIconMedium.parameters = {
  storyshots: { disable: true },
};

export const primaryPillSuccessIconLarge = () => (
  <Button buttonType="primary" pill size="large" success />
);
primaryPillSuccessIconLarge.parameters = {
  storyshots: { disable: true },
};

export const primaryPillLoadingIconSmall = () => (
  <Button buttonType="primary" pill size="small" loading />
);
primaryPillLoadingIconSmall.parameters = {
  storyshots: { disable: true },
};

export const primaryPillLoadingIconMedium = () => (
  <Button buttonType="primary" pill size="medium" loading />
);
primaryPillLoadingIconMedium.parameters = {
  storyshots: { disable: true },
};

export const primaryPillLoadingIconLarge = () => (
  <Button buttonType="primary" pill size="large" loading />
);
primaryPillLoadingIconLarge.parameters = {
  storyshots: { disable: true },
};

// Icon Text
export const primaryPillIconSmallLeft = () => (
  <Button buttonType="primary" pill size="small" icon="add" iconLocation="left">
    Icon Text
  </Button>
);
export const primaryPillIconMediumLeft = () => (
  <Button
    buttonType="primary"
    pill
    size="medium"
    icon="add"
    iconLocation="left"
  >
    Icon Text
  </Button>
);
export const primaryPillIconLargeLeft = () => (
  <Button buttonType="primary" pill size="large" icon="add" iconLocation="left">
    Icon Text
  </Button>
);
export const primaryPillIconSmallRight = () => (
  <Button
    buttonType="primary"
    pill
    size="small"
    icon="add"
    iconLocation="right"
  >
    Icon Text
  </Button>
);
export const primaryPillIconMediumRight = () => (
  <Button
    buttonType="primary"
    pill
    size="medium"
    icon="add"
    iconLocation="right"
  >
    Icon Text
  </Button>
);
export const primaryPillIconLargeRight = () => (
  <Button
    buttonType="primary"
    pill
    size="large"
    icon="add"
    iconLocation="right"
  >
    Icon Text
  </Button>
);
export const CustomCSS = () => (
  <Button customCSS={{ color: "red", padding: "20px" }}>Icon Text</Button>
);
