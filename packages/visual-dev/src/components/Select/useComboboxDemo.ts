import { useCombobox } from "downshift";
import { useState } from "react";
type useDemoComboboxProps = {
  items: string[];
};

export const useComboboxDemo = ({ items }: useDemoComboboxProps) => {
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
  return { items: inputItems, functional };
};
