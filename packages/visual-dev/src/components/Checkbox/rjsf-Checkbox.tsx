import { WidgetProps } from "@rjsf/core";
import React from "react";
import { Checkbox } from ".";

export function RJSFCheckbox(props: WidgetProps) {
  const options = props.options;
  return (
    <Checkbox
      {...options}
      value={props.value}
      required={props.required}
      onChange={(e: any) => props.onChange(e.target.checked)}
      disabled={props.disabled}
      options={{ text: props.label }}
    />
  );
}
