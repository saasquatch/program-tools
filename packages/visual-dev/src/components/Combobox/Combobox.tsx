import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { UseComboboxReturnValue } from "downshift";
import { Input } from "../Input";
import { IconButton } from "../Button";
import React from "react";
import { css } from "styled-components";

type ComboboxProps<ItemType> = OptionProps<ItemType> &
  React.ComponentProps<"input">;

export interface OptionProps<ItemType> {
  functional: UseComboboxReturnValue<ItemType>;
  itemToString?: (item: ItemType) => string;
  itemToNode?: (item: ItemType) => React.ReactNode;
  disabled?: boolean;
  errors?: any;
  items: Array<any>;
  css?: CSSProp;
  clearable?: boolean;
}

type ItemTypeBase = { description?: string } | string | number | boolean;

type ComplexItemType = { description?: string };

function isComplexItem(item: any): item is ComplexItemType {
  return typeof item === "object" && item !== null;
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

const ItemDescription = styled("span")`
  ${Styles.ItemDescription}
`;

const Container = styled("div")`
  ${Styles.Container}
`;

const borderStyle = (existing: CSSProp, isOpen: boolean) => {
  return css`
    ${existing}
    ${isOpen && "border: 2px solid var(--sq-focused);"}
  `;
};

// Redeclare forwardRef for use with generic prop types.
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

const ComboboxInner = <ItemType extends ItemTypeBase>(
  props: ComboboxProps<ItemType>,
  ref: React.Ref<HTMLInputElement>
) => {
  const {
    css = {},
    disabled = false,
    errors = false,
    clearable = false,
    functional,
    items,
    itemToString = (item: ItemType) => {
      return item;
    },
    itemToNode = (item: ItemType) => {
      if (isComplexItem(item)) {
        return (
          <>
            <span>{itemToString(item)}</span>
            {item.description && (
              <>
                <br />
                <ItemDescription>{item.description}</ItemDescription>
              </>
            )}
          </>
        );
      } else {
        return <span>{itemToString(item)}</span>;
      }
    },
    ...rest
  } = props;

  const showClear = clearable ? "visible" : "hidden";
  const arrowColor = errors ? "var(--sq-border-critical)" : "";

  return (
    <Container>
      <div {...functional.getComboboxProps()}>
        <Input
          {...rest}
          type={"text"}
          ref={ref}
          errors={errors}
          css={borderStyle(css, functional.isOpen)}
          disabled={disabled}
          {...functional.getInputProps()}
        />
        <ButtonContainer>
          <IconButton
            disabled={disabled}
            icon={"close"}
            borderless={true}
            css={{
              visibility: showClear,
              height: "12px",
              width: "12px",
              padding: "0",
              background: "transparent",
            }}
            icon_css={{ height: "12px", width: "12px" }}
            color={
              errors ? "var(--sq-border-critical)" : "var(--sq-text-subdued)"
            }
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              e.stopPropagation();
              functional.selectItem((null as unknown) as ItemType);
            }}
          />
          {functional.isOpen ? (
            <IconButton
              disabled={disabled}
              icon={"chevron_up"}
              borderless={true}
              css={{
                height: "12px",
                width: "12px",
                padding: "0",
                background: "transparent",
              }}
              icon_css={{ height: "12px", width: "12px", color: arrowColor }}
              color={
                errors ? "var(--sq-border-critical)" : "var(--sq-text-subdued)"
              }
              {...functional.getToggleButtonProps()}
            />
          ) : (
            <IconButton
              disabled={disabled}
              icon={"chevron_down"}
              borderless={true}
              css={{
                height: "12px",
                width: "12px",
                padding: "0",
                background: "transparent",
              }}
              icon_css={{ height: "12px", width: "12px", color: arrowColor }}
              color={
                errors ? "var(--sq-border-critical)" : "var(--sq-text-subdued)"
              }
              {...functional.getToggleButtonProps()}
            />
          )}
        </ButtonContainer>
      </div>
      <ItemContainer {...functional.getMenuProps()}>
        {functional.isOpen &&
          items.map((item, index) => (
            <Item
              style={
                functional.highlightedIndex === index
                  ? { backgroundColor: "var(--sq-surface-hover)" }
                  : {}
              }
              key={`${itemToString(item)}-${index}`}
              {...functional.getItemProps({ item, index })}
            >
              {itemToNode(item)}
            </Item>
          ))}
      </ItemContainer>
    </Container>
  );
};

export const Combobox = React.forwardRef(ComboboxInner);
