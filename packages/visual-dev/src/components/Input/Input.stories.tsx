import React, { useState } from "react";
import { IconButton, IconButtonView } from "../Button";
import { InputView } from ".";
import { useSelect } from "downshift";
import { Select, SelectView } from "../Select";

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
        <IconButtonView
          icon="checkmark"
          size="mini"
          primary
          customCSS={"margin-right: 4px;"}
        />
        <IconButtonView icon="close" size="mini" icon_css="color: #858585;" />
      </>
    }
  />
);

export const ClearableInput = () => {
  const [value, setValue] = useState("");
  return (
    <InputView
      value={value}
      onChange={(e: any) => {
        setValue(e.target.value);
      }}
      buttons={
        <>
          <IconButtonView
            onClick={() => {
              setValue("");
            }}
            icon="close"
            size="mini"
            borderless
          />
        </>
      }
    />
  );
};

export const WithUnits = () => {
  const items = ["px", "em", "rem", "%"];
  const functional = useSelect({ items });
  const props = {
    items,
    functional,
    limitWidth: "90px",
    customCSS: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  };
  const [value, setValue] = useState("");
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <InputView
        value={value}
        onChange={(e: { target: { value: string } }) =>
          setValue(e.target.value)
        }
        disabled={undefined}
        errors={undefined}
        limitWidth="210px"
        customCSS={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderRight: "none",
        }}
      />
      <SelectView {...props}></SelectView>
    </div>
  );
};

export const InputDate = () => <InputView value="" type="date" />;
