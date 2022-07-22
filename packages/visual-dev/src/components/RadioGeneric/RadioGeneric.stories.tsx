import React from "react";
import { useState } from "react";
import { RadioGenericView, RadioOption } from ".";

export default {
  title: "Components / Generic Radio",
  component: RadioGenericView,
};

const RadioHandle = ({
  value,
  activeValue,
}: {
  value: string;
  activeValue: string;
}) => {
  return (
    <div style={{ backgroundColor: value == activeValue ? "red" : "blue" }}>
      {value}
    </div>
  );
};

export const Functional = () => {
  const [value, setValue] = useState();
  // const opts: Array<RadioOption> = [
  //   { value: "1", view: <RadioHandle value={"1"} activeValue="" /> },
  //   { value: "2", view: <RadioHandle value={"2"} activeValue="" /> },
  //   { value: "3", view: <RadioHandle value={"3"} activeValue="" /> },
  // ];
  return (
    <RadioGenericView
      name="testRadio"
      activeValue={value}
      radioOptions={[]}
      onChange={(val: any) => {
        setValue(val);
      }}
    ></RadioGenericView>
  );
};
