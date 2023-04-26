import React from "react";
import { LoadingSpinner, LoadingSpinnerLarge } from "../LoadingSpinner";

export default {
  title: "Components / Loading Spinner",
};

export const Normal = () => {
  return (
    <div style={{ margin: "100px" }}>
      <LoadingSpinner />
    </div>
  );
};
Normal.parameters = {
  storyshots: { disable: true },
};

export const NormalWithProps = () => {
  return (
    <div style={{ margin: "100px" }}>
      <LoadingSpinner
        left={"50px"}
        paddingRight={"10px"}
        right={"10px"}
        bottom={"5px"}
        color={"blue"}
      />
    </div>
  );
};
NormalWithProps.parameters = {
  storyshots: { disable: true },
};

export const Large = () => {
  return (
    <div style={{ margin: "100px" }}>
      <LoadingSpinnerLarge />
    </div>
  );
};
export const LargeNoMargin = () => {
  return <LoadingSpinnerLarge margin="0px" />;
};
Large.parameters = {
  storyshots: { disable: true },
};
