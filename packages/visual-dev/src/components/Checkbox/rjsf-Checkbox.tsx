import { WidgetProps } from "@rjsf/core";
import React from "react";
import { CheckboxView } from "./Checkbox";

export function RJSFCheckbox(props: WidgetProps) {
  const options = props.options;
  return (
    <CheckboxView
      id={props.id}
      {...options}
      value={props.value}
      required={props.required}
      onChange={(e: any) => props.onChange(e.target.checked)}
      disabled={props.disabled}
      label={props.label}
    />
  );
}
