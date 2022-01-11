import React, { useState } from "react";
import { IconButton } from "../Button";
import { Input } from ".";

export default {
  title: "Components / Input",
  component: Input,
};

export const FunctionalInput = () => {
  const [value, setValue] = useState("");
  return (
    <Input
      value={value}
      onChange={(e: { target: { value: string } }) => setValue(e.target.value)}
      disabled={undefined}
      errors={undefined}
    />
  );
};

export const InputText = () => <Input value="Input Text" />;

export const FullWidth = () => <Input value="Input Text" limitWidth={false} />;

export const InputDisabled = () => <Input value="Input Text" disabled />;

export const Placeholder = () => <Input placeholder="Placeholder Text" />;

export const PlaceholderDisabled = () => (
  <Input placeholder="Placeholder Text" disabled />
);
export const InvalidField = () => (
  <Input value="Invalid Field" errors={"error"} />
);

export const PasswordInput = () => <Input type="password" value="Input Text" />;

export const PasswordInputWithToggle = () => {
  const [visible, setVisible] = useState(false);
  return (
    <Input
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

export const InputEdit = () => <Input value="" icon="edit" />;
export const InputEditDisabled = () => <Input value="" icon="edit" disabled />;
export const InputSearch = () => (
  <Input value="" icon="search" position="left" />
);
export const InputSearchDisabled = () => (
  <Input value="" icon="search" position="left" disabled />
);
export const InputClose = () => <Input value="" icon="close" />;
export const InputCloseDisabled = () => (
  <Input value="" icon="close" disabled />
);

export const InputNumber = () => <Input value="" type="number" />;
export const InputNumberDisabled = () => <Input type="number" disabled />;

export const InputButtons = () => (
  <Input
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
