import { options } from "marked";
import React from "react";
import { Radio } from "./Radio";

interface RJSFRadioWidgetProps {
  id: string;
  onChange: any;
  rawErrors: any;
  option: {
    enumOptions: Array<enumOption>;
  };
}

interface enumOption {
  label: string;
  value: any;
}

export const RSJFRadioWidget = (props: any) => {
  return (
    <div>
      {props.options.enumOptions.map((option: enumOption) => {
        return (
          <Radio
            options={{ text: option.label }}
            name={props.id}
            value={props.value == option.value}
            onChange={() => props.onChange(option.value)}
          />
        );
      })}
    </div>
  );
};
