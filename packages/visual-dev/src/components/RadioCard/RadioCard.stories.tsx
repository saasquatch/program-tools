import React, { useState } from "react";
import { RadioCardView, RadioCardGroupView } from ".";

export default {
  title: "Components / RadioCard",
  component: RadioCardView,
};

export const Functional = () => {
  const [value, setValue] = useState(0);
  return (
    <RadioCardGroupView>
      <RadioCardView
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
      <RadioCardView
        title={"Test Title"}
        description={"Test description."}
        value={value}
        optionValue={2}
        onChange={void 0}
        onClick={() => setValue(2)}
        icon="calendar"
      />
      <RadioCardView
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
    </RadioCardGroupView>
  );
};

export const radioCard = () => {
  return (
    <RadioCardGroupView>
      <RadioCardView
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
    </RadioCardGroupView>
  );
};

export const radioCardSelected = () => {
  return (
    <RadioCardGroupView>
      <RadioCardView
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
    </RadioCardGroupView>
  );
};

export const radioCardNoIcon = () => {
  return (
    <RadioCardGroupView>
      <RadioCardView
        title={"A title for this option"}
        description={
          "This is a default radio group button. Toggle it by clicking."
        }
        value={0}
        optionValue={1}
        onClick={void 0}
        onChange={void 0}
      />
    </RadioCardGroupView>
  );
};

export const radioCardNoTitle = () => {
  return (
    <RadioCardGroupView>
      <RadioCardView
        description={
          "This is a default radio group button. Toggle it by clicking."
        }
        value={0}
        optionValue={1}
        onClick={void 0}
        onChange={void 0}
        icon="calendar"
      />
    </RadioCardGroupView>
  );
};

export const radioCardNoDescription = () => {
  return (
    <RadioCardGroupView>
      <RadioCardView
        title={"A title for this option"}
        value={0}
        optionValue={1}
        onClick={void 0}
        onChange={void 0}
        icon="checkmark"
      />
    </RadioCardGroupView>
  );
};

export const radioCardNoText = () => {
  return (
    <RadioCardGroupView>
      <RadioCardView
        value={0}
        optionValue={1}
        onClick={void 0}
        onChange={void 0}
        icon="alert"
      />
    </RadioCardGroupView>
  );
};

export const CustomCSSNoIcon = () => {
  return (
    <RadioCardGroupView>
      <RadioCardView
        value={0}
        optionValue={1}
        onClick={void 0}
        onChange={void 0}
        customCSS={{ maxWidth: "200px" }}
        title={"A title for this option"}
        description={
          "This is a default radio group button. Toggle it by clicking."
        }
      />
    </RadioCardGroupView>
  );
};
