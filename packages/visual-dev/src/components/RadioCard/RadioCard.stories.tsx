import React, { useState } from "react";
import { RadioCardView } from ".";

export default {
  title: "Components / RadioCard",
  component: RadioCardView,
};

export const Functional = () => {
  const [value, setValue] = useState(0);
  return (
    <RadioCardView.GroupView>
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
        disabled
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
    </RadioCardView.GroupView>
  );
};

export const radioCard = () => {
  return (
    <RadioCardView.GroupView>
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
    </RadioCardView.GroupView>
  );
};

export const radioCardCustomCSS = () => {
  return (
    <RadioCardView.GroupView>
      <RadioCardView
        customCSS="background: var(--sq-nav-surface-primary); color: white !important; border: none; border-radius: 50px;"
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
    </RadioCardView.GroupView>
  );
};

export const radioCardSelected = () => {
  return (
    <RadioCardView.GroupView>
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
    </RadioCardView.GroupView>
  );
};

export const radioCardNoIcon = () => {
  return (
    <RadioCardView.GroupView>
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
    </RadioCardView.GroupView>
  );
};

export const radioCardNoTitle = () => {
  return (
    <RadioCardView.GroupView>
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
    </RadioCardView.GroupView>
  );
};

export const radioCardNoDescription = () => {
  return (
    <RadioCardView.GroupView>
      <RadioCardView
        title={"A title for this option"}
        value={0}
        optionValue={1}
        onClick={void 0}
        onChange={void 0}
        icon="checkmark"
      />
    </RadioCardView.GroupView>
  );
};

export const radioCardNoText = () => {
  return (
    <RadioCardView.GroupView>
      <RadioCardView
        value={0}
        optionValue={1}
        onClick={void 0}
        onChange={void 0}
        icon="alert"
      />
    </RadioCardView.GroupView>
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

export const Disabled = () => {
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
        disabled
      />
    </RadioCardGroupView>
  );
};
