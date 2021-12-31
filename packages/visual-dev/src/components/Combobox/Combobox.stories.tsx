import { useCombobox } from "downshift";
import React, { useState } from "react";
import { Combobox } from "./Combobox";

export default {
  title: "Components / Combobox",
  component: Combobox,
};

export const Basic = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const [inputItems, setInputItems] = useState(items);
  const functional = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")
        )
      );
    },
  });
  const props = { items: inputItems, functional };
  return (
    <div style={{ resize: "both", overflow: "auto", margin: "100px" }}>
      <Combobox {...props}></Combobox>
    </div>
  );
};

export const Clearable = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const [inputItems, setInputItems] = useState(items);
  const functional = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")
        )
      );
    },
  });
  const props = { items: inputItems, functional, clearable: true };
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
  const functional = useCombobox({ items, itemToString });
  const props = { items, functional, itemToString };
  return <Combobox {...props}></Combobox>;
};

export const Disabled = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const [inputItems, setInputItems] = useState(items);
  const functional = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")
        )
      );
    },
  });
  const props = { items: inputItems, functional, disabled: true };
  return <Combobox {...props}></Combobox>;
};

export const Error = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const [inputItems, setInputItems] = useState(items);
  const functional = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")
        )
      );
    },
  });
  const props = { items: inputItems, functional, errors: { field1: "error" } };
  return <Combobox {...props}></Combobox>;
};
