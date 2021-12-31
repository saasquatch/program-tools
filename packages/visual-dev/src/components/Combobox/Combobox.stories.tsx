import { useCombobox } from "downshift";
import React, { useState } from "react";
import { Combobox } from "./Combobox";

export default {
  title: "Components / Combobox",
  component: Combobox,
};

export const Functional = () => {
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
