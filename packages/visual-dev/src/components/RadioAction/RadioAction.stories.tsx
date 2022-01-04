import React, { useState } from "react";
import { RadioAction, RadioActionGroup } from ".";

export default {
  title: "Components / RadioAction",
  component: RadioAction,
};

export const Functional = () => {
  const [value, setValue] = useState(0);
  return (
    <RadioActionGroup>
      <RadioAction
        title="Primary action"
        description="Addtional description describing conequences of this option"
        value={value}
        optionValue={1}
        onChange={void 0}
        onClick={() => setValue(1)}
      />
      <RadioAction
        title="Primary action"
        description="Addtional description describing conequences of this option"
        value={value}
        optionValue={2}
        onChange={void 0}
        onClick={() => setValue(2)}
      />
      <RadioAction
        title="Primary action"
        description="Addtional description describing conequences of this option"
        value={value}
        optionValue={3}
        onChange={void 0}
        onClick={() => setValue(3)}
      />
    </RadioActionGroup>
  );
};

export const radioAction = () => {
  return (
    <RadioActionGroup>
      <RadioAction
        title="Primary action"
        description="Addtional description describing conequences of this option"
        value={0}
        optionValue={1}
        onChange={void 0}
      />
    </RadioActionGroup>
  );
};

export const radioActionChecked = () => {
  return (
    <RadioActionGroup>
      <RadioAction
        title="Primary action"
        description="Addtional description describing conequences of this option"
        value={1}
        optionValue={1}
        onChange={void 0}
      />
    </RadioActionGroup>
  );
};
