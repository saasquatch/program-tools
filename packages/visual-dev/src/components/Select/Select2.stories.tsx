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
      <SelectView.ContainerView {...{ functional }}>
        <SelectView.HandleView {...props} />
        <SelectView.ListView {...props} />
      </SelectView.ContainerView>
    </div>
  );
};

export const WithItemToString = () => {
  interface Islands {
    text: string;
    description: string;
  }
  const items: Array<Islands> = [
    { text: "Salt Spring", description: "The big one" },
    { text: "Gabriola", description: "Way up north" },
    { text: "Mayne", description: "With a y" },
    { text: "Pender", description: "There's actually two" },
  ];
  const itemToString = (item: Islands | null) => {
    return item ? item.text : "";
  };
  const functional = useSelect({ items, itemToString });
  const props = { items, functional, itemToString };
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

export const FullWidth = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = { limitWidth: false, items, functional };
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
