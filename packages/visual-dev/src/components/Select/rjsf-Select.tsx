import { WidgetProps } from "@rjsf/core";
import { useSelect } from "downshift";
import React from "react";
import { Select } from "./Select";

export function RJSFSelect(props: WidgetProps) {
  if (!props.schema?.enum) {
    return <></>;
  }
  const items = Object.values(props.schema?.enum);
  const functional = useSelect({ items });
  const options = props.uiSchema["ui:options"];
  const selectProps = { options, items, functional };
  return <Select {...selectProps} />;
}
