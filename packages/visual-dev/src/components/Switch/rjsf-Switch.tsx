import { WidgetProps } from "@rjsf/core";
import React from "react";
import { Switch } from "./Switch";

export function RJSFSwitch(props: WidgetProps) {
  const options = props.options;
  return (
    <Switch
      id={props.id}
      {...options}
      checked={props.value}
      onChange={(e: any) => props.onChange(e.target.checked)}
    />
  );
}
