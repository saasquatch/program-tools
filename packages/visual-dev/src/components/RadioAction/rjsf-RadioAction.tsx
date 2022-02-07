import { WidgetProps } from "@rjsf/core";
import React from "react";
import { isEnumArray, isEnumValue } from "../RadioCard";
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
    option.hasOwnProperty("value") &&
    option.hasOwnProperty("title") &&
    option.hasOwnProperty("description")
  );
}

export function RJSFRadioActionWidget(props: WidgetProps) {
  const valueOptions = props?.options?.enumOptions;
  const actionOptions = props?.options?.ruleOptions;
  const twoColumns = props?.uiSchema["ui:options"]?.twoColumns ? true : false;
  if (!isEnumArray(valueOptions) || !isEnumArray(actionOptions)) {
    return <></>;
  }
  return (
    <RadioActionGroup id={props.id} twoColumns={twoColumns}>
      {valueOptions?.map((option: unknown) => {
        if (!isEnumValue(option)) {
          return <></>;
        }
        const action = actionOptions.filter(
          (action) => action.value === option?.value
        )[0];
        if (!action || !isActionOption(action)) {
          return <></>;
        }
        return (
          <RadioAction
            required={props.required}
            id={props.id + action.value.toString()}
            name={props.id + action.value.toString()}
            key={action.value}
            title={action.title}
            description={action.description}
            optionValue={option.value}
            value={props.value}
            onClick={() => {
              props.onChange(option.value);
            }}
          />
        );
      })}
    </RadioActionGroup>
  );
}
