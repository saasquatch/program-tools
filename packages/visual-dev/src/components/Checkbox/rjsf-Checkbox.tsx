import { WidgetProps } from "@rjsf/core";
import React from "react";
import { Checkbox } from ".";

export function RJSFCheckbox(props: WidgetProps) {
  return (
    <Checkbox
      value={props.value}
      onChange={(e: any) => props.onChange(e.target.value)}
      disabled={props.disabled}
      options={{text: props.options.text}}
    />
  );
}