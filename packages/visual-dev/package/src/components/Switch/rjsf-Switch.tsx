import { WidgetProps } from "@rjsf/core";
import React from "react";
import { SwitchView } from "./Switch";

export function RJSFSwitch(props: WidgetProps) {
  const options = props.options;
  return (
    <SwitchView
      id={props.id}
      {...options}
      checked={props.value}
      onChange={(e: any) => props.onChange(e.target.checked)}
    />
  );
}
