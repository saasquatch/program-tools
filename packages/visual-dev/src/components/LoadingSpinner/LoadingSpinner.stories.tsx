import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export default {
  title: "Components / Loading Spinner",
};

export const Normal = () => {
  return (
    <div style={{ margin: "100px" }}>
      <LoadingSpinner.Normal />
    </div>
  );
};
Normal.parameters = {
  storyshots: { disable: true },
};

export const NormalWithProps = () => {
  return (
    <div style={{ margin: "100px" }}>
      <LoadingSpinner.Normal
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
      <LoadingSpinner.Large />
    </div>
  );
};
export const LargeNoMargin = () => {
  return <LoadingSpinner.Large margin="0px" />;
};
Large.parameters = {
  storyshots: { disable: true },
};

export const TableInitialLoad = () => {
  return <LoadingSpinner.TableInitial />;
};

export const Table = () => {
  return <LoadingSpinner.Table />;
};
