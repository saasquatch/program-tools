import React, { useState } from "react";
import { RadioActionView, RadioActionGroupView } from ".";

export default {
  title: "Components / RadioAction",
  component: RadioActionView,
};

export const Functional = () => {
  const [value, setValue] = useState(0);
  return (
    <RadioActionGroupView>
      <RadioActionView
        title="Primary action"
        description="Addtional description describing conequences of this option"
        value={value}
        optionValue={1}
        onChange={void 0}
        onClick={() => setValue(1)}
      />
      <RadioActionView
        title="Primary action"
        description="Addtional description describing conequences of this option"
        value={value}
        optionValue={2}
        onChange={void 0}
        onClick={() => setValue(2)}
      />
      <RadioActionView
        title="Primary action"
        description="Addtional description describing conequences of this option"
        value={value}
        optionValue={3}
        onChange={void 0}
        onClick={() => setValue(3)}
      />
    </RadioActionGroupView>
  );
};

export const RadioActionUnselected = () => {
  return (
    <RadioActionGroupView>
      <RadioActionView
        title="Primary action"
        description="Addtional description describing conequences of this option"
        value={0}
        optionValue={1}
        onChange={void 0}
      />
    </RadioActionGroupView>
  );
};

export const RadioActionNoDescription = () => {
  return (
    <RadioActionGroupView>
      <RadioActionView
        title="Primary action"
        value={0}
        optionValue={1}
        onChange={void 0}
      />
    </RadioActionGroupView>
  );
};

export const RadioActionSelected = () => {
  return (
    <RadioActionGroupView>
      <RadioActionView
        title="Primary action"
        description="Addtional description describing conequences of this option"
        value={1}
        optionValue={1}
        onChange={void 0}
      />
    </RadioActionGroupView>
  );
};

export const TwoColumnLayout = () => {
  return (
    <RadioActionGroupView twoColumns={true}>
      <RadioActionView
        title="Primary action"
        description="Addtional description describing conequences of this option"
        value={1}
        optionValue={1}
        onChange={void 0}
      />
      <RadioActionView
        title="Secondary action"
        description="Addtional description describing conequences of this option"
        value={1}
        optionValue={2}
        onChange={void 0}
      />
    </RadioActionGroupView>
  );
};
