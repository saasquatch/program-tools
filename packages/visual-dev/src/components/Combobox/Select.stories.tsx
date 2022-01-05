import { useSelect } from "downshift";
import React from "react";
import { Combobox } from ".";

export default {
  title: "Components / Select",
  component: Combobox,
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
      <Combobox {...props}></Combobox>
    </div>
  );
};

export const Clearable = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = { items, functional, clearable: true };
  return <Combobox {...props}></Combobox>;
};

export const Detailed = () => {
  interface Islands {
    text: string;
    description: string;
  }
  const items = [
    { text: "Salt Spring", description: "The big one" },
    { text: "Gabriola", description: "Way up north" },
    { text: "Mayne", description: "With a y" },
    { text: "Pender", description: "There's actually two" },
  ];
  const itemToString = (item: Islands) => (item ? item.text : "");
  const functional = useSelect({ items, itemToString });
  const props = { items, functional, itemToString };
  return <Combobox {...props}></Combobox>;
};

export const Disabled = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = { items, functional, disabled: true };
  return <Combobox {...props}></Combobox>;
};

export const Error = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = {
    items,
    functional,
    errors: { field1: "error" },
  };
  return <Combobox {...props}></Combobox>;
};
