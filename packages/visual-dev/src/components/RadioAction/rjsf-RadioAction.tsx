import { WidgetProps } from "@rjsf/core";
import React from "react";
import { isEnumArray, isEnumOption } from "../RadioCard";
import { RadioAction, RadioActionGroup } from "./RadioAction";

interface enumOption {
  key: number;
  title: string;
  description: string;
  value: any;
}

function isActionOption(option: any): option is enumOption {
  return (
    typeof option === "object" &&
    option !== null &&
    option.hasOwnProperty("key") &&
    option.hasOwnProperty("title") &&
    option.hasOwnProperty("description")
  );
}

export function RJSFRadioActionWidget(props: WidgetProps) {
    const valueOptions = props?.options?.enumOptions;
    const cardOptions = props?.options?.ruleOptions;
    if (!isEnumArray(valueOptions) || !isEnumArray(cardOptions)) {
      return <></>;
    }
    return (
      <RadioActionGroup id={props.id}>
        {cardOptions?.map((option: unknown) => {
          if (!isActionOption(option)) {
            return <></>;
          }
          if (!isEnumOption(valueOptions[option.key])) {
            return <></>;
          }
          return (
            <RadioAction
              id={props.id + option.key.toString()}
              name={props.id + option.key.toString()}
              key={option.key}
              title={option.title}
              description={option.description}
              optionValue={valueOptions[option.key].value}
              value={props.value}
              onClick={() => {
                props.onChange(valueOptions[option.key].value);
              }}
            />
          );
        })}
      </RadioActionGroup>
    );
  }
  