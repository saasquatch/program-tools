import { WidgetProps } from "@rjsf/core";
import React from "react";
import { Select } from "./Select";
import { useRJSFSelect } from "./useRJSFSelect";

export function RJSFSelect(props: WidgetProps) {
  const hook = useRJSFSelect(props);
  if (hook === null) {
    return <></>;
  }
  const viewProps = { ...props.uiSchema["ui:options"], ...hook };
  return <Select {...viewProps} />;
}
