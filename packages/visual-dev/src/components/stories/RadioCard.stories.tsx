import React, { useState } from "react";
import { RadioCard, RadioCardGroup } from "../RadioCard";

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
      />
      <RadioCard
        title={"A title for this option"}
        description={
          "This is a default radio group button. Toggle it by clicking."
        }
        value={value}
        optionValue={2}
        onChange={void 0}
        onClick={() => setValue(2)}
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
      />
    </RadioCardGroup>
  );
};

export const radioCardChecked = () => {
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
      />
    </RadioCardGroup>
  );
};

export const radioCardIcon = () => {
  const options = {
    title: "A title for this option",
    text: "This is a selected radio group button.",
  };
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
        icon="alert"
      />
    </RadioCardGroup>
  );
};

export const radioCardNoTitle = () => {
  const options = {
    text: "This is a selected radio group button.",
  };
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

export const radioCardNoText = () => {
  const options = {
    title: "A title for this option",
  };
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
