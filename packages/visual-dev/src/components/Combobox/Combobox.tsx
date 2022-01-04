import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import type { UseComboboxReturnValue } from "downshift";
import { Input } from "../Input";
import { IconButton } from "../Button";
// import root from "react-shadow/styled-components";

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

// const ShadowDom = styled(root.div)`display: contents`;

// Redeclare forwardRef for use with generic prop types.
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

const ComboboxInner = <ItemType extends ItemTypeBase,>(
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

  return (
    <div style={{ maxWidth: "300px", width: "100%", position: "relative" }}>
      <div {...functional.getComboboxProps()}>
        <Input
          {...rest}
          type={"text"}
          ref={ref}
          errors={errors}
          css={css}
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
              css={{ height: "12px", width: "12px", padding: "0" }}
              icon_css={{ height: "12px", width: "12px" }}
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
              css={{ height: "12px", width: "12px", padding: "0" }}
              icon_css={{ height: "12px", width: "12px" }}
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
    </div>
  );
};

export const Combobox = React.forwardRef(ComboboxInner);
