import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import type { UseComboboxReturnValue } from "downshift";
import { Input } from "../Input";
import { IconButton } from "../Button";

type ComboboxProps<ItemType> = OptionProps<ItemType> &
  React.ComponentProps<"input">;

export interface OptionProps<ItemType> {
  functional: UseComboboxReturnValue<ItemType>;
  disabled?: boolean;
  errors?: any;
  value?: any;
  items: Array<any>;
  css?: CSSProp;
}

const ItemContainer = styled("ul")`
  ${Styles.ItemContainer}
`;

const Item = styled("li")`
  ${Styles.Item}
`;

const ButtonContainer = styled.div`
  ${Styles.ButtonContainer}
`;

const ComboboxContainer = styled.div`
  ${Styles.Container}
`;

// Redeclare forwardRef for use with generic prop types.
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

const ComboboxInner = <ItemType,>(
  props: ComboboxProps<ItemType>,
  ref: React.Ref<HTMLInputElement>
) => {
  const { css = {}, errors = false, functional, items, ...rest } = props;

  console.log(functional.selectedItem);

  return (
    <ComboboxContainer {...functional.getComboboxProps()}>
      <Input
        {...rest}
        onClick={functional.getToggleButtonProps()}
        type={"text"}
        ref={ref}
        errors={errors}
        css={css}
        {...functional.getInputProps()}
      />
      <ButtonContainer>
        {functional.isOpen ? (
          <IconButton
            icon={"chevron_up"}
            borderless={true}
            css={{ height: "12px", width: "12px" }}
            icon_css={{ height: "12px", width: "12px" }}
            color={
              errors ? "var(--sq-border-critical)" : "var(--sq-text-subdued)"
            }
            {...functional.getToggleButtonProps()}
          />
        ) : (
          <IconButton
            icon={"chevron_down"}
            borderless={true}
            css={{ height: "12px", width: "12px" }}
            icon_css={{ height: "12px", width: "12px" }}
            color={
              errors ? "var(--sq-border-critical)" : "var(--sq-text-subdued)"
            }
            {...functional.getToggleButtonProps()}
          />
        )}
      </ButtonContainer>
      {functional.isOpen && (
        <ItemContainer errors={errors} {...functional.getMenuProps()}>
          {items.map((item, index) => (
            <Item
              key={`${item}${index}`}
              {...functional.getItemProps({ item, index })}
            >
              {item}
            </Item>
          ))}
        </ItemContainer>
      )}
    </ComboboxContainer>
  );
};

export const Combobox = React.forwardRef(ComboboxInner);
