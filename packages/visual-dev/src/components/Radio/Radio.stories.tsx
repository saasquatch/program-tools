import React from "react";
import { RadioView } from ".";

export default {
  title: "Components / Radio",
  component: RadioView,
};

export const Functional = () => {
  return (
    <div>
      <RadioView label="Option 1" name="group1" />
      <RadioView label="Option 2" name="group1" />
      <RadioView label="Option 3" name="group1" />
    </div>
  );
};

export const radio = () => {
  return <RadioView label="Radio" value={false} onChange={() => void 0} />;
};

export const radioChecked = () => {
  return <RadioView label="Checked" value={true} onChange={() => void 0} />;
};

export const customLabelCSS = () => {
  return (
    <RadioView
      customLabelCSS={"font-size: 20px"}
      label="Checked"
      value={true}
      onChange={() => void 0}
    />
  );
};
