import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { UseComboboxReturnValue, UseSelectReturnValue } from "downshift";
import { InputView } from "../Input";
import { IconButton } from "../Button";
import React from "react";
import { IconView } from "../Icon";
import { LoadingSpinner } from "../LoadingSpinner";

export type SelectHandleViewProps<ItemType> = HandleOptionProps<ItemType> &
  Omit<React.ComponentProps<"input">, "css">;

export interface SelectContainerViewProps {
  /**
   * Limit the width of the select with a valid CSS size (px, %) [default 300px]
   */
  limitWidth?: SizeType;
  /**
   * Custom CSS for the select handle container
   */
  customContainerCSS?: CSSProp;
  /**
   * Children of the container, generally SelectHandleView and SelectListView
   */
  children: React.ReactNode;
}
export interface HandleOptionProps<ItemType> {
  /**
   * Downshift hook for component functionality (useSelect or useCombobox)
   */
  functional: UseSelectReturnValue<ItemType> | UseComboboxReturnValue<ItemType>;
  /**
   * Function to transform item objects to strings for display
   */
  itemToString?: (item: ItemType | null) => string;
  /**
   * Function to transform item objects into template code for dropdown items
   */
  itemToNode?: (item: ItemType) => React.ReactNode;
  /**
   * Disable the select
   */
  disabled?: boolean;
  /**
   * Render the select with red border and background to indicate an error
   */
  errors?: any;
  /**
   * Items to include in the select list
   */
  items: Array<any>;
  /**
   * Custom CSS for the select handle
   */
  customCSS?: CSSProp;

  /**
   * Allow the select value to be cleared
   */
  clearable?: boolean;
  /**
   * Render the handle in the loading state
   */
  loading?: boolean;
  /**
   * Placeholder displayed in the handle before a selection is made
   */
  placeholer?: string;
  /**
   * Limit the height of the input in its expanded state with a valid CSS size (px, %) [default 200px]
   */
  limitHeight?: SizeType;
  /**
   * Limit the width of the select with a valid CSS size (px, %) [default 300px]
   */
  limitWidth?: SizeType;
}

export interface SelectListViewProps<ItemType> {
  /**
   * Render the select with red border and background to indicate an error
   */
  errors?: any;
  /**
   * Limit the height of the input in its expanded state with a valid CSS size (px, %) [default 200px]
   */
  limitHeight?: SizeType;
  /**
   * Limit the width of the select with a valid CSS size (px, %) [default 300px]
   */
  limitWidth?: SizeType;
  /**
   * Render the handle in the loading state
   */
  loading?: boolean;
  /**
   * Downshift hook for component functionality (useSelect or useCombobox)
   */
  functional: UseSelectReturnValue<ItemType> | UseComboboxReturnValue<ItemType>;
  /**
   * Function to transform item objects to strings for display
   */
  itemToString?: (item: ItemType | null) => string;
  /**
   * Function to transform item objects into template code for dropdown items
   */
  itemToNode?: (item: ItemType) => React.ReactNode;
  /**
   * Disable the select
   */
  disabled?: boolean;
  /**
   * Items to include in the select list
   */
  items: Array<any>;
}

type SizeType = boolean | string;

type ItemTypeBase = { description?: string } | string | number | boolean;

type ComplexItemType = { description?: string };

function isComplexItem(item: any): item is ComplexItemType {
  return typeof item === "object" && item !== null;
}

