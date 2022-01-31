import { WidgetProps } from "@rjsf/core";
import { useSelect } from "downshift";
import React from "react";
import { Select } from "./Select";

export function RJSFSelect(props: WidgetProps) {
  const functional = useSelect({ items });
  const options = props.uiSchema["ui:options"];
  const selectProps = { options, items, functional };
  return <Select {...selectProps} />;
}
