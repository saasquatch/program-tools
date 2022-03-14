import React from "react";
import { Radio } from ".";

export default {
  title: "Components / Radio",
  component: Radio,
};

export const Functional = () => {
  return (
    <div>
      <Radio label="Option 1" name="group1" />
      <Radio label="Option 2" name="group1" />
      <Radio label="Option 3" name="group1" />
    </div>
  );
};

export const radio = () => {
  return <Radio label="Radio" value={false} onChange={() => void 0} />;
};

export const radioChecked = () => {
  return <Radio label="Checked" value={true} onChange={() => void 0} />;
};

export const customLabelCSS = () => {
  return (
    <Radio
      customLabelCSS={"font-size: 20px"}
      label="Checked"
      value={true}
      onChange={() => void 0}
    />
  );
};
