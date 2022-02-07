import { WidgetProps } from "@rjsf/core";
import React from "react";
import { IconKey } from "../Icon";
import { RadioCard, RadioCardGroup } from "./RadioCard";

interface cardOption {
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

export function isCardOption(card: any): card is cardOption {
  return (
    typeof card === "object" &&
    card !== null &&
    card.hasOwnProperty("value") &&
    card.hasOwnProperty("icon") &&
    card.hasOwnProperty("title") &&
    card.hasOwnProperty("description")
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
      {valueOptions?.map((option: unknown) => {
        if (!isEnumValue(option)) {
          return <></>;
        }
        const card = cardOptions.filter(
          (card) => card.value === option?.value
        )[0];
        if (!card || !isCardOption(card)) {
          return <></>;
        }
        return (
          <RadioCard
            required={props.required}
            id={props.id + option.value.toString()}
            name={props.id + option.value.toString()}
            key={option.value}
            title={card.title}
            description={card.description}
            icon={card.icon as IconKey}
            optionValue={option.value}
            value={props.value}
            onClick={(e) => {
              e.preventDefault();
              props.onChange(option.value);
            }}
          />
        );
      })}
    </RadioCardGroup>
  );
}
