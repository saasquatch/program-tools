import { WidgetProps } from "@rjsf/core";
import React from "react";
import { IconKey } from "../Icon";
import { RadioCardView, RadioCardGroupView } from "./RadioCard";

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
  if (
    !isEnumArray(props?.options?.enumOptions) ||
    !isEnumArray(props?.options?.ruleOptions)
  ) {
    return <></>;
  }

  const valueOptions = props?.options?.reverse
    ? props?.options?.enumOptions?.reverse()
    : props?.options?.enumOptions;
  const cardOptions = props?.options?.reverse
    ? props?.options?.ruleOptions?.reverse()
    : props?.options?.ruleOptions;

  return (
    <RadioCardGroupView id={props.id}>
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
          <RadioCardView
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
    </RadioCardGroupView>
  );
}
