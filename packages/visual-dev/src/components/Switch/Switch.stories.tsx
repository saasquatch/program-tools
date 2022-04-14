import React, { useState } from "react";
import { SwitchView } from ".";

export default {
  title: "Components / Switch",
  component: SwitchView,
};

export const Functional = () => {
  const [enabled, setEnable] = useState(false);
  return (
    <SwitchView
      id="switch"
      checked={enabled}
      onChange={() => setEnable(!enabled)}
    />
  );
};

export const SuccessOff = () => <SwitchView checked={false} />;
export const SuccessOn = () => <SwitchView checked={true} />;
export const CriticalOff = () => (
  <SwitchView color="critical" checked={false} />
);
export const CriticalOn = () => <SwitchView color="critical" checked={true} />;
export const CustomCSS = () => (
  <SwitchView
    checked={true}
    customCSS={{
      border: "2px solid blue",
      padding: "4px 20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  />
);
