import React, { useState } from "react";
import { IconButton } from "../Button";
import { InputView } from ".";

export default {
  title: "Components / Input",
  component: InputView,
};

export const FunctionalInput = () => {
  const [value, setValue] = useState("");
  return (
    <InputView
      value={value}
      onChange={(e: { target: { value: string } }) => setValue(e.target.value)}
      disabled={undefined}
      errors={undefined}
    />
  );
};

export const InputText = () => <InputView value="Input Text" />;

export const FullWidth = () => (
  <InputView value="Input Text" limitWidth={false} />
);

export const InputDisabled = () => <InputView value="Input Text" disabled />;

export const Placeholder = () => <InputView placeholder="Placeholder Text" />;

export const PlaceholderDisabled = () => (
  <InputView placeholder="Placeholder Text" disabled />
);
export const InvalidField = () => (
  <InputView value="Invalid Field" errors={"error"} />
);

export const PasswordInput = () => (
  <InputView type="password" value="Input Text" />
);

export const PasswordInputWithToggle = () => {
  const [visible, setVisible] = useState(false);
  return (
    <InputView
      type={visible ? "text" : "password"}
      buttons={
        <IconButton
          icon="visibility"
          size="mini"
          borderless={true}
          onClick={() => {
            setVisible(!visible);
          }}
        />
      }
    />
  );
};

export const InputEdit = () => <InputView value="" icon="edit" />;
export const InputEditDisabled = () => (
  <InputView value="" icon="edit" disabled />
);
export const InputSearch = () => (
  <InputView value="" icon="search" position="left" />
);
export const InputSearchDisabled = () => (
  <InputView value="" icon="search" position="left" disabled />
);
export const InputClose = () => <InputView value="" icon="close" />;
export const InputCloseDisabled = () => (
  <InputView value="" icon="close" disabled />
);

export const InputNumber = () => <InputView value="" type="number" />;
export const InputNumberDisabled = () => <InputView type="number" disabled />;

export const InputButtons = () => (
  <InputView
    value="Edit Input Text"
    buttons={
      <>
        <IconButton
          icon="checkmark"
          size="mini"
          primary
          css={"margin-right: 4px;"}
        />
        <IconButton icon="close" size="mini" icon_css="color: #858585;" />
      </>
    }
  />
);
