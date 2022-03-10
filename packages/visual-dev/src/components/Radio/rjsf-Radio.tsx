import React, { useRef } from "react";
import { Radio } from "./Radio";
import { WidgetProps } from "@rjsf/core";

interface enumOption {
  label: string;
  value: any;
}

function isEnumOption(option: any): option is enumOption {
  return (
    typeof option === "object" &&
    option !== null &&
    option.hasOwnProperty("label") &&
    option.hasOwnProperty("value")
  );
}

function isEnumArray(options: any): options is any[] {
  return Array.isArray(options);
}

export const RJSFRadio = (props: WidgetProps) => {
  const valueOptions = props?.options?.enumOptions;
  if (!isEnumArray(valueOptions)) {
    return <></>;
  }
  const dummyRef = useRef(null);
  return (
    <div id={props.id}>
      {valueOptions?.map((option: unknown, i) => {
        if (!isEnumOption(option)) {
          return <></>;
        }
        return (
          <Radio
            ref={dummyRef}
            key={props.id + option.value}
            label={option.label}
            name={props.id}
            required={props.required}
            value={props.value == option.value}
            disabled={props.disabled}
            onChange={() => props.onChange(option.value)}
          />
        );
      })}
    </div>
  );
};
