import React, { useState } from "react";
import { CheckboxView } from ".";

export default {
  title: "Components / Checkbox",
  component: CheckboxView,
};

export const functional = () => {
  const [value, setValue] = useState(false);
  const options = {
    text: "Checkbox",
  };
  return (
    <CheckboxView
      options={options}
      value={value}
      onChange={() => console.log("change!")}
      onClick={() => setValue(!value)}
    />
  );
};

export const checkbox = () => {
  const options = {
    text: "Checkbox",
  };
  return <CheckboxView options={options} value={false} onChange={undefined} />;
};

export const checkboxChecked = () => {
  const options = {
    text: "Checked",
  };
  return <CheckboxView options={options} value={true} onChange={undefined} />;
};

export const Disabled = () => {
  const options = {
    text: "Disabled",
  };
  return (
    <CheckboxView
      options={options}
      value={false}
      disabled={true}
      onChange={undefined}
    />
  );
};

export const DisabledChecked = () => {
  const options = {
    text: "Checked",
  };
  return (
    <CheckboxView
      options={options}
      value={true}
      disabled={true}
      onChange={undefined}
    />
  );
};

export const CustomCSS = () => {
  const options = {
    text: "Checked",
  };
  return (
    <CheckboxView
      options={options}
      value={true}
      disabled={true}
      onChange={undefined}
    />
  );
};
