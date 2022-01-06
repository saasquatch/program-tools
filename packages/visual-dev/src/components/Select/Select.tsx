import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { UseComboboxReturnValue, UseSelectReturnValue } from "downshift";
import { Input } from "../Input";
import { IconButton } from "../Button";
import React from "react";
import { Icon } from "../Icon";
import { LoadingSpinner } from "../LoadingSpinner";

type SelectProps<ItemType> = OptionProps<ItemType> &
  React.ComponentProps<"input">;

export interface OptionProps<ItemType> {
  /**
   * Downshift hook
   */
  functional: UseSelectReturnValue<ItemType> | UseComboboxReturnValue<ItemType>;
  /**
   * Function to transform items to string
   */
  itemToString?: (item: ItemType) => string;
  /**
   * Function to transform items into view code for dropdown menu
   */
  itemToNode?: (item: ItemType) => React.ReactNode;
  /**
   * Disable input
   */
  disabled?: boolean;
  /**
   * Error in input
   */
  errors?: any;
  /**
   * Items to select from
   */
  items: Array<any>;
  /**
   * Custom CSS for input element
   */
  css?: CSSProp;
  /**
   * Allow the input to be cleared
   */
  clearable?: boolean;
  /**
   * Set the input state to loading
   */
  loading?: boolean;
}

type ItemTypeBase = { description?: string } | string | number | boolean;

type ComplexItemType = { description?: string };

function isComplexItem(item: any): item is ComplexItemType {
  return typeof item === "object" && item !== null;
}

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

const ButtonContainer = styled.div`
  ${Styles.ButtonContainer}
`;

const ItemDescription = styled("span")`
  ${Styles.ItemDescription}
`;

const Container = styled("div")`
  ${Styles.Container}
`;

const SelectInput = styled.button<{
  disabled: boolean | undefined;
  errors: any;
  isOpen: boolean;
  css: CSSProp;
}>`
  ${Styles.SelectInputStyle}
  ${(props) =>
    props.disabled &&
    "background: var(--sq-surface-input-disabled); cursor: default;"}
  ${(props) => props.isOpen && "border-color: var(--sq-focused);"}
  ${(props) =>
    !props.isOpen &&
    !props.disabled &&
    `&:hover{
    border-color: ${
      props.errors
        ? "var(--sq-surface-critical-hovered)"
        : "var(--sq-action-secondary-border)"
    } ;
  }`}

  ${(props) =>
    props.errors &&
    "border-color: var(--sq-border-critical); background: var(--sq-surface-critical-subdued);"}

  ${(props) => props.css}
`;

const SelectedValue = styled.span`
  ${Styles.SelectedValue}
`;

const ButtonDiv = styled.div`
  ${Styles.ButtonDiv}
`;

// Redeclare forwardRef for use with generic prop types.
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

const SelectInner = <ItemType extends ItemTypeBase>(
  props: SelectProps<ItemType>,
  ref: React.Ref<HTMLInputElement>
) => {
  const {
    css = {},
    disabled = false,
    errors = false,
    clearable = false,
    loading = false,
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
  const arrowColor = errors
    ? "var(--sq-border-critical)"
    : "var(--sq-text-on-secondary)";

  function isCombobox(
    hook: UseSelectReturnValue<ItemType> | UseComboboxReturnValue<ItemType>
  ): hook is UseComboboxReturnValue<ItemType> {
    return (
      (hook as UseComboboxReturnValue<ItemType>).getComboboxProps !== undefined
    );
  }

  return (
    <Container>
      {!isCombobox(functional) ? (
        <SelectInput
          {...rest}
          isOpen={functional.isOpen}
          disabled={disabled || loading}
          ref={ref}
          errors={errors}
          css={css}
          {...functional.getToggleButtonProps()}
        >
          <SelectedValue>
            {functional.selectedItem
              ? itemToString(functional.selectedItem)
              : ""}
          </SelectedValue>
          <ButtonDiv>
            <IconButton
              disabled={disabled}
              icon={"close"}
              borderless={true}
              size="mini"
              css={{
                visibility: showClear,
                height: "12px",
                width: "12px",
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
            {loading ? (
              <LoadingSpinner color={arrowColor} right="16px" bottom="11px" />
            ) : functional.isOpen ? (
              <Icon
                icon={"chevron_up"}
                size={"small"}
                color={
                  errors
                    ? "var(--sq-border-critical)"
                    : "var(--sq-text-on-secondary)"
                }
              />
            ) : (
              <Icon
                icon={"chevron_down"}
                size={"small"}
                color={
                  errors
                    ? "var(--sq-border-critical)"
                    : "var(--sq-text-on-secondary)"
                }
              />
            )}
          </ButtonDiv>
        </SelectInput>
      ) : (
        <div {...functional.getComboboxProps()}>
          <Input
            {...rest}
            type={"text"}
            ref={ref}
            errors={errors}
            css={`
              ${css};
              ${functional.isOpen && "border: 2px solid var(--sq-focused)"};
            `}
            disabled={disabled || loading}
            {...functional.getInputProps()}
          />
          <ButtonContainer>
            <IconButton
              disabled={disabled}
              icon={"close"}
              borderless={true}
              size="mini"
              css={{
                visibility: showClear,
              }}
              icon_css={{ color: arrowColor, height: "12px", width: "12px" }}
              color={
                errors ? "var(--sq-border-critical)" : "var(--sq-text-subdued)"
              }
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation();
                functional.selectItem((null as unknown) as ItemType);
              }}
            />
            {loading ? (
              <LoadingSpinner color={arrowColor} right="16px" bottom="11px" />
            ) : functional.isOpen ? (
              <IconButton
                disabled={disabled}
                icon={"chevron_up"}
                borderless={true}
                size="mini"
                icon_css={{ color: arrowColor, height: "12px", width: "12px" }}
                color={
                  errors
                    ? "var(--sq-border-critical)"
                    : "var(--sq-text-subdued)"
                }
                {...functional.getToggleButtonProps()}
              />
            ) : (
              <IconButton
                disabled={disabled}
                icon={"chevron_down"}
                borderless={true}
                size="mini"
                icon_css={{ color: arrowColor, height: "12px", width: "12px" }}
                color={
                  errors
                    ? "var(--sq-border-critical)"
                    : "var(--sq-text-subdued)"
                }
                {...functional.getToggleButtonProps()}
              />
            )}
          </ButtonContainer>
        </div>
      )}
      <ItemContainer errors={errors} {...functional.getMenuProps()}>
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

export const Select = React.forwardRef(SelectInner);
