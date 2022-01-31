import { WidgetProps } from "@rjsf/core";
import React from "react";
import { defaultProps } from "react-select/src/Select";
import { Input } from "./Select";

export function RJSFSelect(props: WidgetProps) {
  const itemToString = (item) => (props.enumNames ? item.text : "");
  const functional = useSelect({ items });
  const props = { items, functional };
  return (
    <Select
      {...props}
    />
  );
}
