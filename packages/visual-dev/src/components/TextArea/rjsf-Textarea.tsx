import { WidgetProps } from "@rjsf/core";
import React from "react";
import { Textarea } from "./Textarea";

export function RJSFTextarea(props: WidgetProps) {
  return (
    <Textarea
      value={props.value}
      onChange={(e: any) => props.onChange(e.target.value)}
      disabled={props.disabled}
      errors={props.rawErrors && !!props.rawErrors.length}
      required={props.required}
    />
  );
}
