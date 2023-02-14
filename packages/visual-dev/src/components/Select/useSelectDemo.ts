import { useSelect } from "downshift";

type useDemoSelectProps = {
  items: string[] | { text: string; description: string }[];
  placeholder?: string;
  hasDescription?: boolean;
};

export const useDemoSelect = ({ items, placeholder }: useDemoSelectProps) => {
  const itemToString = (item: { text: string; description: string } | null) => {
    return item ? item.text : "";
  };
  const functional = useSelect({ items, itemToString });

  return { items, functional, placeholder, itemToString };
};
