import React, { useState } from "react";
import { CheckboxView } from ".";

export default {
  title: "Components / Checkbox",
  component: CheckboxView,
};

export const Functional = () => {
  const [value, setValue] = useState(false);
  return (
    <CheckboxView
      label={"Checkbox"}
      value={false}
      onChange={() => console.log("change!")}
      onClick={() => setValue(!value)}
    />
  );
};

export const FunctionalWithALongLabel = () => {
  const [value, setValue] = useState(false);
  return (
    <CheckboxView
      label={"Checkbox with a super long label"}
      value={value}
      onChange={() => console.log("change!")}
      onClick={() => setValue(!value)}
    />
  );
};

export const checkbox = () => {
  return <CheckboxView label={"Checkbox"} value={false} onChange={undefined} />;
};

export const checkboxChecked = () => {
  return (
    <CheckboxView
      label={"Checked"}
      checked={true}
      value={true}
      onChange={undefined}
    />
  );
};

export const Disabled = () => {
  return (
    <CheckboxView
      label={"Disabled"}
      value={false}
      disabled={true}
      onChange={undefined}
    />
  );
};

export const DisabledChecked = () => {
  return (
    <CheckboxView
      label={"Checked"}
      value={true}
      disabled={true}
      onChange={undefined}
    />
  );
};

export const CustomLabel = () => {
  return (
    <CheckboxView
      label={
        <div>
          Slot
          <br />
          Content
        </div>
      }
      value={true}
      disabled={true}
      onChange={undefined}
    />
  );
};

export const CustomCSS = () => {
  return (
    <CheckboxView
      label={"Checked"}
      value={true}
      disabled={true}
      onChange={undefined}
    />
  );
};
