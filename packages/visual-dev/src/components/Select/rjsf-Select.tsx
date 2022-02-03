import { WidgetProps } from "@rjsf/core";
import { useSelect } from "downshift";
import React from "react";
import { isEnumArray } from "../RadioCard";
import { Select } from "./Select";

export function RJSFSelect(props: WidgetProps) {
  console.log(props);
  const items = props?.options?.enumOptions;
  const disabled = props?.options?.enumDisabled ? true : false;
  if (!isEnumArray(items)) {
    return <></>;
  }
  const itemToString = (item: any) => (item ? item.label : "");
  const functional = useSelect({ items, itemToString });
  const options = props.uiSchema["ui:options"];
  const selectProps = {disabled, options, items, functional, itemToString };
  return <Select {...selectProps} />;
}
