import { WidgetProps } from "@rjsf/core";
import React from "react";
import { RadioCard, RadioCardGroup } from "./RadioCard";

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

export function RJSFRadioCard(props: WidgetProps){
    const valueOptions = props?.options?.enumOptions
    if(!isEnumArray(valueOptions)){
      return <></>
    }
    return (
      <RadioCardGroup>
        {valueOptions?.map((option: unknown) => {
          if(!isEnumOption(option)){
            return <></>
          }
          return (
            <RadioCard
              options={{ text: option.label }}
              name={props.id}
              value={props.value == option.value}
              onChange={() => props.onChange(option.value)}
            />
          );
        })}
      </RadioCardGroup>
    );
}