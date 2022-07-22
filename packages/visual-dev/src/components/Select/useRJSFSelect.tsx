import { WidgetProps } from "@rjsf/core";
import { useSelect } from "downshift";
import { OptionProps } from ".";
import { isEnumArray } from "../RadioCard";

export function useRJSFSelect(props: WidgetProps): OptionProps<any> | null {
  const items = props?.options?.enumOptions;
  const disabled = props?.options?.enumDisabled ? true : false;
  if (!isEnumArray(items)) {
    return null;
  }
  const selectedItem = items.find((item) => item.value === props.value) || null;
  const itemToString = (item: any | null) => (item?.label ? item.label : "");
  const onSelectedItemChange = ({ selectedItem }: { selectedItem?: any }) => {
    props.onChange(selectedItem?.value || "");
  };
  const functional = useSelect({
    items,
    itemToString,
    selectedItem,
    onSelectedItemChange,
  });
  return {
    disabled,
    items,
    functional,
    itemToString,
  };
}
