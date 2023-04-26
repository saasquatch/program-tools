import { useSelect } from "downshift";
import { SelectView } from "./Select2";

type useDemoSelectProps = {
  items: any;
  hasDescription?: boolean;
  itemToString?: (item: any) => string;
};

export const useSelectDemo = ({
  items,
  itemToString = SelectView.ItemToString,
}: useDemoSelectProps) => {
  const functional = useSelect({ items, itemToString });

  return { items, functional, itemToString };
};
