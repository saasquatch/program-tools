import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { Icon } from "../Icon";
import { UseSelectReturnValue } from "downshift";

type SelectProps<ItemType> = OptionProps<ItemType> &
  React.ComponentProps<"button">;

export interface OptionProps<ItemType> {
  functional: UseSelectReturnValue<ItemType>;
  itemToString?: (item: ItemType) => string;
  disabled?: boolean;
  errors?: any;
  items: Array<any>;
  css?: CSSProp;
}

const SelectInput = styled.button<{
  disabled: boolean | undefined;
  errors: any;
  isOpen: boolean;
}>`
  ${Styles.SelectInputStyle}
  ${(props) => props.disabled && "background: var(--sq-surface-input-disabled)"}
  ${(props) => props.isOpen && "border-color: var(--sq-focused);"}
  ${(props) =>
    !props.isOpen &&
    `&:hover{
    border-color: var(--sq-action-secondary-border);
  }`}

  ${(props) =>
    props.errors &&
    "border-color: var(--sq-border-critical); background: var(--sq-surface-critical-subdued);"}
`;

const SelectedValue = styled.span`
  ${Styles.SelectedValue}
`;

const IconDiv = styled.div`
  ${Styles.IconStyle}
`;

const ItemContainer = styled.ul<{
  errors: any;
}>`
  ${Styles.ItemContainer}
  ${(props) =>
    props.errors &&
    "border-color: var(--sq-border-critical); background-color: var(--sq-surface-critical-subdued);"}
`;

const Item = styled("li")`
  ${Styles.Item}
`;

const ItemDescription = styled("span")`
  ${Styles.ItemDescription}
`;

// Redeclare forwardRef for use with generic prop types.
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

const SelectInner = <ItemType,>(
  props: SelectProps<ItemType>,
  ref: React.Ref<HTMLInputElement>
) => {
  const {
    css = {},
    disabled = false,
    errors = false,
    functional,
    items,
    itemToString = (item: ItemType) => {
      return item;
    },
    ...rest
  } = props;

  console.log(functional.selectedItem);

  return (
    <div>
      <SelectInput
        {...rest}
        isOpen={functional.isOpen}
        disabled={disabled}
        ref={ref}
        errors={errors}
        css={css}
        {...functional.getToggleButtonProps()}
      >
        <SelectedValue>
          {functional.selectedItem ? itemToString(functional.selectedItem) : ""}
        </SelectedValue>
        {functional.isOpen ? (
          <IconDiv>
            <Icon
              icon={"chevron_up"}
              size={"small"}
              color={
                errors
                  ? "var(--sq-border-critical)"
                  : "var(--sq-text-on-secondary)"
              }
            />
          </IconDiv>
        ) : (
          <IconDiv>
            <Icon
              icon={"chevron_down"}
              size={"small"}
              color={
                errors
                  ? "var(--sq-border-critical)"
                  : "var(--sq-text-on-secondary)"
              }
            />
          </IconDiv>
        )}
      </SelectInput>
      <ItemContainer errors={errors} {...functional.getMenuProps()}>
        {functional.isOpen &&
          items.map((item, index) => (
            <Item
              key={`${itemToString(item)}-${index}`}
              style={
                functional.highlightedIndex === index
                  ? { backgroundColor: "var(--sq-surface-hover)" }
                  : {}
              }
              {...functional.getItemProps({ item, index })}
            >
              <span>{itemToString(item)}</span>
              {item.description && (
                <>
                  <br />
                  <ItemDescription>{item.description}</ItemDescription>
                </>
              )}
            </Item>
          ))}
      </ItemContainer>
    </div>
  );
};

export const Select = React.forwardRef(SelectInner);
