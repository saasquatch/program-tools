import React from "react";
import { Radio } from "./Radio";
import { WidgetProps } from "@rjsf/core";

interface enumOption {
  label: string;
  value: any;
}

function isEnumOption(option: any): option is enumOption{
  return typeof option === 'object' && option !== null && option.hasOwnProperty("label") && option.hasOwnProperty("value")
}

function isEnumArray(options: any): options is any[]{
  return Array.isArray(options)
}

export const RJSFRadio = (props: WidgetProps) => {
  const valueOptions = props?.options?.enumOptions
  if(!isEnumArray(valueOptions)){
    return <></>
  }
  return (
    <div>
      {valueOptions?.map((option: unknown) => {
        if(!isEnumOption(option)){
          return <></>
        }
        console.log(option)
        return (
          <Radio
            options={{ text: option.label }}
            name={props.id}
            value={props.value == option.value}
            disabled={props.disabled}
            onChange={() => props.onChange(option.value)}
          />
        );
      })}
    </div>
  );
};
