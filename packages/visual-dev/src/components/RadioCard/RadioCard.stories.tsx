import React, { useState } from "react";
import { RadioCard, RadioCardGroup } from ".";

export default {
  title: "Components / RadioCard",
  component: RadioCard,
};

export const Functional = () => {
  const [value, setValue] = useState(0);
  return (
    <RadioCardGroup>
      <RadioCard
        title={"A title for this option"}
        description={
          "This is a default radio group button. Toggle it by clicking."
        }
        value={value}
        optionValue={1}
        onChange={void 0}
        onClick={() => setValue(1)}
        icon="calendar"
      />
      <RadioCard
        title={"Test Title"}
        description={"Test description."}
        value={value}
        optionValue={2}
        onChange={void 0}
        onClick={() => setValue(2)}
        icon="calendar"
      />
      <RadioCard
        title={"A title for this option"}
        description={
          "This is a default radio group button. Toggle it by clicking."
        }
        value={value}
        optionValue={3}
        onChange={void 0}
        onClick={() => setValue(3)}
        icon="calendar"
      />
    </RadioCardGroup>
  );
};

export const radioCard = () => {
  return (
    <RadioCardGroup>
      <RadioCard
        title={"A title for this option"}
        description={
          "This is a default radio group button. Toggle it by clicking."
        }
        value={0}
        optionValue={1}
        onClick={void 0}
        onChange={void 0}
        icon="calendar"
      />
    </RadioCardGroup>
  );
};

export const radioCardSelected = () => {
  return (
    <RadioCardGroup>
      <RadioCard
        title={"A title for this option"}
        description={
          "This is a default radio group button. Toggle it by clicking."
        }
        value={1}
        optionValue={1}
        onClick={void 0}
        onChange={void 0}
        icon="calendar"
      />
    </RadioCardGroup>
  );
};

export const radioCardNoIcon = () => {
  return (
    <RadioCardGroup>
      <RadioCard
        title={"A title for this option"}
        description={
          "This is a default radio group button. Toggle it by clicking."
        }
        value={0}
        optionValue={1}
        onClick={void 0}
        onChange={void 0}
      />
    </RadioCardGroup>
  );
};

export const radioCardNoTitle = () => {
  return (
    <RadioCardGroup>
      <RadioCard
        description={
          "This is a default radio group button. Toggle it by clicking."
        }
        value={0}
        optionValue={1}
        onClick={void 0}
        onChange={void 0}
        icon="calendar"
      />
    </RadioCardGroup>
  );
};

export const radioCardNoDescription = () => {
  return (
    <RadioCardGroup>
      <RadioCard
        title={"A title for this option"}
        value={0}
        optionValue={1}
        onClick={void 0}
        onChange={void 0}
        icon="checkmark"
      />
    </RadioCardGroup>
  );
};

export const radioCardNoText = () => {
  return (
    <RadioCardGroup>
      <RadioCard
        value={0}
        optionValue={1}
        onClick={void 0}
        onChange={void 0}
        icon="alert"
      />
    </RadioCardGroup>
  );
};
