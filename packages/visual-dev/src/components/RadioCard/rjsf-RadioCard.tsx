import { WidgetProps } from "@rjsf/core";
import React from "react";
import { IconKey } from "../Icon";
import { RadioCard, RadioCardGroup } from "./RadioCard";

interface enumOption {
  key: number;
  icon: string;
  title: string;
  description: string;
  value: any;
}

interface enumValue {
  label: any;
  value: any;
}

export function isEnumValue(option: any): option is enumValue {
  return (
    typeof option === "object" &&
    option !== null &&
    option.hasOwnProperty("label") &&
    option.hasOwnProperty("value")
  );
}

export function isCardOption(option: any): option is enumOption {
  return (
    typeof option === "object" &&
    option !== null &&
    option.hasOwnProperty("key") &&
    option.hasOwnProperty("icon") &&
    option.hasOwnProperty("title") &&
    option.hasOwnProperty("description")
  );
}

export function isEnumArray(options: any): options is any[] {
  return Array.isArray(options);
}

export function RJSFRadioCardWidget(props: WidgetProps) {
  const valueOptions = props?.options?.enumOptions;
  const cardOptions = props?.options?.ruleOptions;
  if (!isEnumArray(valueOptions) || !isEnumArray(cardOptions)) {
    return <></>;
  }
  return (
    <RadioCardGroup id={props.id}>
      {cardOptions?.map((option: unknown) => {
        if (!isCardOption(option) || !isEnumValue(valueOptions[option.key])) {
          return <></>;
        }
        return (
          <RadioCard
            required={props.required}
            id={props.id + option.key.toString()}
            name={props.id + option.key.toString()}
            key={option.key}
            title={option.title}
            description={option.description}
            icon={option.icon as IconKey}
            optionValue={valueOptions[option.key].value}
            value={props.value}
            onClick={(e) => {
              e.preventDefault();
              props.onChange(valueOptions[option.key].value);
            }}
          />
        );
      })}
    </RadioCardGroup>
  );
}
