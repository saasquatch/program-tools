import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { UseComboboxReturnValue, UseSelectReturnValue } from "downshift";
import { InputView } from "../Input";
import { IconButton } from "../Button";
import React from "react";
import { IconKey, IconView } from "../Icon";
import { DataTableView } from "../DataTable";

export type SelectProps<ItemType> = OptionProps<ItemType> &
  Partial<React.ComponentProps<"input">>;

export interface OptionProps<ItemType> {
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
   * Custom CSS for the select handle container
   */
  customContainerCSS?: CSSProp;
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
   * Limit the width of the select with a valid CSS size (px, %) [default 300px]
   */
  limitWidth?: SizeType;
  /**
   * Limit the height of the input in its expanded state with a valid CSS size (px, %) [default 200px]
   */
  limitHeight?: SizeType;
  /**
   * Render in empty state
   */
  empty?: boolean;
  /**
   * Content to display when in the empty state
   */
  emptySlot?: string | React.ReactNode;
  /**
   * Content to display when in the loading state
   */
  loadingSlot?: string | React.ReactNode;
  /**
   * Use a custom icon instead of a chevron
   */
  customIcon?: IconKey;
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

const SelectInputDiv = styled.button<{
  disabled: boolean | undefined;
  errors: any;
  isOpen: boolean;
  customCSS: CSSProp;
}>`
  ${Styles.SelectInputStyle}
  ${(props) => props.disabled && "background: #E5E5E5; cursor: default;"}
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
  ${(props) =>
    props.subdued && "color: var(--sq-placeholder-text-on-secondary)"}
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

const SelectInnerView = <ItemType extends ItemTypeBase>(
  props: SelectProps<ItemType>,
  ref: React.Ref<HTMLInputElement>
) => {
  const {
    customCSS = ``,
    customContainerCSS = ``,
    disabled = false,
    errors = false,
    clearable = false,
    loading = false,
    customIcon,
    loadingSlot = (
      <>
        <ListItem style={{ height: "32px" }} key={`1`}>
          <DataTableView.SkeletonView size="120px" />
        </ListItem>
        <ListItem style={{ height: "32px" }} key={`2`}>
          <DataTableView.SkeletonView size="120px" />
        </ListItem>
        <ListItem style={{ height: "32px" }} key={`3`}>
          <DataTableView.SkeletonView size="120px" />
        </ListItem>
      </>
    ),
    placeholder = "",
    limitWidth = true,
    limitHeight = false,
    empty = false,
    emptySlot = "",
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

  function isCombobox(
    hook: UseSelectReturnValue<ItemType> | UseComboboxReturnValue<ItemType>
  ): hook is UseComboboxReturnValue<ItemType> {
    return (
      (hook as UseComboboxReturnValue<ItemType>).getComboboxProps !== undefined
    );
  }

  const isOpen = disabled ? false : functional.isOpen;

  return (
    <ContainerDiv
      customContainerCSS={customContainerCSS}
      limitWidth={limitWidth}
    >
      {!isCombobox(functional) ? (
        <SelectInputDiv
          {...rest}
          isOpen={functional.isOpen}
          disabled={disabled}
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
                color: "var(--sq-text-subdued)",
              }}
              icon_css={{ marginTop: "var(--sq-spacing-xxxx-small)" }}
              type={"button"}
              role={"button"}
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation();
                functional.selectItem((null as unknown) as ItemType);
              }}
            />
            {customIcon ? (
              <IconView
                icon={customIcon}
                size={"small"}
                customCSS={
                  "padding: var(--sq-spacing-x-small) var(--sq-spacing-small) var(--sq-spacing-x-small) var(--sq-spacing-x-small); box-sizing: content-box;"
                }
                color={"var(--sq-text-subdued)"}
              />
            ) : (
              <IconView
                icon={isOpen ? "chevron_up" : "chevron_down"}
                size={"small"}
                customCSS={
                  "padding: var(--sq-spacing-x-small) var(--sq-spacing-small) var(--sq-spacing-x-small) var(--sq-spacing-x-small); box-sizing: content-box;"
                }
                color={"var(--sq-text-subdued)"}
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
            disabled={disabled}
            onClick={() => !isOpen && functional.toggleMenu()}
            {...functional.getInputProps()}
          />
          <ButtonContainerDiv>
            <IconButton
              disabled={disabled}
              icon={"close"}
              borderless={true}
              size="mini"
              customCSS={{
                color: "var(--sq-text-subdued)",
                display: showClear,
              }}
              icon_css={{ marginTop: "var(--sq-spacing-xxx-small)" }}
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation();
                functional.selectItem((null as unknown) as ItemType);
              }}
            />
            {customIcon ? (
              <IconButton
                disabled={disabled}
                icon={customIcon}
                borderless={true}
                size="small"
                customCSS={{
                  padding:
                    "10px var(--sq-spacing-x-small) var(--sq-spacing-x-small)",
                }}
                icon_css={{
                  color: "var(--sq-text-subdued)",
                }}
                {...functional.getToggleButtonProps()}
              />
            ) : (
              <IconButton
                disabled={disabled}
                icon={isOpen ? "chevron_up" : "chevron_down"}
                borderless={true}
                size="small"
                customCSS={{
                  padding:
                    "10px var(--sq-spacing-x-small) var(--sq-spacing-x-small)",
                }}
                icon_css={{
                  color: "var(--sq-text-subdued)",
                }}
                {...functional.getToggleButtonProps()}
              />
            )}
          </ButtonContainerDiv>
        </div>
      )}
      <ItemContainerList
        limitWidth={limitWidth}
        limitHeight={limitHeight}
        errors={errors}
        {...functional.getMenuProps()}
      >
        {isOpen &&
          (loading ? (
            loadingSlot
          ) : empty ? (
            <ListItem key={`3`}>{emptySlot}</ListItem>
          ) : (
            items.map((item, index) => (
              <ListItem
                style={
                  functional.highlightedIndex === index
                    ? { backgroundColor: "var(--sq-surface-hover)" }
                    : {}
                }
                key={`${itemToString(item)}-${index}`}
                {...functional.getItemProps({ item, index })}
              >
                {itemToNode(item)}
              </ListItem>
            ))
          ))}
      </ItemContainerList>
    </ContainerDiv>
  );
};

// export const SelectView = React.forwardRef(SelectInnerView);

/**
 * @deprecated use {@link SelectView} instead
 */
export const Select = React.forwardRef(SelectInnerView);
