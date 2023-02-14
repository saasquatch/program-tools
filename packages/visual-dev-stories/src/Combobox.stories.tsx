import { Select } from "@saasquatch/visual-dev";
import { useCombobox } from "downshift";
import React, { useState } from "react";

export default {
  title: "Components / Combobox",
  component: Select,
};

const countries = [
  "Canada",
  "Costa Rica",
  "Greece",
  "Ireland",
  "Japan",
  "Mexico",
  "United States",
];

export const ComboBoxStory = ({
  items = countries,
  width = "100%",
}: {
  items?: string[];
  width?: string;
}) => {
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
  const props = { items: inputItems, functional, limitWidth: width };
  return <Select {...props}></Select>;
};
