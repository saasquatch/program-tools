import { WidgetProps } from "@rjsf/core";
import React from "react";
import { TextareaView } from "./Textarea";

export function RJSFTextarea(props: WidgetProps) {
  const options = props.options;
  return (
    <TextareaView
      id={props.id}
      {...options}
      value={props.value}
      onChange={(e: any) => props.onChange(e.target.value)}
      disabled={props.disabled}
      errors={props.rawErrors && !!props.rawErrors.length}
      required={props.required}
    />
  );
}
