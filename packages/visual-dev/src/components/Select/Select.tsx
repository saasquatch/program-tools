import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { UseComboboxReturnValue, UseSelectReturnValue } from "downshift";
import { Input } from "../Input";
import { IconButton } from "../Button";
import React from "react";
import { Icon } from "../Icon";
import { LoadingSpinner } from "../LoadingSpinner";

type SelectProps<ItemType> = OptionProps<ItemType> &
  Omit<React.ComponentProps<"input">, "css">;

export interface OptionProps<ItemType> {
  /**
   * Downshift hook (either useCombobox or useSelect)
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
  customCSS?: CSSProp;
  /**
   * Allow the input to be cleared
   */
  clearable?: boolean;
  /**
   * Set the input state to loading
   */
  loading?: boolean;
  /**
   * Placeholder for unset input
   */
  placeholer?: string;
  /**
   * Limit the width of the input
   */
  limitWidth?: SizeType;
  /**
   * Limit the width of the input
   */
  limitHeight?: SizeType;
}

type SizeType = boolean | string;

type ItemTypeBase = { description?: string } | string | number | boolean;

type ComplexItemType = { description?: string };

function isComplexItem(item: any): item is ComplexItemType {
  return typeof item === "object" && item !== null;
}

const ItemContainer = styled.ul<{
  errors: any;
  limitWidth: SizeType;
  limitHeight: SizeType;
}>`
  ${Styles.ItemContainer}
  ${(props) =>
    props.errors &&
    "border-color: var(--sq-border-critical); background-color: var(--sq-surface-critical-subdued);"}
  ${(props) =>
    props.limitWidth
      ? typeof props.limitWidth === "string"
        ? `max-width: ${props.limitWidth};`
        : "max-width: 300px;"
      : "max-width: 100%;"}
  ${(props) =>
    props.limitHeight
      ? typeof props.limitHeight === "string"
        ? `max-height: ${props.limitHeight};`
        : "max-height: 200px;"
      : "max-height: auto;"}
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

const Container = styled("div")<{
  limitWidth: SizeType;
}>`
  ${Styles.Container}
  ${(props) =>
    props.limitWidth
      ? typeof props.limitWidth === "string"
        ? `max-width: ${props.limitWidth};`
        : "max-width: 300px;"
      : "max-width: 100%;"}
`;

const SelectInput = styled.div<{
  disabled: boolean | undefined;
  errors: any;
  isOpen: boolean;
  customCSS: CSSProp;
}>`
  ${Styles.SelectInputStyle}
  ${(props) =>
    props.disabled &&
    "background: var(--sq-surface-input-disabled); cursor: default;"}
  ${(props) =>
    props.isOpen && !props.disabled && "border-color: var(--sq-focused);"}
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
    !props.disabled &&
    `&:focus {
    border-color: var(--sq-focused);
  }`}

  ${(props) =>
    props.errors &&
    "border-color: var(--sq-border-critical); background: var(--sq-surface-critical-subdued);"}

  ${(props) => props.customCSS}
`;

const SelectedValue = styled.span<{
  subdued: boolean;
}>`
  ${Styles.SelectedValue}
  ${(props) => props.subdued && "color: var(--sq-text-subdued)"}
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
    customCSS = ``,
    disabled = false,
    errors = false,
    clearable = false,
    loading = false,
    placeholder = "",
    limitWidth = true,
    limitHeight = false,
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

  const showClear = clearable ? "inline-flex" : "none";
  const arrowColor = errors
    ? "var(--sq-border-critical)"
    : disabled
    ? "var(--sq-border)"
    : "var(--sq-text)";

  console.log(arrowColor);

  function isCombobox(
    hook: UseSelectReturnValue<ItemType> | UseComboboxReturnValue<ItemType>
  ): hook is UseComboboxReturnValue<ItemType> {
    return (
      (hook as UseComboboxReturnValue<ItemType>).getComboboxProps !== undefined
    );
  }

  const isOpen = disabled || loading ? false : functional.isOpen;

  return (
    <Container limitWidth={limitWidth}>
      {!isCombobox(functional) ? (
        <SelectInput
          {...rest}
          isOpen={functional.isOpen}
          disabled={disabled || loading}
          ref={ref}
          errors={errors}
          customCSS={customCSS}
          role="button"
          {...functional.getToggleButtonProps()}
        >
          <SelectedValue subdued={functional.selectedItem ? false : true}>
            {functional.selectedItem
              ? itemToString(functional.selectedItem)
              : placeholder}
          </SelectedValue>
          <ButtonDiv>
            <IconButton
              disabled={disabled}
              icon={"close"}
              borderless={true}
              size="mini"
              customCSS={{
                display: showClear,
              }}
              icon_css={{
                color: arrowColor,
                margin: "auto",
                height: "12px",
                width: "12px",
              }}
              color={
                errors ? "var(--sq-border-critical)" : "var(--sq-text-subdued)"
              }
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation();
                functional.selectItem((null as unknown) as ItemType);
              }}
            />
            {loading ? (
              <LoadingSpinner color={arrowColor} right="14px" bottom="12px" />
            ) : isOpen ? (
              <Icon
                icon={"chevron_up"}
                size={"small"}
                customCSS={"padding: 8px; box-sizing: content-box;"}
                color={arrowColor}
              />
            ) : (
              <Icon
                icon={"chevron_down"}
                size={"small"}
                customCSS={"padding: 8px; box-sizing: content-box;"}
                color={arrowColor}
              />
            )}
          </ButtonDiv>
        </SelectInput>
      ) : (
        <div {...functional.getComboboxProps()}>
          <Input
            {...rest}
            placeholder={placeholder}
            type={"text"}
            ref={ref}
            errors={errors}
            limitWidth={limitWidth}
            customCSS={`
              ${customCSS};
              ${isOpen && "border: 2px solid var(--sq-focused)"};
              ${
                clearable
                  ? "padding-right: var(--sq-spacing-xxxx-large)"
                  : "padding-right: var(--sq-spacing-xxx-large)"
              };
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
              customCSS={{
                display: showClear,
              }}
              icon_css={{
                margin: "auto",
                color: arrowColor,
                height: "12px",
                width: "12px",
              }}
              color={
                errors ? "var(--sq-border-critical)" : "var(--sq-text-subdued)"
              }
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation();
                functional.selectItem((null as unknown) as ItemType);
              }}
            />
            {loading ? (
              <LoadingSpinner color={arrowColor} right="16px" bottom="3px" />
            ) : isOpen ? (
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
      <ItemContainer
        limitWidth={limitWidth}
        limitHeight={limitHeight}
        errors={errors}
        {...functional.getMenuProps()}
      >
        {isOpen &&
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
