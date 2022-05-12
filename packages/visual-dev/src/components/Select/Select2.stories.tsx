import { useSelect } from "downshift";
import React from "react";
import { SelectView } from "./Select2";

export default {
  title: "Components / Select v2",
  component: SelectView,
};

export const Basic = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = { items, functional };
  return (
    <div
      style={{
        resize: "both",
        height: "400px",
        overflow: "auto",
        margin: "100px",
      }}
    >
      <SelectView.ContainerView>
        <SelectView.HandleView {...props} />
        <SelectView.ListView {...props} />
      </SelectView.ContainerView>
    </div>
  );
};
