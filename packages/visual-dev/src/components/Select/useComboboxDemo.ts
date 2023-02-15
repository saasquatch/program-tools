import { useCombobox } from "downshift";
import { useState } from "react";
import { SelectView } from "./Select2";
type useDemoComboboxProps = {
  items: any;
  itemToString?: (item: any) => string;
};

export const useComboboxDemo = ({
  items,
  itemToString = SelectView.ItemToString,
}: useDemoComboboxProps) => {
  const [inputItems, setInputItems] = useState(items);
  const functional = useCombobox({
    items: items,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items
          .map((item: any) => itemToString(item))
          .filter((item: any) => {
            return item.toLowerCase().startsWith(inputValue?.toLowerCase());
          })
      );
    },
    itemToString,
  });

  return { items: inputItems, functional, itemToString };
};
