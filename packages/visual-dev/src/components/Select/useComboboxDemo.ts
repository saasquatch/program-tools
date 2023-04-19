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
    items: inputItems,
    onInputValueChange: ({ inputValue = "" }) => {
      setInputItems(() =>
        items.filter((item: any) => {
          return itemToString(item)
            .toLowerCase()
            .startsWith(inputValue?.toLowerCase());
        })
      );
    },
    itemToString,
  });

  return { items: inputItems, functional, itemToString };
};
