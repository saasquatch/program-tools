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
export const InputDisabled = () => <Input value="Input Text" disabled />;

export const Placeholder = () => <Input placeholder="Placeholder Text" />;

export const PlaceholderDisabled = () => (
  <Input placeholder="Placeholder Text" disabled />
);
export const InvalidField = () => (
  <Input value="Invalid Field" errors={"error"} />
);

export const PasswordInput = () => <Input type="password" value="Input Text" />;

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
          css="position: relative; left: -50px;"
          primary
          icon_css="margin: -10px; top: 8px;"
        />
        <IconButton
          icon="close"
          size="mini"
          css="position: relative; left: -47px;"
          icon_css="margin: -10px; top: 8px;  color: #858585"
        />
      </>
    }
  />
);