const ItemContainerList = styled.ul<{
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

const ListItem = styled("li")`
  ${Styles.Item}
`;

const ButtonContainerDiv = styled.div`
  ${Styles.ButtonContainer}
`;

const ItemDescriptionSpan = styled("span")`
  ${Styles.ItemDescription}
`;

const ContainerDiv = styled("div")<{
  customContainerCSS: CSSProp;
  limitWidth: SizeType;
}>`
  ${Styles.Container}
  ${(props) =>
    props.limitWidth
      ? typeof props.limitWidth === "string"
        ? `max-width: ${props.limitWidth};`
        : "max-width: 300px;"
      : "max-width: 100%;"}
  ${(props) => props.customContainerCSS}
`;

const SelectInputDiv = styled.div<{
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

const SelectedValueSpan = styled.span<{
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

const SelectContainerView = (props: SelectContainerViewProps) => {
  const { limitWidth = true, customContainerCSS = ``, children } = props;
  return (
    <ContainerDiv
      customContainerCSS={customContainerCSS}
      limitWidth={limitWidth}
    >
      {children}
    </ContainerDiv>
  );
};

const SelectHandleInnerView = <ItemType extends ItemTypeBase>(
  props: SelectHandleViewProps<ItemType>,
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
                <ItemDescriptionSpan>{item.description}</ItemDescriptionSpan>
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

  function isCombobox(
    hook: UseSelectReturnValue<ItemType> | UseComboboxReturnValue<ItemType>
  ): hook is UseComboboxReturnValue<ItemType> {
    return (
      (hook as UseComboboxReturnValue<ItemType>).getComboboxProps !== undefined
    );
  }

  const isOpen = disabled || loading ? false : functional.isOpen;

  return !isCombobox(functional) ? (
    <SelectInputDiv
      {...rest}
      isOpen={functional.isOpen}
      disabled={disabled || loading}
      ref={ref}
      errors={errors}
      customCSS={customCSS}
      role="button"
      {...functional.getToggleButtonProps()}
    >
      <SelectedValueSpan subdued={functional.selectedItem ? false : true}>
        {functional.selectedItem
          ? itemToString(functional.selectedItem)
          : placeholder}
      </SelectedValueSpan>
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
          <IconView
            icon={"chevron_up"}
            size={"small"}
            customCSS={"padding: 8px; box-sizing: content-box;"}
            color={arrowColor}
          />
        ) : (
          <IconView
            icon={"chevron_down"}
            size={"small"}
            customCSS={"padding: 8px; box-sizing: content-box;"}
            color={arrowColor}
          />
        )}
      </ButtonDiv>
    </SelectInputDiv>
  ) : (
    <div {...functional.getComboboxProps()}>
      <InputView
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
      <ButtonContainerDiv>
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
              errors ? "var(--sq-border-critical)" : "var(--sq-text-subdued)"
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
              errors ? "var(--sq-border-critical)" : "var(--sq-text-subdued)"
            }
            {...functional.getToggleButtonProps()}
          />
        )}
      </ButtonContainerDiv>
    </div>
  );
};

const SelectInnerListView = <ItemType extends ItemTypeBase>(
  props: SelectListViewProps<ItemType>,
  ref: React.Ref<HTMLInputElement>
) => {
  const {
    errors = false,
    limitWidth = true,
    limitHeight = false,
    disabled = false,
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
                <ItemDescriptionSpan>{item.description}</ItemDescriptionSpan>
              </>
            )}
          </>
        );
      } else {
        return <span>{itemToString(item)}</span>;
      }
    },
  } = props;

  const isOpen = disabled || loading ? false : functional.isOpen;

  return (
    <ItemContainerList
      limitWidth={limitWidth}
      limitHeight={limitHeight}
      errors={errors}
      ref={ref}
      {...functional.getMenuProps()}
    >
      {/* Place the conditional render inside getMenuProps call to avoid downshift errors */}
      {isOpen ? (
        items.map((item, index) => (
          <ListItem
            style={
              functional.highlightedIndex === index
                ? { backgroundColor: "var(--sq-surface-hover)" }
                : {}
            }
            key={`${itemToString(item)}-${index}`}
            {...functional.getItemProps({ item, index })}
            onMouseMove={() => {}}
          >
            {itemToNode(item)}
          </ListItem>
        ))
      ) : (
        <></>
      )}
    </ItemContainerList>
  );
};

export const SelectView = {
  HandleView: React.forwardRef(SelectHandleInnerView),
  ListView: React.forwardRef(SelectInnerListView),
  ContainerView: SelectContainerView,
};
